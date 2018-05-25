import { Component } from '@angular/core';
import { Api } from '../../providers/api';
import { TabsPage } from '../../pages/tabs/tabs';
import { ProjectPage } from '../../pages/project/project';
import { AlertController, LoadingController, NavController, Platform, NavParams } from 'ionic-angular'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  id: number;
  error: string;
  ownData: any[];
  followData: any[];
  popularData: any[];
  projectPage = ProjectPage;

  constructor(
    public alertController: AlertController,
    public nav: NavController,
    public loadingCtrl: LoadingController,
    public platform: Platform,
    public api: Api,
    public navParams: NavParams) {

      this.ownData = [];
      this.followData = [];
      this.popularData = [];
      this.id = navParams.get("id");
      this.populatePageT();
      this.error = '';
      

      //INCLUDE COMMENTS AND PROGRESS IN REST API
  }

  visitProject(p: any) {
    this.nav.push(this.projectPage, {id: p.id});
  }

  populatePageT() {
    let loader = this.loadingCtrl.create({
      content: "Retrieving information..."
    });

    loader.present();

    let p1 = {endsOn:"2018-06-06",goal:"1000.00",name:"test",description:"test",id:2,milestones:[],createdOn:"2018-05-24"};
    let p2 = {endsOn:"2018-06-06",goal:"1000.00",name:"test",description:"test",id:4,milestones:[{"1250.00":"test"},{"125.00":"test"}],createdOn:"2018-05-24"};
    let p3 = {endsOn:"2018-06-06",goal:"1000.00",name:"test",description:"test",id:5,milestones:[],createdOn:"2018-05-24"};
    let p4 = {endsOn:"2018-06-06",goal:"1000.00",name:"test",description:"test",id:7,milestones:[],createdOn:"2018-05-24"};
    let p5 = {endsOn:"2018-06-06",goal:"1000.00",name:"test",description:"test",id:12,milestones:[],createdOn:"2018-05-24"};
    let p6 = {endsOn:"2018-06-06",goal:"1000.00",name:"test",description:"test",id:16,milestones:[],createdOn:"2018-05-24"};

    this.ownData.push(p5);this.ownData.push(p6);
    this.followData.push(p4);this.followData.push(p3);
    this.popularData.push(p1);this.popularData.push(p2);

    loader.dismiss();

  }

  populatePage() {
    
    //Create the loading indicator
    let loader = this.loadingCtrl.create({
      content: "Retrieving information..."
    });
    //Show the loading indicator
    loader.present();

    this.api.getUser(this.id).then(
      data => {
        
        if (data) {

          for (let p in data.owns) {
            this.api.getProject(p).then(
              odata => {
                if (odata) this.ownData.push(odata);
                else this.error = 'Couldn\'t retrieve owned project information.';
              }
            );
          }

          for (let p in data.follows) {
            this.api.getProject(p).then(
              fdata => {
                if (fdata) this.followData.push(fdata);
                else this.error = 'Couldn\'t retrieve followed project information.';
              }
            );
          }

          this.api.getPopular().then(
            pdata => {
              if (pdata) this.popularData = pdata.list;
              else this.error = 'Couldn\'t retrieve popular project information.';
            }
          );

        } else {
          this.error = 'Couldn\'t connect to the database.';
        }

        loader.dismiss();
      },
      error => {
        //Hide the loading indicator
        loader.dismiss();
        this.error = 'Couldn\'t connect to the database.';
      }
    );
  }

}
