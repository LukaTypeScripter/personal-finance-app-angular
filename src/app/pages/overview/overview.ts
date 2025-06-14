import { Component } from '@angular/core';
import { OverviewCard } from './overview-card/overview-card';
import { OverviewPots } from './overview-pots/overview-pots';

@Component({
  selector: 'app-overview',
  imports: [OverviewCard,OverviewPots],
  templateUrl: './overview.html',
  styleUrl: './overview.scss'
})
export class Overview {

}
