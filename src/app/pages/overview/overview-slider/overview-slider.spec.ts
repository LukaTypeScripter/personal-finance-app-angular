import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideTranslateService } from '@ngx-translate/core';
import { OverviewSlider } from './overview-slider';

describe('OverviewSlider', () => {
  let component: OverviewSlider;
  let fixture: ComponentFixture<OverviewSlider>;

  // currentSlide and slides are protected on the component; access via index
  // signatures in the spec to read them without widening production visibility.
  const currentSlide = () => (component as unknown as { currentSlide: () => number }).currentSlide();
  const slides = () => (component as unknown as { slides: unknown[] }).slides;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverviewSlider],
      providers: [provideZonelessChangeDetection(), provideTranslateService({ fallbackLang: 'en' })],
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
    expect(currentSlide()).toBe(1);
  });

  it('should navigate to previous slide', () => {
    component.prevSlide();
    expect(currentSlide()).toBe(slides().length - 1);
  });

  it('should go to specific slide', () => {
    component.goToSlide(2);
    expect(currentSlide()).toBe(2);
  });
});
