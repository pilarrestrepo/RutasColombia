import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { httpOptions } from '../util/configuracion'
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SitiosEmpresasService {
  constructor(private http: HttpClient) { }

  listarSitiosEmpresas() {
    var body = "";
    return this.http.post<any>(environment.baseUrl  + 'listarSitiosEmpresas', body, httpOptions)
      .pipe(
        tap((respuesta: any) => {          
          if (respuesta.error) {
            throw (respuesta.error);
          }
          return respuesta;
        }),
        catchError(this.handleError)
      );
  }
  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  };
}
