import { VaccinationStatistics } from './vaccination-statistics.interface';

export interface VaccinationCountryStatistics {
  country: string;
  timeline: VaccinationStatistics;
}
