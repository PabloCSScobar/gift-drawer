import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { DrawService, Participant } from '../draw.service';
import { catchError, of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'participants-form',
  templateUrl: './participants-form.component.html',
})
export class ParticipantsFormComponent {
  router = inject(Router);
  fb = inject(FormBuilder);
  drawService = inject(DrawService);

  form = this.fb.group({
    participants: this.fb.array(
      [
        this.fb.group({
          name: ['John', Validators.required],
          email: ['john@test.com', this.getEmailValidators()]
        }),
        this.fb.group({
          name: ['Tim', Validators.required],
          email: ['tim@test.com', this.getEmailValidators()]
        }),
        this.fb.group({
          name: ['Carlos', Validators.required],
          email: ['carlos@test.com', this.getEmailValidators()]
        }),
      ],
      Validators.minLength(3)
    )
  })

  private getEmailValidators() {
    return this.drawService.isPublicDrawing ? [] : [Validators.required, Validators.email];
  }

  get participants() {
    return this.form.get('participants') as FormArray;
  }

  addParticipant() {
    this.participants.push(
      this.fb.group({
        name: ['', Validators.required],
        email: ['', this.getEmailValidators()]
      })
    )
    setTimeout(() => {
      const element = document.getElementById(`participant-${this.participants.length - 1}`)
      element?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    })
  }

  drawPairings() {
    this.form.markAllAsTouched();
    if (!this.form.valid) return;
    const participants: Participant[] = this.participants.value
    if (this.drawService.isPublicDrawing) {
      this.drawService.drawPairings(participants);
      this.router.navigate(['./pairings']);
    } else {
      this.drawService.drawOnServer(participants)
      .subscribe(()=> this.router.navigate(['./summary']))
    }
  }
}