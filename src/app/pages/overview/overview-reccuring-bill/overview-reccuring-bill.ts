import { Component } from '@angular/core';
import { CardHeader } from '@/app/shared/components/card-header/card-header';
import { OverviewReccuringBillItem } from './overview-reccuring-bill-item/overview-reccuring-bill-item';
@Component({
  selector: 'app-overview-reccuring-bill',
  imports: [CardHeader,OverviewReccuringBillItem],
  templateUrl: './overview-reccuring-bill.html',
  styleUrl: './overview-reccuring-bill.scss'
})
export class OverviewReccuringBill {

}
