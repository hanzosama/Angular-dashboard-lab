import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {DashboardSeriesModel} from '../models/dashboard-series.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  // Path and query parameters here
  type: string;
  untilYear: number;

  constructor(private httpClient: HttpClient) {
    this.type = '';
    this.untilYear = 0;
  }

  getCovidRiskLevel(): Promise<DashboardSeriesModel> {
    this.type = 'OVERALL';
    this.untilYear = new Date().getFullYear();
    const params: HttpParams = new HttpParams()
      .set('type', this.type)
      .set('untilYear', this.untilYear.toString());
    return this.httpClient.get<DashboardSeriesModel>('./assets/covid-19-risk-level.json', {params}).toPromise();
  }

  getFacebookTwitterTrends(): Promise<DashboardSeriesModel> {
    this.type = 'TIMELINE';
    this.untilYear = new Date().getFullYear();
    const params: HttpParams = new HttpParams()
      .set('type', this.type)
      .set('untilYear', this.untilYear.toString());
    return this.httpClient.get<DashboardSeriesModel>('./assets/market-trends.json', {params}).toPromise();
  }

  getMobileOSUsage(): Promise<DashboardSeriesModel> {
    this.type = 'TIMELINE';
    this.untilYear = new Date().getFullYear();
    const params: HttpParams = new HttpParams()
      .set('type', this.type)
      .set('untilYear', this.untilYear.toString());
    return this.httpClient.get<DashboardSeriesModel>('./assets/ios-android-usage.json', {params}).toPromise();
  }


}



