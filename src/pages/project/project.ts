import { Component } from '@angular/core';
import { Api } from '../../providers/api';
import { TabsPage } from '../../pages/tabs/tabs';
import { HomePage } from '../../pages/home/home';
import { AlertController, LoadingController, NavController, Platform, NavParams } from 'ionic-angular'

@Component({
  selector: 'page-project',
  templateUrl: 'project.html'
})
export class ProjectPage {

  uid: number;
  time: string;
  p: any;
  error: string;
  progressBar: number;
  milestoneList: any[];
  commentsList: any[];

  constructor(public alertController: AlertController,
    public nav: NavController,
    public loadingCtrl: LoadingController,
    public platform: Platform,
    public api: Api,
    public navParams: NavParams) {
    this.uid = navParams.get("uid");
    this.p = navParams.get("project");
    this.error = '';
    this.milestoneList = [];
    this.commentsList = [];
    this.populatePage();
  }

  populatePage() {
    this.createTimeString();    
    this.progressBar = Math.floor(this.p.progress/this.p.goal * 100);
    for (let i=0;i<this.p.milestones.length;i++) {
      let key = Object.keys(this.p.milestones[i])[0]+"€";
      let val = Object.values(this.p.milestones[i])[0];
      this.milestoneList.push({k: key, v: val});
    }
    //comments after
  }

  createTimeString() {
    let diff = new Date(this.p.endsOn).getTime() - new Date(this.p.createdOn).getTime();

    let day = 24*60*60*1000;
    let year = 365*day;
    let month = 30*day;

    if (diff>=2*year) {
      this.time = Math.floor(diff/year)+" years to go!";
    } else if (diff>=year) {
      this.time = "1 year to go!";
    } else if (diff>=2*month) {
      this.time =Math.floor(diff/month)+" months to go!";
    } else if (diff>=month) {
      this.time = "1 month to go!";
    } else if (diff>=14*day) {
      this.time = Math.floor(diff/(7*day))+" weeks to go!";
    } else if (diff>=7*day) {
      this.time = "1 week to go!";
    } else if (diff>=2*day) {
      this.time = Math.floor(diff/day)+" days to go!";
    } else if (diff>=day) {
      this.time = "1 day to go!";
    } else if (diff<day && diff>0) {
      this.time = "Deadline is today!";
    } else {
      this.time = "Project funding is over!";
    }
  }

}
