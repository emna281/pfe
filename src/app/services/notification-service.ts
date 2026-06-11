import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
export interface NotificationDTO {
  id: number;
  message: string;
  type: 'INFO' | 'WARNING' | 'SUCCESS' | 'ERROR';
  lu: boolean;
  dateCreation: string;
  expediteurNom?: string;
  expediteurPrenom?: string;
}
@Injectable({
  providedIn: 'root',
})
export class NotificationService {
   private url = 'http://localhost:8081/api';

  constructor(private http: HttpClient) {}

  getNotifications(): Observable<NotificationDTO[]> {
    return this.http.get<NotificationDTO[]>(`${this.url}/notifications`);
  }

  marquerCommeLu(id: number): Observable<void> {
    return this.http.patch<void>(`${this.url}/${id}/lu`, {});
  }

  marquerToutCommeLu(): Observable<void> {
  return this.http.patch<void>(`${this.url}/notifications/lu-tout`, {});
}
}
