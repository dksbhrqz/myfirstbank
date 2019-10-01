import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { QRCodeModule } from 'angularx-qrcode';

import { QrPage } from './qr.page';

const routes: Routes = [
  {
    path: '',
    component: QrPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    QRCodeModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [QrPage]
})
export class QrPageModule {}
