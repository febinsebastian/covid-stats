import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  SimpleChanges,
} from '@angular/core';
import { VaccinationStatistics } from '../../interfaces';
import { DashboardService } from '../../services/dashboard.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-vaccine-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vaccine-chart.component.html',
  styleUrl: './vaccine-chart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VaccineChartComponent {
  @Input() country?: string;
  chart!: unknown;

  constructor(private readonly dashboardService: DashboardService) {}

  ngOnChanges(changes: SimpleChanges) {
    this.fetchCovidHistroy();
  }

  fetchCovidHistroy() {
    if (this.country) {
      this.dashboardService
        .fetchVaccinationCountryStatisticalData(this.country)
        .subscribe({
          next: (response) => {
            this.generateChart(response.timeline);
          },
          error: (error) => {
            console.log(error);
          },
        });
    } else {
      this.dashboardService.fetchVaccinationStatisticalData('').subscribe({
        next: (response) => {
          this.generateChart(response);
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }

  generateChart(data: VaccinationStatistics) {
    if (this.chart) {
      (this.chart as Chart).destroy();
    }
    this.chart = new Chart('vaccine-chart', {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'Vaccination',
            data: data,
            borderWidth: 1,
            pointRadius: 0,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            enabled: true,
          },
        },
      },
    });
  }
}
