import { Component } from '@angular/core';
import { Api } from '../../providers/api';
import { TabsPage } from '../../pages/tabs/tabs';
import { AlertController, LoadingController, NavController, Platform, NavParams } from 'ionic-angular';
import { AccountFormPage } from '../accountForm/accountForm';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  tabsPage = TabsPage;
  accountFormPage = AccountFormPage;
  user: any;
  error: string;
  username: string;
  password: string;
  tabBarElement: any;

  constructor(
    public alertController: AlertController,
    public nav: NavController,
    public loadingCtrl: LoadingController,
    public platform: Platform,
    public api: Api,
    public navParams: NavParams) {

      this.user = navParams.get("user");
      this.error = "";
      this.tabBarElement = document.querySelector('.tabbar.show-tabbar');

  }

  newAccount() {
    this.nav.push(this.accountFormPage);
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

  login() { 
    if (this.username==null || this.password==null || this.username=='' || this.password=='') {
      this.error = "Both fields are required.";
      return;
    }

    this.api.getLoginResult(this.username, this.password).then(
      data => {

        if (data) {
          if (data.status==="true") {
            this.api.getUser(data.id).then(
              udata => {               
                if (udata.id) {
                  this.nav.push(this.tabsPage, {user: udata});
                } else {
                    this.error = 'Couldn\'t connect to the database.';
                }
              },
              error => {
                this.error = 'Couldn\'t connect to the database.';
              });
            
          } else if (data.status==="false") {
            this.error = 'Could not match credentials with any existing user.';
          } else if (data.error.message=='Not Found!')  {
            this.error = 'User does not exist.';
          } else {
            this.error = 'Daily login attempts exceeded.';
          }
        } else {
          this.error = 'Couldn\'t connect to the database.';
        }
      },
      error => {
        this.error = 'Couldn\'t connect to the database.';
      }
    );
  }

  


}
