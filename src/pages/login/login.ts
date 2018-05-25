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
  tabBarElement: any;

  constructor(
    public alertController: AlertController,
    public nav: NavController,
    public loadingCtrl: LoadingController,
    public platform: Platform,
    public api: Api,
    public navParams: NavParams) {

      this.error = "";
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

  loginT() {
    let loader = this.loadingCtrl.create({
      content: "Retrieving information..."
    });
    //Show the loading indicator
    loader.present();
    loader.dismiss();

    let u = {id: 1, owns: [2,3,4], follows: [2,5,12]};

        //only user: test/test
        if (this.username=='t' && this.password=='t') {
          this.nav.push(this.tabsPage, {user: u});
        } else if (this.username==null || this.password==null || this.username=='' || this.password=='') {
          this.error = "Both fields are required.";
        } else {
          this.error = "Could not match credentials with any existing user.";
        }
  
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
            this.api.getUser(data.id).then(
              udata => {               
                if (udata) {
                  this.nav.push(this.tabsPage, {user: udata});
                } else {
                    this.error = 'Couldn\'t connect to the database.';
                }
              },
              error => {
                this.error = 'Couldn\'t connect to the database.';
              });
            
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
