import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
export class QrPage implements OnInit {

  public myAngularxQrCode: string = null;

  constructor() {
    this.myAngularxQrCode = 'Your QR code data string';
  }

  ngOnInit() {
  }

}
