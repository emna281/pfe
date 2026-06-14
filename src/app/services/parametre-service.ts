import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ParametreService {
  private apiUrl = '/api/admin/parametres';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Record<string, string>> {
    return this.http.get<Record<string, string>>(this.apiUrl);
  }

  update(parametres: Record<string, string>): Observable<void> {
    return this.http.put<void>(this.apiUrl, parametres);
  }
}
