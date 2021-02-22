import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {ChartModule} from 'angular-highcharts';
import {ChartComponent} from './chart.component';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    ChartComponent
  ],
  imports: [
    ChartModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [ChartComponent]
})
export class AppModule {
}
