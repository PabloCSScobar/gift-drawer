import { NgModule, inject } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ParticipantsFormComponent } from './participants-form/participants-form.component';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterModule, Routes } from '@angular/router';
import { PairingsComponent } from './pairings/pairings.component';
import { DrawSettingsComponent } from './draw-settings/draw-settings.component';
import { SummaryComponent } from './summary/summary.component';
import { HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SnowflakesModule } from 'ngx-snowflakes';
import { GuardService } from './guard.service';

const guard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const guardService = inject(GuardService);
  const router = inject(Router);
  const pageNo = +route.data['animation'];
  if(guardService.canEnterPage(pageNo)) return true;
  return router.createUrlTree(['/settings'])
}


const routes: Routes = [
  {
    path: 'settings',
    component: DrawSettingsComponent,
    data: { animation: '1'},
    canActivate: [guard]
  },
  {
    path: 'form',
    component: ParticipantsFormComponent,
    data: { animation: '2'},
    canActivate: [guard]
  },
  {
    path: 'pairings',
    component: PairingsComponent,
    data: { animation: '3'},
    canActivate: [guard]
  },
  {
    path: 'summary',
    component: SummaryComponent,
    data: { animation: '3'},
    canActivate: [guard]
  },
  {
    path: '**',
    redirectTo: '/settings',
    pathMatch: 'full',
  }
]

@NgModule({
  declarations: [
    AppComponent,
    ParticipantsFormComponent,
    PairingsComponent,
    DrawSettingsComponent,
    SummaryComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    ReactiveFormsModule,
    SnowflakesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
