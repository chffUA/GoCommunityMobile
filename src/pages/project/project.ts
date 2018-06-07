import { Component } from '@angular/core';
import { Api } from '../../providers/api';
import { TabsPage } from '../../pages/tabs/tabs';
import { HomePage } from '../../pages/home/home';
import { ViewController, AlertController, LoadingController, NavController, Platform, NavParams } from 'ionic-angular'

@Component({
  selector: 'page-project',
  templateUrl: 'project.html'
})
export class ProjectPage {

  user: any;
  uid: number;
  time: string;
  p: any;
  error: string;
  progressBar: number;
  milestoneList: any[];
  commentsList: any[];
  mvalue: number;
  mdesc: string;
  donation: number;
  cmt: string;

  constructor(public alertController: AlertController,
    public nav: NavController,
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    public platform: Platform,
    public api: Api,
    public navParams: NavParams) {
    this.user = navParams.get("user");
    this.uid = this.user.id;
    this.p = navParams.get("project");
    this.error = '';
    this.milestoneList = [];
    this.commentsList = [];
    this.populatePage();
  }

  refresh() {
    this.milestoneList = [];
    this.commentsList = [];
    this.populatePage();
  }

  ionViewWillEnter() {
    this.error = '';
    this.refresh();
  }

  isOwned() {
    return this.uid==this.p.owner;
  }

  isFollowed() {
    for (let i=0;i<this.user.follows.length;i++) {
      if (this.user.follows[i]==this.p.id)
        return true;
    }
    return false;
  }

  follow() {
    this.api.postFollow({user: this.uid.toString(), project: this.p.id.toString()}).then(
      data => { 
        if (data) {
          if (data.status) {
            this.api.getUser(this.uid).then(             
              udata => {            
                if (udata.id) {
                  this.error = '';
                  this.user = udata;
                } else {
                    this.error = 'Lost connection to the database.';
                }
              },
              error => {
                this.error = 'Lost connection to the database.';
              });
           } else if (data.error.message == "Project does not exist.") {
             this.error = "Project does not exist.";
           } else if (data.error.message == "User does not exist.") {
            this.error = "User does not exist.";
           } else if (data.error.message == "User is project owner.") {
             this.error = "You can't unfollow your own project!";
           } else {
            this.error = "Some parameters were deemed invalid.";
           }
        } else {
          this.error = 'Couldn\'t connect to the database.';
        }
      });
  }

  donate() {
    if (this.donation==null) {
      this.error = "Please input a donation value.";
      return;
    }
    if (this.donation<=0) {
      this.error = "Please input a valid donation amount.";
      return;
    }
    this.api.postDonate({amount: this.donation.toString(), project: this.p.id.toString()}).then(
      data => { 
        if (data) {
          if (data.status) {
            this.api.getProject(this.p.id).then(
              pdata => {               
                if (pdata.id) {
                  this.error = '';
                  this.p = pdata;
                  this.refresh();
                } else {
                    this.error = 'Lost connection to the database.';
                }
              },
              error => {
                this.error = 'Lost connection to the database.';
              });
           } else if (data.error.message == "Project does not exist.") {
             this.error = "Project does not exist.";
           } else {
            this.error = "Some donation parameters were deemed invalid.";
           }
        } else {
          this.error = 'Couldn\'t connect to the database.';
        }
      });
  }

  addMilestone() {
    if (this.mvalue==null || this.mdesc==null || this.mdesc==='') {
      this.error = "Every milestone field is required.";
      return;
    }

    if (this.mvalue<=0) {
        this.error = "Please input a valid milestone amount.";
        return;
      }
      
    this.api.postMilestone({amount: this.mvalue.toString(), desc: this.mdesc, project: this.p.id.toString()}).then(
      data => { 
        if (data) {
          if (data.status) {
            this.api.getProject(this.p.id).then(
              pdata => {               
                if (pdata.id) {
                  this.error = '';
                  this.p = pdata;
                  this.refresh();
                } else {
                    this.error = 'Lost connection to the database.';
                }
              },
              error => {
                this.error = 'Lost connection to the database.';
              });
            } else if (data.error.message == "Project does not exist.") {
              this.error = "Project does not exist.";
            } else {
            this.error = "Some milestone parameters were deemed invalid.";
            }
        } else {
          this.error = 'Couldn\'t connect to the database.';
        }
      });

  }

  addComment() {
    if (this.cmt==null || this.cmt==='') {
      this.error = "Can\'t send an empty comment.";
      return;
    }

    this.api.postComment({content: this.cmt, user: this.uid.toString(), project: this.p.id.toString()}).then(
      data => { 
        if (data) {
          if (data.status) {
            this.api.getProject(this.p.id).then(
              pdata => {               
                if (pdata.id) {
                  this.error = '';
                  this.p = pdata;
                  this.refresh();
                } else {
                    this.error = 'Lost connection to the database.';
                }
              },
              error => {
                this.error = 'Lost connection to the database.';
              });
            } else if (data.error.message == "Project does not exist.") {
              this.error = "Project does not exist.";
            } else if (data.error.message == "User does not exist.") {
              this.error = "User does not exist.";
            } else {
            this.error = "Some comment parameters were deemed invalid.";
            }
        } else {
          this.error = 'Couldn\'t connect to the database.';
        }
      });
  }

  populatePage() {
    this.createTimeString();
    if (this.p.goal==0) this.progressBar = 0;    
    else this.progressBar = Math.floor(this.p.progress/this.p.goal * 100);
    for (let i=0;i<this.p.milestones.length;i++) {
      let obj = this.p.milestones[i];
      let key = Object.keys(obj)[0]+"€";
      let val = obj[Object.keys(obj)[0]];
      this.milestoneList.push({k: key, v: val});
    }
    this.commentsList = this.p.comments;
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
