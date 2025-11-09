import { Component, computed, effect, inject, signal } from '@angular/core';
import { tabConfig } from './helper/configs/tab.config';
import { SvgIcon } from '@/app/shared/components/svg-icon/svg-icon';
import {  NavigationEnd, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';
import {Navigation} from '@/app/shared/service/navigation';
import {AuthService} from '@/app/core/service/auth.service';
import { TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-sidebar',
  imports: [SvgIcon,RouterLink, TranslateModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss'
})
export class Sidebar {
  protected readonly tabConfig = tabConfig;

  private readonly navigation = inject(Navigation)
  private readonly authService = inject(AuthService)



  public  currentUrl = this.navigation.currentUrl

  public isSidebarOpen = signal(true);



}
