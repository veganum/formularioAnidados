import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Pais, PaisSmall } from '../interfaces/paises.interface';

@Injectable({
  providedIn: 'root',
})
export class PaisesService {
  private baseUrl: string = 'https://restcountries.com/v3.1';
  private _regiones: string[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
  ];

  get regiones(): string[] {
    return [...this._regiones];
  }

  constructor(private http: HttpClient) {}

  getPaisesPorRegion(region: string): Observable<PaisSmall[]> {
    const url: string = `${this.baseUrl}/region/${region}`;
    return this.http.get<PaisSmall[]>(url);
  }

  getPaisPorCodigo(codigo: string): Observable<Pais | null> {
    if (!codigo) {
      return of(null);
    }

    const url = `${this.baseUrl}/alpha/${codigo}`;

    return this.http.get<Pais>(url);
  }
}

// https://restcountries.com/v3.1/region/americas?fields=cca2,name
