import { CovidHistory } from './covid-history.interface';

export interface CovidCountryHistory {
  country: string;
  timeline: CovidHistory;
}
