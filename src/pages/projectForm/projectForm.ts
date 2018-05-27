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

  createT() {
    console.log(this.name,this.desc,this.goal,this.date,this.uid);
    if (this.name!=null && this.desc!=null && this.goal!=null && this.date!=null) {
        this.nav.push(this.homePage, {user: this.user});
      }
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
  this.error = '';
  }

}
