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
  
  private Url: string = 'https://deportesextremosback.onrender.com';

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

   
//#region Metodos catalogo

  // Método Listar el cataogo
  getCatalogos(): Observable<any>
  {

    return this.http.get(this.Url + "/catalogou" , httpOptions);
   
  }

  
  getListarCatalogoEsp(fil:any): Observable<any>
  {

    return this.http.get(this.Url + "/catalogou" , httpOptions);
   
  }

  //-------------------------------------------------------------
 // Método mostrar un solo Tipo de catalogo

  getCatalogo(id:any): Observable<any> {
  return this.http.get(this.Url + "/catalogou"+id , httpOptions);
}
  //-------------------------------------------------------------
 // Método para insertar un catalogo

 async insertCatalogo(CatalogoD:any): Promise<any> {
  
  return new Promise((resolve, reject) => {
    this.http.post(this.Url + "/catalogou", CatalogoD, httpOptions).toPromise()
  });
}

  //------------------------------------------------------------
 // Método para modificar un catalogo

 async updateCatalogo(cadena:any): Promise<any> {

  return new Promise((resolve, reject) => {
    this.http.put(this.Url + "/catalogou", cadena, httpOptions).toPromise()
  });
}
//#endregion

//#region METODOS PERSONAL
  // Método Listar las personas
  getPersonals(): Observable<any>
  {

    return this.http.get(this.Url + "/personas" , httpOptions);
   
  }

  getListarPersonalEsp(fil:any): Observable<any>
  {

    return this.http.get(this.Url + "/personas" , httpOptions);
   
  }
  //-------------------------------------------------------------
 // Método mostrar una sola

  getPersonal(id:any): Observable<any> {
  return this.http.get(this.Url + "/personas"+id , httpOptions);
}
  //-------------------------------------------------------------
 // Método para insertar un nuevo Contacto

 async insertPersonal(PersonalD:any): Promise<any> {

  return new Promise((resolve, reject) => {
    this.http.post(this.Url + "/personas", PersonalD, httpOptions).toPromise()
  });
}

  //-------------------------------------------------------------
 // Método para modificar un contacto

 async updatePersonal(cadena:any): Promise<any> {

  return new Promise((resolve, reject) => {
    this.http.put(this.Url + "/personas", cadena, httpOptions).toPromise()
  });
}
//#endregion

//#region METODOS RESPUESTAS PERSONAS 
  // Método Listar la Materia Prima
  getMateria_Primas(): Observable<any>
  {
    return this.http.get(this.Url + "/respuestaspersonas" , httpOptions);
  }

  getListarMateriaprimaEsp(fil:any): Observable<any>
  {

    return this.http.get(this.Url + "/respuestaspersonas" + fil , httpOptions);
   
  }
  //-------------------------------------------------------------
 // Método mostrar un solo Materia Prima

  getMateriaprima(id:any): Observable<any> {
  return this.http.get(this.Url + "/respuestaspersonas"+id , httpOptions);
}
  //-------------------------------------------------------------
 // Método para insertar un nuevo Materia Prima

 async insertMateriaprima(MateriaPrimaD:any): Promise<any> {

  return new Promise((resolve, reject) => {
    this.http.post(this.Url + "/respuestaspersonas", MateriaPrimaD, httpOptions).toPromise()
  });
}

 // -------------------------------------------------------------
 // Método para modificar un contacto

 async updateMateriaprima(cadena:any): Promise<any> {

  return new Promise((resolve, reject) => {
    this.http.put(this.Url + "/respuestaspersonas", cadena, httpOptions).toPromise()
  });
}
//#endregion


//#region METODOS CONTACTOS
  // Método Listar los contactos
  getPreguntass(): Observable<any>
  {

    return this.http.get(this.Url + "/preguntas" , httpOptions);
   
  }

  getListarPreguntassEsp(fil:any): Observable<any>
  {

    return this.http.get(this.Url + "/preguntas" , httpOptions);
   
  }
  //-------------------------------------------------------------
 // Método mostrar un solo contacto

  getpreguntass(id:any): Observable<any> {
  return this.http.get(this.Url + "/preguntas"+id , httpOptions);
}
  //-------------------------------------------------------------
 // Método para insertar un nuevo Contacto

 async insertpreguntas(ContactoD:any): Promise<any> {

  return new Promise((resolve, reject) => {
    this.http.post(this.Url + "/preguntas", ContactoD, httpOptions).toPromise()
  });
}

  //-------------------------------------------------------------
 // Método para modificar un contacto

 async updatepreguntass(cadena:any): Promise<any> {

  return new Promise((resolve, reject) => {
    this.http.put(this.Url + "/preguntas", cadena, httpOptions).toPromise()
  });
}
//#endregion

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



































































































































































































































































































































































































