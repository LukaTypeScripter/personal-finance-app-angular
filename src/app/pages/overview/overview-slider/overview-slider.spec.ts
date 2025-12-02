import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OverviewSlider } from './overview-slider';

describe('OverviewSlider', () => {
  let component: OverviewSlider;
  let fixture: ComponentFixture<OverviewSlider>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverviewSlider]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverviewSlider);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to next slide', () => {
    component.nextSlide();
    expect(component.currentSlide()).toBe(1);
  });

  it('should navigate to previous slide', () => {
    component.prevSlide();
    expect(component.currentSlide()).toBe(component.slides.length - 1);
  });

  it('should go to specific slide', () => {
    component.goToSlide(2);
    expect(component.currentSlide()).toBe(2);
  });
});
