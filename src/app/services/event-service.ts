import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private apiUrl='/api/event'

  constructor(private http: HttpClient) {}

  getAllEvents() {
    return this.http.get<any[]>(this.apiUrl);
  }

  addEvent(event: any) {
    return this.http.post(this.apiUrl, event);
  }

  updateEvent(id: number, event: any) {
  return this.http.put(`${this.apiUrl}/${id}`, event);
}
  
}
