import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from '../sidebar/sidebar';

@Component({
  selector: 'app-dashboard-layout',
  imports: [RouterOutlet, Sidebar],
  template: `
    <div class="dashboard-layout">
      <app-sidebar></app-sidebar>
      <div class="dashboard-layout__content">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styleUrl: './dashboard-layout.scss'
})
export class DashboardLayout {}
