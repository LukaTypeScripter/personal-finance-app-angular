import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReusableButton } from './reusable-button.component';

describe('ReusableButton', () => {
  let component: ReusableButton;
  let fixture: ComponentFixture<ReusableButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReusableButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReusableButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit clicked event when button is clicked', () => {
    let clickEmitted = false;
    component.clicked.subscribe(() => {
      clickEmitted = true;
    });

    const button = fixture.nativeElement.querySelector('button');
    button.click();

    expect(clickEmitted).toBeTruthy();
  });

  it('should not emit clicked event when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    let clickEmitted = false;
    component.clicked.subscribe(() => {
      clickEmitted = true;
    });

    const button = fixture.nativeElement.querySelector('button');
    button.click();

    expect(clickEmitted).toBeFalsy();
  });

  it('should not emit clicked event when loading', () => {
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();

    let clickEmitted = false;
    component.clicked.subscribe(() => {
      clickEmitted = true;
    });

    const button = fixture.nativeElement.querySelector('button');
    button.click();

    expect(clickEmitted).toBeFalsy();
  });
});
