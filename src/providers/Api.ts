import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class Api {

  private endpoint = "http://deti-tqs-05.ua.pt:8181/GoCommunity-1.0-SNAPSHOT/faces/api/data";
  private header;

    constructor(public http: Http) {
        //console.log('Provider online');
        this.header = new Headers();
        this.header.append('Content-Type', 'text/plain');
        this.header.append('Access-Control-Allow-Origin', '*');
        this.header.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    }

    postAccount(body: any): Promise<any> {
      let url: string = this.endpoint+"/createAccount";
      //console.log(url);
      return this.http.post(url, JSON.stringify(body), {"headers":this.header})
        .toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }
    
    postProject(body: any): Promise<any> {
      let url: string = this.endpoint+"/createProject";
      //console.log(url);
      return this.http.post(url, JSON.stringify(body), {"headers":this.header})
        .toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    postFollow(body: any): Promise<any> {
      let url: string = this.endpoint+"/follow";
      //console.log(url);
      return this.http.post(url, JSON.stringify(body), {"headers":this.header})
        .toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    postDonate(body: any): Promise<any> {
      let url: string = this.endpoint+"/donate";
      //console.log(url);
      return this.http.post(url, JSON.stringify(body), {"headers":this.header})
        .toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    postMilestone(body: any): Promise<any> {
      let url: string = this.endpoint+"/addMilestone";
      //console.log(url);
      return this.http.post(url, JSON.stringify(body), {"headers":this.header})
        .toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    postComment(body: any): Promise<any> {
      let url: string = this.endpoint+"/addComment";
      //console.log(url);
      return this.http.post(url, JSON.stringify(body), {"headers":this.header})
        .toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    getUser(arg: any): Promise<any> {
      let url: string = this.endpoint+"/user/"+arg;
      //console.log(url);
      return this.http.get(url)
        .toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    getProject(arg: any): Promise<any> {
        let url: string = this.endpoint+"/project/"+arg;
        //console.log(url);
        return this.http.get(url)
          .toPromise()
          .then(this.extractData)
          .catch(this.handleError);
      }

    getPopular(): Promise<any> {
        let url: string = this.endpoint+"/popular";
        //console.log(url);
        return this.http.get(url)
        .toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    getSearch(arg: any): Promise<any> {
      let url: string = this.endpoint+"/search/"+arg;
      //console.log(url);
      return this.http.get(url)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

    getLoginResult(user: string, pword: string): Promise<any> {
      let url: string = this.endpoint+"/login?user="+user+"&pword="+pword;
      //console.log(url);
      return this.http.get(url)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

    private extractData(res: Response) {
      //Convert the response to JSON format
      let body = res.json();
      //Return the data (or nothing)
      return body || {};
    }

    private handleError(res: Response | any) {
      console.error('Error encountered.');
      console.dir(res);
      return Promise.reject(res.message || res);
    }

}