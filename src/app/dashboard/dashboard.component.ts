import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HistoryChartComponent } from './components/history-chart/history-chart.component';
import { IndicatorComponent } from './components/indicator/indicator.component';
import { VaccineChartComponent } from './components/vaccine-chart/vaccine-chart.component';
import { IndicatorDataInterface } from './interfaces';
import { DashboardService } from './services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    HistoryChartComponent,
    IndicatorComponent,
    VaccineChartComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit, OnDestroy {
  selectedCountry$ = new BehaviorSubject<string | undefined>(undefined);

  indicatorData: IndicatorDataInterface[] = [
    { key: 'cases', label: 'Total Cases', icon: '🤒' },
    { key: 'deaths', label: 'Total Deaths', icon: '🤢' },
    { key: 'recovered', label: 'Total Recovered', icon: '😊' },
    { key: 'active', label: 'Active Cases', icon: '😔' },
  ];

  constructor(private readonly dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.selectedCountry$.subscribe({
      next: (country) => {
        this.fetchStatistics(country);
      },
    });
  }

  changeSelection(country?: string) {
    this.selectedCountry$.next(country);
  }

  private fetchStatistics(country?: string): void {
    const endpoint = country ? `countries/${country}` : 'all';

    this.dashboardService.fetchStatisticalData(endpoint).subscribe({
      next: (response) => {
        this.indicatorData.forEach((data) => {
          this.indicatorData = this.indicatorData.map((data) => ({
            ...data,
            data: response[data.key],
          }));
        });
      },
    });
  }

  ngOnDestroy(): void {
    if (this.selectedCountry$) {
      this.selectedCountry$.unsubscribe();
    }
  }
}
