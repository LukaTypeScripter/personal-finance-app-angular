import { Component, inject } from '@angular/core';
import { OverviewPotsSaved } from './overview-pots-saved/overview-pots-saved';
import { OverviewPotsSummary } from './overview-pots-summary/overview-pots-summary';
import { CardHeader } from '@/app/shared/components/card-header/card-header';
import { Api } from '@/app/shared/service/api';
import { SUMMARY_TYPE } from '@/app/core/constants/summary.constant';
import {AuthService} from '@/app/core/service/auth.service';
import {TranslateModule} from '@ngx-translate/core';
@Component({
  selector: 'app-overview-pots',
  imports: [CardHeader,OverviewPotsSaved,OverviewPotsSummary,TranslateModule],
  templateUrl: './overview-pots.html',
  styleUrl: './overview-pots.scss'
})
export class OverviewPots {
  protected SUMMARY_TYPE = SUMMARY_TYPE;

  protected api = inject(Api)

  currency = this.api.currency

    userPots = this.api.pots
}
