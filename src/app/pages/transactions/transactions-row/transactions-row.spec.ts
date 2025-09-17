import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsRow } from './transactions-row';

describe('TransactionsRow', () => {
  let component: TransactionsRow;
  let fixture: ComponentFixture<TransactionsRow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionsRow]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionsRow);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
