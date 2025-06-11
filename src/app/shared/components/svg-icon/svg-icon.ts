import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-svg-icon',
  imports: [CommonModule],
  templateUrl: './svg-icon.html',
  styleUrl: './svg-icon.scss'
})
export class SvgIcon {
  iconName = input<string>(''); 
  fill = input<string>('#000');

  height = input<number>(24);
  width = input<number>(24);

  iconPath = computed(() => `./assets/images/${this.iconName()}`);
}
