import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import Chart from 'chart.js/auto';
import { CovidHistory } from '../../interfaces';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-history-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './history-chart.component.html',
  styleUrl: './history-chart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistoryChartComponent implements OnChanges {
  @Input() country?: string;
  chart!: unknown;

  constructor(private readonly dashboardService: DashboardService) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.fetchCovidHistroy();
  }

  fetchCovidHistroy() {
    if (this.country) {
      this.dashboardService.fetchCountryHistory(this.country).subscribe({
        next: (response) => {
          this.generateChart(response.timeline);
        },
        error: (error) => {
          console.log(error);
        },
      });
    } else {
      this.dashboardService.fetchHistory().subscribe({
        next: (response) => {
          this.generateChart(response);
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }

  generateChart(data: CovidHistory) {
    if (this.chart) {
      (this.chart as Chart).destroy();
    }
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'Cases',
            data: data.cases,
            borderWidth: 1,
            pointRadius: 0,
          },
          {
            label: 'Recovered',
            data: data.recovered,
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
