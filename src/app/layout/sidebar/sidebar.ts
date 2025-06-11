import { Component } from '@angular/core';
import { tabConfig } from './helper/configs/tab.config';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss'
})
export class Sidebar {
  tabConfig = tabConfig;
}
