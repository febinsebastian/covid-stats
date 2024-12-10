import { CovidStatistics } from './covid-statistics.interface';

export interface IndicatorDataInterface {
  key: keyof CovidStatistics;
  label: string;
  data?: number;
  icon: string;
}
