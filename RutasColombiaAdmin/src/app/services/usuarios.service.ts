import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { httpOptions } from '../util/configuracion'
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  constructor(private http: HttpClient) { }

  autenticarUsuario(usuario: any) {
    console.log("Servicio autenticarUsuario", usuario)
    var body = JSON.stringify(usuario);
    return this.http.post<any>(environment.baseUrl + 'autenticarUsuario', body, httpOptions)
      .pipe(
        tap((respuesta: any) => {
          console.log("Servicio autenticarUsuario respuesta ", respuesta)
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
