import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  CovidCountryHistory,
  CovidHistory,
  CovidStatistics,
  VaccinationCountryStatistics,
  VaccinationStatistics,
} from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private readonly http: HttpClient) {}

  fetchStatisticalData(path: string): Observable<CovidStatistics> {
    return this.http.get<CovidStatistics>(
      `https://disease.sh/v3/covid-19/${path}`
    );
  }

  fetchVaccinationStatisticalData(
    path: string
  ): Observable<VaccinationStatistics> {
    return this.http.get<VaccinationStatistics>(
      `https://disease.sh/v3/covid-19/vaccine/coverage${path}?lastdays=1000`
    );
  }

  fetchCovidData(): Observable<any> {
    return this.http.get('https://disease.sh/v3/covid-19/countries');
  }

  fetchHistory(): Observable<CovidHistory> {
    return this.http.get<CovidHistory>(
      `https://disease.sh/v3/covid-19/historical/all?lastdays=all`
    );
  }

  fetchCountryHistory(country: string): Observable<CovidCountryHistory> {
    return this.http.get<CovidCountryHistory>(
      `https://disease.sh/v3/covid-19/historical/${country}?lastdays=all`
    );
  }

  fetchVaccinationCountryStatisticalData(
    country: string
  ): Observable<VaccinationCountryStatistics> {
    return this.http.get<VaccinationCountryStatistics>(
      `https://disease.sh/v3/covid-19/vaccine/coverage/countries/${country}?lastdays=1000&fullData=false`
    );
  }
}
