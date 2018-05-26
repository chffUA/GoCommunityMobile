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

  uid: number;
  error: string;
  user: any;
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

      this.user = navParams.get("user");
      this.uid = this.user.id;
      this.ownData = [];
      this.followData = [];
      this.popularData = [];
      
      this.populatePage();
      this.error = '';

  }

  visitProject(p: any) {
    this.nav.push(this.projectPage, {user: this.user, project: p});
  }

  refresh() {
    this.populatePage();
  }

  populatePage() {
    
    let loader = this.loadingCtrl.create({
      content: "Retrieving information..."
    });

    loader.present();

    for (let i=0;i<this.user.owns.length;i++) {
      this.api.getProject(this.user.owns[i]).then(
        odata => {
          if (odata) this.ownData.push(odata);
          else this.error = 'Couldn\'t retrieve owned project information.';
        }
      );
    }

    for (let i=0;i<this.user.follows.length;i++) {
      this.api.getProject(this.user.follows[i]).then(
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

    loader.dismiss();

  }

}
