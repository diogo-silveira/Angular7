import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ApiUrl } from '../enums/api-url.enum';
import { Subject } from 'rxjs/Subject';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/finally';


@Injectable()
export class HttpService {


  private showMethodObservable = new Subject<any>();
  private hideMethodObservable = new Subject<any>();

  showProgressBar = this.showMethodObservable.asObservable();
  hideProgressBar = this.hideMethodObservable.asObservable();

  private apiCore = environment.urlCore;
  private httpOptions = { headers: new HttpHeaders({}) };


  constructor(
    private http: HttpClient) {

  }

  get(url: string, api: ApiUrl): Observable<any> {

    this.showLoader();

    return this.http.get<any>(this.getFullUrl(api, url), this.httpOptions)
      .do(() => this.onSuccess())
      .catch((error: any) => Observable.throw(this.errorHandler(error)))
      .finally(() => {
        this.finaliseRequest();
      });
  }

  post(url: string, data: any, api: ApiUrl): Observable<any> {

    this.showLoader();

    return this.http.post<any>(this.getFullUrl(api, url), data, this.httpOptions)
      .do(() => this.onSuccess())
      .catch((error: any) => Observable.throw(this.errorHandler(error)))
      .finally(() => {
        this.finaliseRequest();
      });
  }

  put(url: string, data: any, api: ApiUrl): Observable<any> {

    this.showLoader();

    return this.http.put<any>(this.getFullUrl(api, url), data, this.httpOptions)
      .do(() => this.onSuccess())
      .catch((error: any) => Observable.throw(this.errorHandler(error)))
      .finally(() => {
        this.finaliseRequest();
      });
  }

  private showLoader() {
    this.showMethodObservable.next();
  }

  private finaliseRequest() {
    this.hideMethodObservable.next();
    this.httpOptions.headers = new HttpHeaders();
  }

  private getFullUrl(api: ApiUrl, url: string): string {

    let apiUrl: string;
    
    if (api === ApiUrl.Core) 
    {
      apiUrl = this.apiCore + url;
    }

    return apiUrl;

  } 

  private onSuccess(): void {
    console.log('Request successful');

  }

  private errorHandler(error: any): void {

    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }

    this.handlerErrorStatus(error);
  }

  private handlerErrorStatus(error: any): void {
   // this.progressSpinner.hide();
    //this.dialog.closeAll();

    console.log('Error => ' + error)

  }

}
