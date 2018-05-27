import { Component } from '@angular/core';
import { Api } from '../../providers/api';
import { TabsPage } from '../../pages/tabs/tabs';
import { HomePage } from '../../pages/home/home';
import { LoginPage } from '../../pages/login/login';
import { AlertController, LoadingController, NavController, Platform, NavParams } from 'ionic-angular'

@Component({
  selector: 'page-accountForm',
  templateUrl: 'accountForm.html'
})
export class AccountFormPage {

  name: string;
  username: string;
  password: string;
  error: string;
  tabsPage = TabsPage;
  tabBarElement: any;
  loginPage = LoginPage;
  toLogin: boolean;

  constructor(public alertController: AlertController,
    public nav: NavController,
    public loadingCtrl: LoadingController,
    public platform: Platform,
    public api: Api,
    public navParams: NavParams) {

      this.toLogin = false;
      this.error = '';
      this.tabBarElement = document.querySelector('.tabbar.show-tabbar');

  }

ionViewWillEnter() {
  this.error = '';
  if (this.tabBarElement!=null) {
    this.tabBarElement.style.display = 'none';
  }
}

ionViewWillLeave() {
  if (this.tabBarElement!=null) {
    this.tabBarElement.style.display = 'flex';
  }
}

back() {
  this.toLogin = true;
  
}

  create() {
    if (this.toLogin) {
      this.nav.push(this.loginPage);
      return;
    }

    if (this.name==null && this.username==null || this.password==null ||
      this.name==='' || this.username==='' || this.password==='') {
        this.error = "Every field is required.";
        return;
      }

      this.error = '';
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
