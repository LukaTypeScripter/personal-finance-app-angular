import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GlobalSpinner } from './shared/components/global-spinner/global-spinner.component';
import { FloatingMenuComponent } from './shared/components/floating-menu/floating-menu.component';
import { NavigationLoaderService } from './core/service/navigation-loader.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GlobalSpinner, FloatingMenuComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'personal-finance-app';
  private navigationLoader = inject(NavigationLoaderService);
  private translate = inject(TranslateService);

  constructor() {
    this.navigationLoader.init();

    // Configure translation
    this.translate.addLangs(['en', 'geo']);
    this.translate.setDefaultLang('en');

    // Check for saved language preference first
    const savedLang = localStorage.getItem('app-language');
    if (savedLang && (savedLang === 'en' || savedLang === 'geo')) {
      this.translate.use(savedLang);
    } else {
      // Use browser language if available, otherwise fall back to English
      const browserLang = this.translate.getBrowserLang();
      this.translate.use(browserLang?.match(/en|geo/) ? browserLang : 'en');
    }
  }
}
