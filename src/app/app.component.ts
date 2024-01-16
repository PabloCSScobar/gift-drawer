import { animate, group, query, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

const slider = trigger('routeAnimations', [
  transition(':decrement', slideTo('left')),
  transition(':increment', slideTo('right')),
])


function slideTo(direction: 'left' | 'right') {
  const optional = { optional: true};
  return [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        [direction]: 0,
        width: '100%'
      })
    ], optional),
    query(':enter', [
      style({ [direction]: '-100%'})
    ], optional),
    group([
      query(':leave', [
        animate('600ms ease', style({[direction]: '100%'}))
      ], optional),
      query(':enter', [
        animate('600ms ease', style({[direction]: '0%'}))
      ], optional)
    ])
  ]
}


@Component({
  selector: 'app-root',
  template: `
    <main class="h-screen bg-black/70 relative overflow-hidden" [@routeAnimations]="prepareRoute(outlet)" >
      <ngx-snowflakes 
        [size]="[8, 12]"
        [interval]="100"
        [opacity]="[0.2, 1]"
        [speed]="[2, 3]"
        color="#FFF"
        />
      <router-outlet #outlet="outlet"></router-outlet>
    </main>
  `,
  animations: [
    slider
  ]
})
export class AppComponent {
  prepareRoute(outlet: RouterOutlet) {
    return outlet.activatedRouteData['animation'];
  }
}
