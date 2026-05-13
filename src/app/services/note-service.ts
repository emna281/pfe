import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface NoteResponse {
  id: number;
  note: number | null;
  reusit: boolean | null;
  evaluation: Evaluation | null;
  inscriptionId: number;
  nomApprenant: string;
  prenomApprenant: string;
}

export interface NoteRequest {
  inscriptionId: number;
  note: number;
}
export enum Evaluation {
  EXCELLENT = 'EXCELLENT',
  TRES_BIEN = 'TRES_BIEN',
  BIEN = 'BIEN',
  PASSABLE = 'PASSABLE',
  INSUFFISANT = 'INSUFFISANT'
}
@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private apiUrl = '/api/notes';
  

  constructor(private http: HttpClient) {}

  initialiserNotes(sessionId: number): Observable<NoteResponse[]> {
    return this.http.post<NoteResponse[]>(
      `${this.apiUrl}/session/${sessionId}/initialiser`, {}
    );
  }

  ajouterNote(sessionId: number, request: NoteRequest): Observable<NoteResponse> {
    return this.http.post<NoteResponse>(
      `${this.apiUrl}/session/${sessionId}`, request
    );
  }

  getTableauNotes(sessionId: number): Observable<NoteResponse[]> {
    return this.http.get<NoteResponse[]>(
      `${this.apiUrl}/session/${sessionId}`
    );
  }
  
}
