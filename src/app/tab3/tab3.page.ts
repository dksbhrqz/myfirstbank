import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../services/data.service';

import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit, OnDestroy {

  weather: any = null;
  coords: any = null;
  msg = '';

  constructor(
    public dataService: DataService,
    private geolocation: Geolocation
  ) {}

  ngOnInit() {
    this.getCoords();
  }

  getCoords() {
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      this.sendCoords(resp.coords.latitude, resp.coords.longitude);
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

  ngOnDestroy() {
    this.coords = null;
    this.weather = null;
  }

  sendCoords(latitude, longitude) {
    this.coords = {
      lat: latitude,
      lon: longitude
    };
    this.dataService.getWeatherInfo(this.coords, (err, info) => {
      if (err) {
        console.log(err);
        this.msg = JSON.stringify(err);
      } else {
        this.msg = JSON.stringify(err);
        this.weather = info;
      }
    });
  }
}
