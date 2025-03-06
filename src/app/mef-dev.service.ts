import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class MefDevService {
  private apiUrl = 'https://api.mef.dev/resource'; 

  constructor(private http: HttpClient) {}

  private getAuthToken(): string {
    return localStorage.getItem('auth_token') || ''; 
  }

  getData(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getAuthToken()}`,
      'If-Modified-Since': localStorage.getItem('lastModified') || ''
    });

    return this.http.get(this.apiUrl, { headers });
  }

  createData(payload: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getAuthToken()}`,
      'Content-Type': 'application/json'
    });

    const body = {
      global_unique_id: uuidv4(), 
      data: payload
    };

    return this.http.post(this.apiUrl, body, { headers });
  }

  updateData(id: string, payload: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getAuthToken()}`,
      'Content-Type': 'application/json'
    });

    const body = {
      global_unique_id: uuidv4(), 
      data: payload
    };

    return this.http.put(`${this.apiUrl}/${id}`, body, { headers });
  }

  deleteData(id: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getAuthToken()}`
    });

    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }
}
