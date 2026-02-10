import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RickMortyService {

  private url = 'https://rickandmortyapi.com/api/character';

  constructor(private http: HttpClient) {}

  getCharacters(page: number = 1): Observable<any> {
    return this.http.get(`${this.url}?page=${page}`);
  }
}
