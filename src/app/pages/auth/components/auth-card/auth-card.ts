import {Component, computed, inject, input} from '@angular/core';
import {Navigation} from '@/app/shared/service/navigation';

@Component({
  selector: 'app-auth-card',
  imports: [],
  templateUrl: './auth-card.html',
  styleUrl: './auth-card.scss'
})
export class AuthCard {
  title = input<string>('');

  private readonly navigation = inject(Navigation)

  public isInRegistration = computed(() => this.navigation.currentUrl() === '/auth/register')
  public isInLogin = computed(() => this.navigation.currentUrl() === '/auth/login');


  handleNavigate() {
    console.log("1")
    if (this.isInLogin()) {
      this.navigation.navigateTo('/auth/register');
    } else if (this.isInRegistration()) {
      this.navigation.navigateTo('/auth/login');
    }
  }

  handleDemoLogin() {
    console.log('Demo login clicked');
  }
}
