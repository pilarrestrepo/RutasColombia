import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { httpOptions } from '../util/configuracion';
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
  obtenerSitio(idSitio: any) {
    var body = JSON.stringify({"id":idSitio});    
    return this.http.post<any>(environment.baseUrl + 'obtenerSitio', body, httpOptions)
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
  crearSitio(sitio: any) {
    var body = JSON.stringify(sitio);
    console.log("crearSitio ",environment.baseUrl + 'crearSitio' , sitio, body)
    return this.http.post<any>(environment.baseUrl + 'crearSitio', body, httpOptions)
      .pipe(
        tap((respuesta: any) => {
          console.log("crearSitio despues", respuesta)
          //Se valida que si existe un mensaje de error
          if (respuesta.error) {
            throw (respuesta.error);
          }
          return respuesta;
        }),
        catchError(this.handleError)
      );
  }
  editarSitio(sitio: any) {
    var body = JSON.stringify(sitio);
    console.log("guardarSitio ",environment.baseUrl + 'editarSitio' , sitio, body)
    return this.http.post<any>(environment.baseUrl + 'editarSitio', body, httpOptions)
      .pipe(
        tap((respuesta: any) => {
          console.log("editarSitio despues", respuesta)
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
