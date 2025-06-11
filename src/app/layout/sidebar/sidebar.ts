import { Component, computed, effect, inject, signal } from '@angular/core';
import { tabConfig } from './helper/configs/tab.config';
import { SvgIcon } from '@/app/shared/components/svg-icon/svg-icon';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  imports: [SvgIcon,RouterLink],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss'
})
export class Sidebar {
  protected readonly tabConfig = tabConfig;

  private router = inject(Router);

  public  currentUrl = computed(() => {
    return this.navigationInformation()?.url ?? this.router.url;
  });

  private navigationInformation = toSignal(this.router.events.pipe(filter(event => event instanceof NavigationEnd)));
}
