import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card-header',
  imports: [RouterLink],
  templateUrl: './card-header.html',
  styleUrl: './card-header.scss'
})
export class CardHeader {
  title = input.required<string>();
  redirectPlaceHolder = input.required<string>();
  redirectPath = input<string>();
}
