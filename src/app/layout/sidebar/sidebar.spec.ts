import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sidebar } from './sidebar';
import { tabConfig } from './helper/configs/tab.config';
import { By } from '@angular/platform-browser';
import { SvgIcon } from '@/app/shared/components/svg-icon/svg-icon';

describe('Sidebar', () => {
  let component: Sidebar;
  let fixture: ComponentFixture<Sidebar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sidebar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Sidebar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the sidebar', () => {
    expect(component).toBeTruthy();
  });

  it('should render all tabs from tabConfig', () => {
    const tabElements = fixture.debugElement.queryAll(By.css('.sidebar__list-tab'));
    expect(tabElements.length).toBe(tabConfig.length);
  });

  it('should render correct icon and fill for each tab', () => {
    tabConfig.forEach((tab, idx) => {
      const icon = fixture.debugElement.queryAll(By.directive(SvgIcon))[idx];
      expect(icon.componentInstance.iconName()).toBe(tab.icon);
      expect(icon.componentInstance.fill()).toBe(tab.fill);
    });
  });

  it('should have correct routerLink for each tab', () => {
    const links = fixture.debugElement.queryAll(By.css('a[routerLink]'));
    links.forEach((link, idx) => {
      expect(link.attributes['ng-reflect-router-link']).toBe(tabConfig[idx].route);
    });
  });
});
