import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators,ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
//import { Console } from 'console';
import { ServicioService } from '../servicio.service'

@Component({
  selector: 'app-preguntas',
  templateUrl:'./preguntas.component.html',
  styleUrls: ['./preguntas.component.css']
})
export class PreguntaComponent implements OnInit {
  title = "MANEJO DE PREGUNTAS";

  Preguntass: any = [];              //Lista de Tipos de Documentos
  TituloPreguntas = "";             //Titulo Lista de Tipos de Documentos
  TablaPreguntas: any = [];        //Encabezados tabla Lista de Tipos de Documentos 

  MiPreguntas: any = [];             //Tipo de Documento Buscado
  TituloPregunta = "";              //Titulo de Tipo de Documento Buscado
  TabBusPreguntas: any = [];        //Encabezados tabla Tipo de Documento Buscado 
  comboListaPreguntas: any = [];     //Combo Buscar Tipo de Documento

  TituloPreguntasEdit = "";          //Titulo de Tipo de Documento a Editar
  MiPreguntasE: any = [];            //Tipo de Documento a Editar
  comboEditarPreguntas: any = [];    //Combo Editar Tipo de Documento

  controlLista = 1;               //Control para limpiar la lista
  BuscarEvalor = 1;               //Control para carga del valor a buscar

  cataTipPreguntas: any = [];
  catapreguntas: any = [];
  combo1: any = [];

  catauniCatalogo: any = [];
  catatipPersona: any = [];
  catatipPregunta: any = [];
  catatipDoc: any =[];
  
  CBcatalogocatalogo: any = [];
  CBcatalogotipPersona: any = [];
  CBcatalogotipPregunta: any = [];
  CBcatalogotipDoc: any = [];

  catalogocatalogosel: any = [];
  catalogotipPersonasel: any = [];
  catalogotipPreguntasel: any = [];
  catalogotipDocsel: any = [];
   //*****************************************************************************
 //Form group 
  ListaPreguntas =  new FormGroup (
  {

  });

  filtrarPreguntas =  new FormGroup(
  {
    combofiltro: new FormControl()
  });

  

  InsertarGPreguntas =  new FormGroup(
  {
    filContactoPreguntas: new FormControl(), 
    textDirPreguntas:new FormControl(),
    filTipoPreguntas:new FormControl()
  });

  
  ActualizarAPreguntas =  new FormGroup(
  {
    BuscarID_Preguntas:new FormControl(),  
    filContactoPreguntas: new FormControl(), 
    textDirPreguntas:new FormControl(),
    filTipoPreguntas:new FormControl()
  });

//**********************************************************************************

  constructor
  (
    private formBuilder: FormBuilder, 
    private servi: ServicioService,
    Router : Router
  ) { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }


//..............................................................................................
// CRUD
//............................................................................................
// Lista Tipos de documentos. inicial 

public consultaPreguntasI()
{
      this.servi.getPreguntass().subscribe((data: any) => 
      {

          let dat = data;
         
          this.Preguntass = data;
          this.TituloPreguntas = "LISTA DE PREGUNTAS";
          this.TablaPreguntas[0] = "ID";
          this.TablaPreguntas[1] = "Pregunta";
          this.TablaPreguntas[2] = "Tipo Pregunta";
      });
  }

//............................................................................................
// Lista Tipos de preguntas.

public consultaPreguntas(op:any)
{
  //console.error(" El listado 1 " );
  if(this.controlLista == 1)
  {
      //console.log("component")
      this.servi.getPreguntass().subscribe((data: any) => { //revisar


        if (op == 1)
        {
          let dat = data;
         
          this.Preguntass = data;
          this.TituloPreguntas = "LISTA DE RESPUESTAS";
          this.TablaPreguntas[0] = "ID";
          this.TablaPreguntas[1] = "Preguntas";
          this.TablaPreguntas[2] = "Tipo Preguntas";
          
          }
          else if(op == 2)
          {
            this.comboListaPreguntas = data;//JSON.parse(data);
            this.MiPreguntas = null;
            this.TituloPreguntas = "";
            this.TabBusPreguntas[0] = "";
            this.TabBusPreguntas[1] = "";
            this.TabBusPreguntas[2] = "";
            this.TabBusPreguntas[3] = "";
          }
          else if(op == 3)
          { 
            this.comboEditarPreguntas  = data;//JSON.parse(data);
            this.MiPreguntasE = null;
            this.TituloPreguntasEdit = ""; 
          }              
    },
      error => { console.error(error + " ") });
  }
  else
  {
    this.Preguntass = null;
    this.TituloPreguntas = "";
    this.TablaPreguntas[0] = "";
    this.TablaPreguntas[1] = "";
    this.TablaPreguntas[2] = "";
    this.TablaPreguntas[3] = "";
    this.controlLista = 1; 
  }
 
}


//--------------------------------------------------------------------------------------------->
//para Limpiar la lista

  public LimpiarLista() 
    {
      this.controlLista = 0;
    }
//---------------------------------------------------------------------------------------------->
//---------------------------------------------------------------------------------------------->
// Consulta un tipo de documento por medio de su id.

public buscarPreguntas() 
{

  var filtovalor = this.filtrarPreguntas.getRawValue()['combofiltro'];
  this.servi.getListarPreguntassEsp('/' + filtovalor).subscribe((data: {}) => {


    this.MiPreguntas = data;   
    this.TituloPreguntas = "PREGUNTA SELECCIONADA";
    this.TabBusPreguntas[0] = "Indicador";
    this.TabBusPreguntas[1] = "Personal";
    this.TabBusPreguntas[2] = "Dato contacto";
    this.TabBusPreguntas[3] = "Tipo contacto";
  },
    error => { console.log(error) });

}


//----------------------------------------------------------------------------------------------->
//----------------------------------------------------------------------------------------------->
// Insertar un contacto

public InsertarGPreguntass() {

  var datosvalo3 = this.InsertarGPreguntas.getRawValue()['filContactoPregunta']
  var datosvalo2 = this.InsertarGPreguntas.getRawValue()['textDirPregunas'];
  var datosvalo1 = this.InsertarGPreguntas.getRawValue()['filTipoPregunta'];
  var cadena = {"ID_PREGUNTAS": datosvalo3, "PREGUNTA": datosvalo2, "TIPO_PREGUNTA":datosvalo1 };

  this.servi.insertpreguntas(cadena).then
    ( res => {
        //console.log(res)
      }
    ).catch(err => {
      //console.log(err)
    });
    this.InsertarGPreguntas.reset();
}

//------------------------------------------------------------------------------------------------->
//--------------------------------------------------------------
// Actualiza el Tipo de Documento 
buscarEditarPreguntas() 
{
  if ( this.BuscarEvalor != 0)
  {
    this.BuscarEvalor = this.ActualizarAPreguntas.getRawValue()["BuscarID_Preguntas"];
    
  }
  
  this.servi.getListarPreguntassEsp('/' + this.BuscarEvalor).subscribe((data: {}) => {

    this.MiPreguntasE = data; 
    this.TituloPreguntasEdit = "EDITAR PREGUNTA";   
    
  }, error => { console.log(error) });

}

public ActualizarPreguntas() 
{
  // console.log(this.MiPreguntasE)
  // console.log("😊😊",this.ActualizarAPreguntas.getRawValue())
  var datosvalo1 = this.ActualizarAPreguntas.getRawValue()['filContactoPreguntas']
  var datosvalo2 = this.ActualizarAPreguntas.getRawValue()['textDirPreguntas'];
  var datosvalo3 = this.ActualizarAPreguntas.getRawValue()['filTipoPreguntas'];
  var cadena = { "ID_PREGUNTAS": this.BuscarEvalor,"PREGUNTAS": datosvalo1, "TIPO_PREGUNTA": datosvalo2};

  this.servi.updatepreguntass(cadena).then
    (
      res => {
        console.log("res  ",res)
      }
    ).catch(err => {
      console.log(err)
    });

    this.BuscarEvalor = 0;
    this.ActualizarAPreguntas.reset();
     

  }

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
public listarPreguntassE(catip:any)
{

  this.servi.getListarPreguntassEsp('/'+ catip).subscribe((data:{})=>
  {
    if (catip == 1)
      {
        this.catapreguntas = data;
      }
      else if (catip == 2)
      {
        this.catatipPersona = data; 
      }
      else if (catip == 3)
      {
        this.catatipPregunta = data;
      }
      else if (catip == 4)
      {
        this.catatipPregunta = data;
      }  
  },     
   error => { console.log(error) });
  }

  public selectPreguntasE(catip: any, catselec: any)
  {
    if (this.BuscarEvalor != 0)
    {
      if (catip == 1)
      {
        this.BuscarEvalor = this.CBcatalogocatalogo.getRawValue()['catCatalogofiltro'];
      }
      else if (catip == 2)
      {
        this.BuscarEvalor = this.CBcatalogotipPersona.getRawValue()['cattipPersonafiltro'];
      }
      else if (catip == 3)
      {
        this.BuscarEvalor = this.CBcatalogotipPregunta.getRawValue()['cattipPreguntafiltro'];
      }
      else if (catip == 4)
      {
        this.BuscarEvalor = this.CBcatalogotipDoc.getRawValue()['cattipDocfiltro'];
      }
    }
   catselec = this.BuscarEvalor;

    this.servi.getListarCatalogoEsp('/' + catip + '/' + catselec).subscribe((data: {}) =>
    {
      if (catip == 1)
      {
        this.catalogocatalogosel = data;
      }
      else if(catip == 2)
      {
        this.catalogotipPersonasel = data;
      }
      else if (catip == 3)
      {
        this.catalogotipPreguntasel = data;
      }
      else if (catip == 4)
      {
        this.catalogotipDocsel = data;
      }    

    },
  error =>{console.log(error)});
  
  }
  
}

