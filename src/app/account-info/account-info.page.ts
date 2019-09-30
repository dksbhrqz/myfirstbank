import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { NavController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.page.html',
  styleUrls: ['./account-info.page.scss'],
})
export class AccountInfoPage implements OnInit, OnDestroy {
  idParam: string;
  account: any = null;

  constructor(
    private route: ActivatedRoute,
    public dataService: DataService,
    public nav: NavController,
    private alertController: AlertController,
    private storage: Storage
  ) {
    this.getAccountInfo();
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.account = null;
  }

  getAccountInfo() {
    this.idParam = this.route.snapshot.paramMap.get('id');
    console.log(this.idParam);
    this.storage.get('accounts').then((val) => {
      this.account = val.filter(item => { if (item.id == this.idParam) { return item; }})[0];
    });
  }

}
