import { Component, inject } from '@angular/core';
import { DrawService } from '../draw.service';

@Component({
  selector: 'draw-settings',
  templateUrl: './draw-settings.component.html'
})
export class DrawSettingsComponent {
  drawService = inject(DrawService);
}