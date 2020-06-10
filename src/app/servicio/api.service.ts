import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


import { Elegibilidad } from '../models/elegibilidad';
import { Beneficiario } from '../models/beneficiario';
import { Pension } from '../models/pension';


@Injectable({
  providedIn: 'root',
})
export class ApiService {

  private urlLogPoint: string = environment.urlLogPoint;
  private urlEliPoint: string = environment.urlEliPoint;
  private urlPenPoint: string = environment.urlPenPoint;

  private httpHeaders = new HttpHeaders({ 'content-type': 'application/json' });

  constructor(private http: HttpClient, private router: Router) { }

  getPersona(rut): Observable<Beneficiario> {
    return this.http
      .get<Beneficiario>(`${this.urlLogPoint}/${rut}`, { headers: this.httpHeaders })
      .pipe(
        catchError((err) => {
          this.router.navigate(['/inicio']);
          Swal.fire(err.status, 'Error Indeterminado ', 'error');
          return throwError(err);
        })
      );
  }

  getPension(run): Observable<Pension> {
    return this.http
      .get<Pension>(`${this.urlPenPoint}/${run}`, { headers: this.httpHeaders })
      .pipe(
        catchError((err) => {
          this.router.navigate(['/inicio']);
          Swal.fire(err.status, 'Error Indeterminado ', 'error');
          return throwError(err);
        })
      );
  }

  getElegibilidad(run): Observable<Elegibilidad> {
    return this.http
      .get<Elegibilidad>(`${this.urlEliPoint}/${run}`, { headers: this.httpHeaders })
      .pipe(
        catchError((err) => {
          this.router.navigate(['/inicio']);
          Swal.fire(err.status, 'Error Indeterminado ', 'error');
          return throwError(err);
        })
      );
  }
}

