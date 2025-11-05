import { Component, inject } from '@angular/core';
import { LoadingService } from '@/app/core/service/loading.service';
import { CommonModule } from '@angular/common';
import { LottieComponent, AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-global-spinner',
  standalone: true,
  imports: [CommonModule, LottieComponent],
  templateUrl: './global-spinner.component.html',
  styleUrl: './global-spinner.component.scss'
})
export class GlobalSpinner {
  private loadingService = inject(LoadingService);

  isLoading = this.loadingService.isLoading;

  lottieOptions: AnimationOptions = {
    path: 'assets/lottie/loading.json',
    loop: true,
    autoplay: true,
  };
}
