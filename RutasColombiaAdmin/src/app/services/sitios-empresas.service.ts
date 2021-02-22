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
  obtenerSitioEmpresa(idEmpresa: any) {
    var body = JSON.stringify({ "id": idEmpresa });
    return this.http.post<any>(environment.baseUrl + 'obtenerSitioEmpresa', body, httpOptions)
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
  crearSitioEmpresa(sitio: any) {
    var body = JSON.stringify(sitio);
    console.log("crearEmpresa ", environment.baseUrl + 'crearSitioEmpresa', sitio, body)
    return this.http.post<any>(environment.baseUrl + 'crearSitioEmpresa', body, httpOptions)
      .pipe(
        tap((respuesta: any) => {
          console.log("crearEmpresa respuesta", respuesta)
          //Se valida que si existe un mensaje de error
          if (respuesta.error) {
            throw (respuesta.error);
          }
          return respuesta;
        }),
        catchError(this.handleError)
      );
  }
  editarSitioEmpresa(sitio: any) {
    var body = JSON.stringify(sitio);
    console.log("guardarEmpresa ", environment.baseUrl + 'editarSitioEmpresa', sitio, body)
    return this.http.post<any>(environment.baseUrl + 'editarSitioEmpresa', body, httpOptions)
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
