export class DashboardSeriesModel {
  title?: string;
  year?: number;
  from?: number;
  data: Array<DataSeries> = [];
  series: Array<Series> = [];
}

export class DataSeries {
  timestamp: number;
  label: string;
  y: number;

  constructor() {
    this.label = '';
    this.y = 0;
    this.timestamp = 0;
  }
}

export class Series {
  name: string;
  data: Array<DataSeries> = [];

  constructor() {
    this.name = '';
  }
}
