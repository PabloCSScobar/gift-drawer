import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment as env } from '../environments/environment';

export type Participant = { name: string, email: string};
export type Pairing = [Participant, Participant];

@Injectable({
  providedIn: 'root'
})
export class DrawService {
  http = inject(HttpClient);
  pairings: Pairing[] = [];
  isPublicDrawing = false;
  
  drawPairings(participants: Participant[]) {
    this.pairings = participants
    .sort(() => Math.random() - 0.5)
    .map((name: any, index: number, arr: any[]) => [name, arr[(index + 1) % arr.length]])
  }
  
  drawOnServer(participants: Participant[]) {
    return this.http.post(`${env.API_URL}draw_pairings/`, participants);
  }
}