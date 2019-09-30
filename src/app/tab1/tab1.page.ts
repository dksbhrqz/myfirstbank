import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  constructor(public dataService: DataService, public alertController: AlertController) {}

  async presentLogoutConfirm() {
    const alert = await this.alertController.create({
      header: 'Cerrar sesión',
      message: '¿Seguro desea cerrar sesión?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Sí',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Okay');
            this.dataService.logout();
          }
        }
      ]
    });

    await alert.present();
  }

  ngOnInit() {
    this.dataService.getAccountsInfo();
    console.log('init')
  }

}
