import { Component, inject } from '@angular/core';
import { OverviewPotsSaved } from './overview-pots-saved/overview-pots-saved';
import { OverviewPotsSummary } from './overview-pots-summary/overview-pots-summary';
import { CardHeader } from '@/app/shared/components/card-header/card-header';
import { Api } from '@/app/shared/service/api';
import { SUMMARY_TYPE } from '@/app/core/constants/summary.constant';
@Component({
  selector: 'app-overview-pots',
  imports: [CardHeader,OverviewPotsSaved,OverviewPotsSummary],
  templateUrl: './overview-pots.html',
  styleUrl: './overview-pots.scss'
})
export class OverviewPots {
  protected SUMMARY_TYPE = SUMMARY_TYPE;

  protected pots = inject(Api).userPots;

}
