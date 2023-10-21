import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators,ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { ServicioService } from '../servicio.service'

@Component({
  selector: 'app-respuestas',
  templateUrl: './respuestas.component.html',
  styleUrls: ['./respuestas.component.css']
})
export class RespuestasComponent implements OnInit {

  title = "MANEJO DE RESPUESTAS";

  MateRespuestas: any = [];              //Lista de Tipos de Documentos
  TituloRespuestas= "";             //Titulo Lista de Tipos de Documentos
  TablaRespuestas: any = [];        //Encabezados tabla Lista de Tipos de Documentos

  MiRespuestas: any = [];             //Tipo de Documento Buscado
  TituloRespuesta = "";              //Titulo de Tipo de Documento Buscado
  TabBusRespuestas: any = [];        //Encabezados tabla Tipo de Documento Buscado
  comboListaRespuestas: any = [];     //Combo Buscar Tipo de Documento

  TituloRespuestasEdit = "";          //Titulo de Tipo de Documento a Editar
  MiRespuestasE: any = [];            //Tipo de Documento a Editar
  comboEditarRespuestas: any = [];    //Combo Editar Tipo de Documento

  controlLista = 1;               //Control para limpiar la lista
  BuscarEvalor = 1;               //Control para carga del valor a buscar

   //*****************************************************************************
 //Form group
  ListaRespuestas =  new FormGroup (
  {

  });

  filtrarRespuestas =  new FormGroup(
  {
    combofiltro: new FormControl()
  });


   InsertarGContacto =  new FormGroup(
    {
    textCatalogo: new FormControl(),
    textIniCatalogo:new FormControl()
    });


   ActualizarACatalogo =  new FormGroup(
   {
     BuscarId_Respuesta:new FormControl(),
     textnuevoRespuesta:new FormControl(),
     textnuevopregunta_respuesta: new FormControl()
   });

//**********************************************************************************

  constructor
  (
    private formBuilder: FormBuilder,
    private servi: ServicioService,
    Router : Router
  ) { }


//..............................................................................................
// CRUD
//............................................................................................
// Lista Tipos de documentos. inicial

public consultaRespuestasI()
{
      this.servi.getRespuestas().subscribe((data: any) =>
      {

          let dat = data;

          this.MiRespuestas = data;
          this.TituloRespuestas = "LISTA DE RESPUESTAS";
          this.TablaRespuestas[0] = "ID";
          this.TablaRespuestas[1] = "DENOMINACION";
          this.TablaRespuestas[2] = "DESCRIPCION";
      });
  }

//............................................................................................
// Lista Tipos de documentos.

public consultaRespuestas(op:any)
{

  if(this.controlLista == 1)
  {

      this.servi.getRespuestas().subscribe((data: any) => { //revisar


        if (op == 1)
        {
          console.log(data);
          let dat = data;

          this.MateRespuestas = data;
          this.TituloRespuestas = "LISTA DE RESPUESTAS";
          this.TablaRespuestas[0] = "ID";
          this.TablaRespuestas[1] = "DENOMINACION";
          this.TablaRespuestas[2] = "DESCRIPCION";

          }
          else if(op == 2)
          {
            this.comboListaRespuestas = data;//JSON.parse(data);
            this.MiRespuestas = null;
            this.TituloRespuestas = "";
            this.TabBusRespuestas[0] = "";
            this.TabBusRespuestas[1] = "";
            this.TabBusRespuestas[2] = "";
          }
          else if(op == 3)
          {
            this.comboEditarRespuestas  = data;//JSON.parse(data);
            this.MiRespuestasE = null;
            this.TituloRespuestasEdit = "";
          }
    },
      error => { console.error(error + " ") });
  }
  else
  {
    this.MiRespuestas = null;
    this.TituloRespuestas = "";
    this.TablaRespuestas[0] = "";
    this.TablaRespuestas[1] = "";
    this.TablaRespuestas[2] = "";
    this.controlLista = 1;
  }

}


//--------------------------------------------------------------------------------------------->
//para Limpiar la lista

  public LimpiarLista()
    {
      this.controlLista = 0;
    }




    ngOnInit(): void
    {
      this.ListaRespuestas = this.formBuilder.group(
        {

        });


      this.filtrarRespuestas = this.formBuilder.group(
      {
        combofiltro: []
      });
    }
}
