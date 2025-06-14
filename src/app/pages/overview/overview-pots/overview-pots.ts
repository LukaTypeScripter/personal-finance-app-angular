import { Component } from '@angular/core';
import { OverviewPotsSaved } from './overview-pots-saved/overview-pots-saved';
import { OverviewPotsSummary } from './overview-pots-summary/overview-pots-summary';
import { CardHeader } from '@/app/shared/components/card-header/card-header';
@Component({
  selector: 'app-overview-pots',
  imports: [CardHeader,OverviewPotsSaved,OverviewPotsSummary],
  templateUrl: './overview-pots.html',
  styleUrl: './overview-pots.scss'
})
export class OverviewPots {

}
