import { Component } from '@angular/core';
import { OverviewPotsHeader } from './overview-pots-header/overview-pots-header';
import { OverviewPotsSaved } from './overview-pots-saved/overview-pots-saved';
import { OverviewPotsSummary } from './overview-pots-summary/overview-pots-summary';
@Component({
  selector: 'app-overview-pots',
  imports: [OverviewPotsHeader,OverviewPotsSaved,OverviewPotsSummary],
  templateUrl: './overview-pots.html',
  styleUrl: './overview-pots.scss'
})
export class OverviewPots {

}
