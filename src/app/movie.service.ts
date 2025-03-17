import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private apiUrl = 'https://api.themoviedb.org/3';
  private apiKey = 'a18aa7bc375e4345ba410804ebbb7dd4';

  constructor(private http: HttpClient) {}

  searchMovies(query: string): Observable<any> {
    const params = new HttpParams().set('api_key', this.apiKey).set('query', query);
    return this.http.get(`${this.apiUrl}/search/movie`, { params });
  }

  getPopularMovies(): Observable<any> {
    const url = `${this.apiUrl}/movie/popular?api_key=${this.apiKey}`;
    return this.http.get<any>(url);
  }

  getMovieDetails(movieId: number): Observable<any> {
    const params = new HttpParams().set('api_key', this.apiKey);
    return this.http.get(`${this.apiUrl}/movie/${movieId}`, { params });
  }

  getMovieTrailer(movieId: number): Observable<any> {
    const params = new HttpParams().set('api_key', this.apiKey).set('language', 'uk-UA');
    return this.http.get(`${this.apiUrl}/movie/${movieId}/videos`, { params });
  }

  getMovieCast(movieId: number): Observable<any> {
    const params = new HttpParams().set('api_key', this.apiKey);
    return this.http.get(`${this.apiUrl}/movie/${movieId}/credits`, { params });
  }
}
