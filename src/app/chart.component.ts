// chart.component.ts
import {Chart} from 'angular-highcharts';
import {Component, OnInit} from '@angular/core';
import {DashboardService} from './services/dashboard.service';
import {valueReferenceToExpression} from '@angular/compiler-cli/src/ngtsc/annotations/src/util';
import {Options} from 'highcharts';


@Component({
  templateUrl: './chart.component.html',
  selector: 'app-chart-component'
})
export class ChartComponent implements OnInit {


  /**
   * Covid Risk options
   */
  getCovidRiskLeveloptions: Options = {
    chart: {
      plotShadow: false,
      type: 'pie'
    },
    title: {
      text: ''
    },
    credits: {
      enabled: false
    },
    tooltip: {
      pointFormat: '<b>{point.y}</b>'
    },
    accessibility: {
      point: {
        valueSuffix: '%'
      }
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.y}'
        }
      }
    }
  };

  covidRiskLevelChart: Chart;


  /**
   * Market Trends
   */
  myDateFormat = '%b/%Y';
  marketTrendsOptions: Options = {
    chart: {
      type: 'line',
      zoomType: 'x'
    },
    title: {
      text: ''
    },
    tooltip: {
      pointFormat: '<b>{point.y}</b>'
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle',
      borderWidth: 0
    },
    credits: {
      enabled: false
    },
    xAxis: {
      type: 'datetime',
      dateTimeLabelFormats: {
        millisecond: this.myDateFormat,
        second: this.myDateFormat,
        minute: this.myDateFormat,
        hour: this.myDateFormat,
        day: this.myDateFormat,
        week: this.myDateFormat,
        month: this.myDateFormat,
        year: this.myDateFormat
      }
    },
    yAxis: {
      title: {
        text: 'Amount'
      }
    },
    plotOptions: {
      series: {
        marker: {
          enabled: false
        }
      }
    }
  };

  marketTrendsChart: Chart;


  /**
   * Mobile OS
   */
  mobileOSTrendsOptions: Options = {
    chart: {
      inverted: false,
      type: 'column',
      zoomType: 'x'
    },
    title: {
      text: ''
    },
    tooltip: {
      pointFormat: '<b>{point.y}</b>'
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle',
      borderWidth: 0
    },
    credits: {
      enabled: false
    },
    xAxis: {
      type: 'datetime',
      dateTimeLabelFormats: {
        millisecond: this.myDateFormat,
        second: this.myDateFormat,
        minute: this.myDateFormat,
        hour: this.myDateFormat,
        day: this.myDateFormat,
        week: this.myDateFormat,
        month: this.myDateFormat,
        year: this.myDateFormat
      }
    },
    yAxis: {
      title: {
        text: 'Amount'
      }
    },
    plotOptions: {
      series: {
        marker: {
          enabled: false
        }
      }
    }
  };

  mobileOSTrendsChart: Chart;


  constructor(private dashboardService: DashboardService) {
    this.covidRiskLevelChart = new Chart(this.getCovidRiskLeveloptions);
    this.marketTrendsChart = new Chart(this.marketTrendsOptions);
    this.mobileOSTrendsChart = new Chart(this.mobileOSTrendsOptions);
  }

  ngOnInit(): void {
    this.covidRiskLevelChart = new Chart(this.getCovidRiskLeveloptions);
    this.marketTrendsChart = new Chart(this.marketTrendsOptions);
    this.mobileOSTrendsChart = new Chart(this.mobileOSTrendsOptions);
    this.getCovidRiskLevel();
    this.getMobileOSUsage();
    this.getFacebookTwitterTrends();
  }


  getCovidRiskLevel() {
    this.dashboardService.getCovidRiskLevel().then(data => {
      var dataArary = new Array();
      data.data.forEach(value => {
        dataArary.push({name: value.label, y: value.y});
      });

      this.covidRiskLevelChart.ref.setTitle({text: data.title});
      this.covidRiskLevelChart.addSeries({
        name: '' + data.from + '',
        type: 'pie',
        data: dataArary
      }, true, true);
    });

  }


  getFacebookTwitterTrends() {
    this.dashboardService.getFacebookTwitterTrends().then(data => {
      this.marketTrendsChart.ref.setTitle({text: data.title});
      data.series.forEach(serie => {
        var dataArary = new Array();
        serie.data.forEach(value => {
          let dateTime = value.timestamp * 1000;
          // This is the format for TimeLine Chart
          dataArary.push([dateTime, value.y]);
        });

        this.marketTrendsChart.addSeries({
          name: '' + serie.name + '',
          type: 'line',
          data: dataArary
        }, true, true);

      });

    });
  }


  getMobileOSUsage() {
    this.dashboardService.getMobileOSUsage().then(data => {
      this.mobileOSTrendsChart.ref.setTitle({text: data.title});
      data.series.forEach(serie => {
        var dataArary = new Array();
        serie.data.forEach(value => {
          let dateTime = value.timestamp * 1000;
          // This is the format for TimeLine Chart
          dataArary.push([dateTime, value.y]);
        });

        this.mobileOSTrendsChart.addSeries({
          name: '' + serie.name + '',
          type: 'column',
          data: dataArary
        }, true, true);

      });

    });
  }
}
