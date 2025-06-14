import { Component } from '@angular/core';
import { OverviewPotsHeader } from './overview-pots-header/overview-pots-header';
import { OverviewPotsSaved } from './overview-pots-saved/overview-pots-saved';

@Component({
  selector: 'app-overview-pots',
  imports: [OverviewPotsHeader,OverviewPotsSaved],
  templateUrl: './overview-pots.html',
  styleUrl: './overview-pots.scss'
})
export class OverviewPots {

}
