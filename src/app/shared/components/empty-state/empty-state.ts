import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SvgIcon } from '@/app/shared/components/svg-icon/svg-icon';

@Component({
  selector: 'app-empty-state',
  imports: [RouterLink, SvgIcon],
  templateUrl: './empty-state.html',
  styleUrl: './empty-state.scss',
})
export class EmptyState {
  icon = input<string>('');
  title = input<string>('');
  message = input<string>('');
  ctaLabel = input<string>('');
  ctaRoute = input<string>('');
}
