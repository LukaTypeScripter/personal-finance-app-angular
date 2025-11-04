import { Component, input } from '@angular/core';

@Component({
  selector: 'app-auth-card',
  imports: [],
  templateUrl: './auth-card.html',
  styleUrl: './auth-card.scss'
})
export class AuthCard {
  title = input<string>('');
}
