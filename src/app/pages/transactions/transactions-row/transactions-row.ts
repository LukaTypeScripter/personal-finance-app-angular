import {Component, effect, input} from '@angular/core';
import {Transaction} from '@/app/core/models/finance-data.model';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-transactions-row',
  imports: [
    DatePipe
  ],
  templateUrl: './transactions-row.html',
  styleUrl: './transactions-row.scss'
})
export class TransactionsRow {

  transaction = input<Transaction>()


}
