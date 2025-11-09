import { Component, inject } from '@angular/core';
import { CardHeader } from '@/app/shared/components/card-header/card-header';
import { OverviewReccuringBillItem } from './overview-reccuring-bill-item/overview-reccuring-bill-item';
import { Api } from '@/app/shared/service/api';
import {TranslateModule} from '@ngx-translate/core';
@Component({
  selector: 'app-overview-reccuring-bill',
  imports: [CardHeader,OverviewReccuringBillItem,TranslateModule],
  templateUrl: './overview-reccuring-bill.html',
  styleUrl: './overview-reccuring-bill.scss'
})
export class OverviewReccuringBill {

  protected reccuringBills = inject(Api).transactions;
}
