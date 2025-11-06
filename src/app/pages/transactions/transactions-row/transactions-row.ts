import {Component, effect, input} from '@angular/core';
import {Transaction} from '@/app/core/models/finance-data.model';
import {DatePipe} from '@angular/common';
import {CurrencyFormatPipe} from '@/app/shared/pipes/currency-format-pipe';

@Component({
  selector: 'app-transactions-row',
  imports: [
    DatePipe,
    CurrencyFormatPipe
  ],
  templateUrl: './transactions-row.html',
  styleUrl: './transactions-row.scss'
})
export class TransactionsRow {

  transaction = input<Transaction>()


}
