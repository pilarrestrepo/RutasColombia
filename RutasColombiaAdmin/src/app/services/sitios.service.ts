import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { httpOptions } from './configuracion';
@Injectable({
  providedIn: 'root'
})
export class SitiosService {

  constructor(private http: HttpClient) { }

  listarSitios() {
    var body = "";
    return this.http.post<any>(environment.baseUrl + 'listarSitios', body, httpOptions)
      .pipe(
        tap((respuesta: any) => {
          //Se valida que si existe un mensaje de error
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
