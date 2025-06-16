import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReusableInput } from './reusable-input.component';

describe('ReusebleInput', () => {
  let component: ReusableInput;
  let fixture: ComponentFixture<ReusableInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReusableInput]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReusableInput);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
