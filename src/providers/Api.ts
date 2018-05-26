import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class Api {

  private endpoint = "http://deti-tqs-05.ua.pt:8181/GoCommunity-1.0-SNAPSHOT/faces/api/data";

    constructor(public http: Http) {
        console.log('Provider online');
    }

    getUser(arg: any): Promise<any> {
      let url: string = this.endpoint+"/user/"+arg;
      console.log(url);
      return this.http.get(url)
        .toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    getProject(arg: any): Promise<any> {
        let url: string = this.endpoint+"/project/"+arg;
        console.log(url);
        return this.http.get(url)
          .toPromise()
          .then(this.extractData)
          .catch(this.handleError);
      }

    getPopular(): Promise<any> {
        let url: string = this.endpoint+"/popular";
        console.log(url);
        return this.http.get(url)
        .toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    getSearch(arg: any): Promise<any> {
      let url: string = this.endpoint+"/search/"+arg;
      console.log(url);
      return this.http.get(url)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

    getLoginResult(user: string, pword: string): Promise<any> {
      let url: string = this.endpoint+"/login?user="+user+"&pword="+pword;
      console.log(url);
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