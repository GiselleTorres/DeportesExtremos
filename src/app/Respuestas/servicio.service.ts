import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

const httpOptions =
{
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable(
  {
    providedIn: 'root'
  })

export class ServicioService
{
  getRespuesta() {
    throw new Error('Method not implemented.');
  }

  private Url: string = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  private extractData(res: Response)
  {
     let body = JSON.parse('' + res);
     return body || {};
   }
   private handleError<T>(operation = 'operation', result?: T)
   {
      return (error: any): Observable<T> => {
        console.log(`${operation} failed: ${error.message}`);
        return of(result as T)

    };
   }



//#region METODOS RESPUESTAS
  // Método Listar la Respuestas
  getRespuestas(): Observable<any>
  {
    return this.http.get(this.Url + "/Respuestas" , httpOptions);
  }

  getListarRespuestasEsp(fil:any): Observable<any>
  {

    return this.http.get(this.Url + "/Respuestas" , httpOptions);

  }
  //-------------------------------------------------------------
 // Método mostrar un solo Respuestas

  getMiRespuestas(id:any): Observable<any> {
  return this.http.get(this.Url + "/Respuestas"+id , httpOptions);
}
  //-------------------------------------------------------------
 // Método para insertar un nueva Respuesta

 async insertRespuestas(RespuestasD:any): Promise<any> {

  return new Promise((resolve, reject) => {
    this.http.post(this.Url + "/Respuestas", RespuestasD, httpOptions).toPromise()
  });
}

 // -------------------------------------------------------------
 // Método para modificar una Respuesta

 async updateRespuestas(cadena:any): Promise<any> {

  return new Promise((resolve, reject) => {
    this.http.put(this.Url + "/Respuestas", cadena, httpOptions).toPromise()
  });
}
//#endregion
}
