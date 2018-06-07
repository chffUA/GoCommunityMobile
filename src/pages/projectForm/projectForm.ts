import { Component } from '@angular/core';
import { Api } from '../../providers/api';
import { TabsPage } from '../../pages/tabs/tabs';
import { HomePage } from '../../pages/home/home';
import { AlertController, LoadingController, NavController, Platform, NavParams } from 'ionic-angular'

@Component({
  selector: 'page-projectForm',
  templateUrl: 'projectForm.html'
})
export class ProjectFormPage {

  user: any;
  uid: number;
  name: string;
  desc: string;
  goal: number;
  date: string;
  error: string;
  homePage = HomePage;

  constructor(public alertController: AlertController,
    public nav: NavController,
    public loadingCtrl: LoadingController,
    public platform: Platform,
    public api: Api,
    public navParams: NavParams) {

      this.error = '';
      this.user = navParams.get("user");
      this.uid = this.user.id;
  }

  ionViewWillEnter() {
    this.error = '';
  }

  create() {
    if (this.name==null || this.desc==null || this.goal==null || this.date==null ||
    this.name==='' || this.desc==='' || this.date==='') {
      this.error = "Every field is required.";
      return;
    }

    if (this.goal<=0) {
      this.error = "Invalid goal amount.";
      return;
    }
    
    this.api.postProject({name: this.name, desc: this.desc, goal: this.goal, date: this.date, owner: this.uid.toString()}).then(
      data => { 
        if (data) {
          if (data.id) {
            this.api.getUser(this.uid).then(
              udata => {               
                if (udata.id) {
                  this.error = '';
                  this.user = udata;
                  this.nav.push(this.homePage, {user: this.user});
                } else {
                  this.error = 'Lost connection to the database.';
                }
              });
           } else if (data.error.message == "Name already exists.") {
             this.error = "Name already exists.";
           } else if (data.error.message == "User does not exist.") {
            this.error = "User does not exist.";
           } else if (data.error.message == "Invalid date.") {
             this.error = "Invalid date format or impossible date.";
           } else {
            this.error = "Some parameters were deemed invalid.";
           }
        } else {
          this.error = 'Couldn\'t connect to the database.';
        }
      });
  }

}
