import { Component } from '@angular/core';

import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { DataService } from '../services/data.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  selectedAccount: any = null;
  qrInfo = '';
  encodedData: any = '';

  constructor(
    public dataService: DataService,
    public alertController: AlertController,
    private barcodeScanner: BarcodeScanner
  ) {}

  scan = () => {
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      try {
        const msg = JSON.parse(barcodeData.text);
        this.presentAlertPrompt(msg);
      } catch (e) {
        this.presentAlert('Error al escanear QR');
      }
    }).catch(err => {
      console.log('Error', err);
    });
  }

  async presentAlert(msg: string) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentAlertPrompt(msg: any) {
    const alert = await this.alertController.create({
      header: 'Transferir a la cuenta N° ' + msg.number + ' de tipo ' + msg.name,
      inputs: [
        {
          name: 'amount',
          type: 'number',
          placeholder: 'Monto'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
            this.presentAlert('Transacción cancelada.')
          }
        }, {
          text: 'Enviar',
          handler: (data) => {
            this.presentAlert('Se han transferido $ ' + data.amount);
          }
        }
      ]
    });

    await alert.present();
  }

  encodedText() {
    this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE, JSON.stringify(this.selectedAccount)).then((encodedData) => {
        console.log(encodedData);
        this.encodedData = encodedData;
    }, (err) => {
        console.log('Error occured : ' + err);
    });
  }

  createQR() {
    console.log('=>', this.selectedAccount);
    this.qrInfo = JSON.stringify(this.selectedAccount);
  }

}
