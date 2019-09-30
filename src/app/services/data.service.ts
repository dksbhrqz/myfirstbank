import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase/app';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  user: any = null;
  creds = {
    email: '',
    password: ''
  };
  loginMsg = '';
  initialAccounts: any = [{
    id: 1,
    name: 'Ahorro',
    money: 3000000,
    number: '123456789-98'
  }, {
    id: 2,
    name: 'Corriente',
    money: 10000,
    number: '987654321-12'
  }];
  accounts: any = [];

  constructor(public  afAuth: AngularFireAuth, private storage: Storage, private http: HttpClient) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        console.log(user);
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        console.log(user);
        localStorage.setItem('user', null);
      }
    });
  }

  async login(creds: any) {
    this.loginMsg = '';
    if (creds.email === '') {
      this.loginMsg = 'Correo electrónico es obligatorio.';
    } else {
      if (creds.password === '') {
        this.loginMsg = 'Contraseña es obligatorio.';
      } else {
        this.afAuth.auth.signInWithEmailAndPassword(creds.email, creds.password)
        .then(res => {
          console.log('logged');
          this.creds = {
            email: '',
            password: ''
          };
        })
        .catch(err => {
          console.log('auth err', err.code);
          if (err.code === 'auth/invalid-email') {
            this.loginMsg = 'Correo electrónico inválido.';
          } else if(err.code === 'auth/user-not-found') {
            this.loginMsg = 'Usuario no resgistrado.';
          } else if (err.code === 'auth/wrong-password') {
            this.loginMsg = 'Contraseña incorrecta.';
          } else {
            this.loginMsg = 'Error. Intente de nuevo.';
          }
        });
      }
    }
  }

  googleLogIn() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }


  logout() {
    this.afAuth.auth.signOut();
    localStorage.removeItem('user');
  }

  isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return  user  !==  null;
  }

  getAccountsInfo() {
    this.storage.get('accounts').then((val) => {
      if (val == null) {
        // set a key/value
        // set a key/value
        this.storage.set('accounts', this.initialAccounts);
        this.getAccountsInfo();
      } else {
        this.accounts = val;
      }
    });
  }

  getWeatherInfo(coords, cb) {
    const url = 'http://forecast.weather.gov/MapClick.php?lat=' + coords.lat + '&lon=' + coords.lon + '&unit=0&lg=es&FcstType=json'
    this.http.get(url).subscribe(data => {
      console.log(data);
      cb(null,  data);
    },
    err => {
      cb(err, null);
    },
    () => {
    });
  }

}
