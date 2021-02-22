import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { httpOptions } from '../util/configuracion'
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SitiosCategoriasService {

  constructor(private http: HttpClient) { }

  listarSitiosCategorias() {
    var body = "";
    return this.http.post<any>(environment.baseUrl + 'listarSitiosCategorias', body, httpOptions)
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
  obtenerSitioCategoria(idCategoria: any) {
    var body = JSON.stringify({ "id": idCategoria });
    return this.http.post<any>(environment.baseUrl + 'obtenerSitioCategoria', body, httpOptions)
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
  crearSitioCategoria(sitio: any) {
    var body = JSON.stringify(sitio);
    console.log("crearCategoria ", environment.baseUrl + 'crearSitioCategoria', sitio, body)
    return this.http.post<any>(environment.baseUrl + 'crearSitioCategoria', body, httpOptions)
      .pipe(
        tap((respuesta: any) => {
          console.log("crearCategoria respuesta", respuesta)
          //Se valida que si existe un mensaje de error
          if (respuesta.error) {
            throw (respuesta.error);
          }
          return respuesta;
        }),
        catchError(this.handleError)
      );
  }
  editarSitioCategoria(sitio: any) {
    var body = JSON.stringify(sitio);
    console.log("guardarCategoria ", environment.baseUrl + 'editarSitioCategoria', sitio, body)
    return this.http.post<any>(environment.baseUrl + 'editarSitioCategoria', body, httpOptions)
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
