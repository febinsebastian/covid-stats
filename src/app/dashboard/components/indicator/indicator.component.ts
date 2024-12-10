import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IndicatorDataInterface } from '../../interfaces';

@Component({
  selector: 'app-indicator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './indicator.component.html',
  styleUrl: './indicator.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndicatorComponent {
  @Input() data!: IndicatorDataInterface;
}
