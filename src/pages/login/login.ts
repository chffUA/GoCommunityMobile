import { Component } from '@angular/core';
import { Api } from '../../providers/api';
import { TabsPage } from '../../pages/tabs/tabs';
import { AlertController, LoadingController, NavController, Platform, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  tabsPage = TabsPage;
  error: string;
  username: string;
  password: string;

  constructor(
    public alertController: AlertController,
    public nav: NavController,
    public loadingCtrl: LoadingController,
    public platform: Platform,
    public api: Api,
    public navParams: NavParams) {

      this.error = "";
  }

  loginT() {
    let loader = this.loadingCtrl.create({
      content: "Retrieving information..."
    });
    //Show the loading indicator
    loader.present();

        //only user: test/test
        if (this.username=='t' && this.password=='t') {
          this.nav.push(this.tabsPage, {id: 1});
        } else if (this.username==null || this.password==null || this.username=='' || this.password=='') {
          this.error = "Both fields are required.";
        } else {
          this.error = "Could not match credentials with any existing user.";
        }

  loader.dismiss();
  }

  login() {   
    //Create the loading indicator
    let loader = this.loadingCtrl.create({
      content: "Retrieving information..."
    });
    //Show the loading indicator
    loader.present();

    this.api.getLoginResult(this.username, this.password).then(
      data => {
        //Hide the loading indicator
        loader.dismiss();
        
        if (data) {
          if (data.status==="true") {
            this.nav.push(this.tabsPage, {id: data.id});
          } else if (data.status==="false") {
            this.error = 'Authentication failed. Perhaps the username or password are misspelled?';
          } else {
            this.error = 'Daily login attempts exceeded.';
          }
        } else {
          this.error = 'Couldn\'t connect to the database.';
        }
      },
      error => {
        //Hide the loading indicator
        loader.dismiss();
        this.error = 'Couldn\'t connect to the database.';
      }
    );
  }

  


}
