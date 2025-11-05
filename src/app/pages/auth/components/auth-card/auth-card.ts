import {Component, computed, inject, input} from '@angular/core';
import {Navigation} from '@/app/shared/service/navigation';
import {AuthService} from '@/app/core/service/auth.service';

@Component({
  selector: 'app-auth-card',
  imports: [],
  templateUrl: './auth-card.html',
  styleUrl: './auth-card.scss'
})
export class AuthCard {
  title = input<string>('');

  private readonly navigation = inject(Navigation)
  private readonly authService = inject(AuthService)

  public isInRegistration = computed(() => this.navigation.currentUrl() === '/auth/register')
  public isInLogin = computed(() => this.navigation.currentUrl() === '/auth/login');


  handleNavigate() {
    if (this.isInLogin()) {
      this.navigation.navigateTo('/auth/register');
    } else if (this.isInRegistration()) {
      this.navigation.navigateTo('/auth/login');
    }
  }

  handleDemoLogin() {
    this.authService.login({password:'Chopy686866',email:'lukashinjikashvili85@gmail.com'}).subscribe({
      next: () => {
        this.navigation.navigateTo('/dashboard/overview');
      }
    })
  }
}
