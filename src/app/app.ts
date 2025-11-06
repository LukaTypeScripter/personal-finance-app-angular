import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GlobalSpinner } from './shared/components/global-spinner/global-spinner.component';
import { FloatingMenuComponent } from './shared/components/floating-menu/floating-menu.component';
import { NavigationLoaderService } from './core/service/navigation-loader.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GlobalSpinner, FloatingMenuComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'personal-finance-app';
  private navigationLoader = inject(NavigationLoaderService);

  constructor() {
    this.navigationLoader.init();
  }
}
