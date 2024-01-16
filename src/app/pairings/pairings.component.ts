import { Component, inject } from '@angular/core';
import { DrawService } from '../draw.service';

@Component({
  selector: 'pairings',
  templateUrl: './pairings.component.html',
  styles: [
    `
    .pairing {
    background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgb(39 209 132 / 68%) 50%, rgba(255,255,255,0) 100%);
    }
    `
  ]
})
export class PairingsComponent {
  pairings = inject(DrawService).pairings;
}