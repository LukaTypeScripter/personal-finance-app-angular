import { Component, signal, ElementRef, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

interface Slide {
  titleKey: string;
  descriptionKey: string;
  color: string;
}

@Component({
  selector: 'app-overview-slider',
  imports: [CommonModule, TranslateModule],
  templateUrl: './overview-slider.html',
  styleUrl: './overview-slider.scss'
})
export class OverviewSlider {
  protected currentSlide = signal(0);

  private touchStartX = 0;
  private touchEndX = 0;
  private isDragging = false;

  protected slides: Slide[] = [
    {
      titleKey: 'overview.slider.slide1.title',
      descriptionKey: 'overview.slider.slide1.description',
      color: '#277C78'
    },
    {
      titleKey: 'overview.slider.slide2.title',
      descriptionKey: 'overview.slider.slide2.description',
      color: '#82C9D7'
    },
    {
      titleKey: 'overview.slider.slide3.title',
      descriptionKey: 'overview.slider.slide3.description',
      color: '#F2CDAC'
    },
    {
      titleKey: 'overview.slider.slide4.title',
      descriptionKey: 'overview.slider.slide4.description',
      color: '#626070'
    }
  ];

  nextSlide(): void {
    this.currentSlide.update(val => (val + 1) % this.slides.length);
  }

  prevSlide(): void {
    this.currentSlide.update(val =>
      val === 0 ? this.slides.length - 1 : val - 1
    );
  }

  goToSlide(index: number): void {
    this.currentSlide.set(index);
  }

  onTouchStart(event: TouchEvent): void {
    this.touchStartX = event.changedTouches[0].screenX;
    this.isDragging = true;
  }

  onTouchMove(event: TouchEvent): void {
    if (!this.isDragging) return;
    this.touchEndX = event.changedTouches[0].screenX;
  }

  onTouchEnd(): void {
    if (!this.isDragging) return;
    this.isDragging = false;
    this.handleSwipe();
  }

  onMouseDown(event: MouseEvent): void {
    this.touchStartX = event.screenX;
    this.isDragging = true;
  }

  onMouseMove(event: MouseEvent): void {
    if (!this.isDragging) return;
    this.touchEndX = event.screenX;
  }

  onMouseUp(): void {
    if (!this.isDragging) return;
    this.isDragging = false;
    this.handleSwipe();
  }

  onMouseLeave(): void {
    if (this.isDragging) {
      this.isDragging = false;
    }
  }

  private handleSwipe(): void {
    const swipeThreshold = 50;
    const diff = this.touchStartX - this.touchEndX;

    if (Math.abs(diff) < swipeThreshold) return;

    if (diff > 0) {
      this.nextSlide();
    } else {
      this.prevSlide();
    }

    this.touchStartX = 0;
    this.touchEndX = 0;
  }
}
