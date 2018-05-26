import { Component } from '@angular/core';
import { Api } from '../../providers/api';
import { TabsPage } from '../../pages/tabs/tabs';
import { HomePage } from '../../pages/home/home';
import { AlertController, LoadingController, NavController, Platform, NavParams } from 'ionic-angular'

@Component({
  selector: 'page-accountForm',
  templateUrl: 'accountForm.html'
})
export class AccountFormPage {

  name: string;
  username: string;
  password: string;
  tabsPage = TabsPage;
  tabBarElement: any;

  constructor(public alertController: AlertController,
    public nav: NavController,
    public loadingCtrl: LoadingController,
    public platform: Platform,
    public api: Api,
    public navParams: NavParams) {

      this.tabBarElement = document.querySelector('.tabbar.show-tabbar');

  }

ionViewWillEnter() {
  if (this.tabBarElement!=null) {
    this.tabBarElement.style.display = 'none';
  }
}

ionViewWillLeave() {
  if (this.tabBarElement!=null) {
    this.tabBarElement.style.display = 'flex';
  }
}

  create() {

  }

  createT() {
    console.log(this.name,this.username,this.password);
    if (this.name!=null && this.username!=null && this.password!=null) {
      let x = {id: 1};
      let u = {id: 1, owns: [2,3,4], follows: [2,5,12]};
      this.nav.push(this.tabsPage, {user: u});
    }
  }

}
