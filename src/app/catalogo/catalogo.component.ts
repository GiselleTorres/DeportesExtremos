import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators,ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { ServicioService } from '../servicio.service'

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})

export class CatalogoComponent implements OnInit 
{
  title = "MANEJO DE CATALOGOS";

  Catalogos: any = [];              //Lista de Tipos de Documentos
  TituloCatalogos = "";             //Titulo Lista de Tipos de Documentos
  TablaCatalogos: any = [];        //Encabezados tabla Lista de Tipos de Documentos 

  MiCatalogo: any = [];             //Tipo de Documento Buscado
  TituloCatalogo = "";              //Titulo de Tipo de Documento Buscado
  TabBusCatalogo: any = [];        //Encabezados tabla Tipo de Documento Buscado 
  comboListaCatalogo: any = [];     //Combo Buscar Tipo de Documento

  TituloCatalogoEdit = "";          //Titulo de Tipo de Documento a Editar
  MiCatalogoE: any = [];            //Tipo de Documento a Editar
  comboEditarCatalogo: any = [];    //Combo Editar Tipo de Documento

  controlLista = 1;               //Control para limpiar la lista
  BuscarEvalor = 1;               //Control para carga del valor a buscar

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
  ListaCatalogo =  new FormGroup (
  {

  });

  filtrarCatalogo =  new FormGroup(
  {
    combofiltro: new FormControl()
  });

  
  InsertarGCatalogo =  new FormGroup(
  {
    textNuevoCatalogo: new FormControl(), 
    textNuevoCatalogo1: new FormControl(),
    filTipoCatalogo:new FormControl()
  });

  
  ActualizarACatalogo =  new FormGroup(
  {
    BuscarIdCatalogoe:new FormControl(),  
    textnuevoCatalogoe:new FormControl(), 
    textnuevoCatalogo1e: new FormControl(),
    filtnuevoTIPO_CATALOGOe: new FormControl()
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

public consultaCatalogoI()
{
      this.servi.getCatalogos().subscribe((data: any) => 
      {

          let dat = data;
         
          this.Catalogos =JSON.parse(data);
          this.TituloCatalogos = "LISTA DE TIPOS DE DOCUMENTOS";
          this.TablaCatalogos[0] = "ID";
          this.TablaCatalogos[1] = "Denominación";
          this.TablaCatalogos[2] = "Descripcion";
      });
  }

//............................................................................................
// Lista Tipos de documentos.

public consultaCatalogos(op:any)
{
  if(this.controlLista == 1)
  {
      //console.log("component")
      this.servi.getCatalogos().subscribe((data : any) => { //revisar

        if (op == 1)
        {
          let dat = data;
         
            this.Catalogos = data;//JSON.parse(data);
            this.TituloCatalogos = "LISTA DE CATALOGOS";
            this.TablaCatalogos[0] = "ID";
            this.TablaCatalogos[1] = "Denominacion";
            this.TablaCatalogos[2] = "Descripcion";
            //console.error(" El listado 3 " + this.TipDocs);
          }
          else if(op == 2)
          {
            this.comboListaCatalogo = data;//JSON.parse(data);
            this.MiCatalogo = null;
            this.TituloCatalogo = "";
            this.TabBusCatalogo[0] = "";
            this.TabBusCatalogo[1] = "";
            this.TabBusCatalogo[2] = "";
            //console.error(" El listado 4 " );
          }
          else if(op == 3)
          { 
            this.comboEditarCatalogo  = data;//JSON.parse(data);
            this.MiCatalogoE = null;
            this.TituloCatalogoEdit = ""; 

          }              
    },
      error => { console.error(error + " ") });
  }
  else
  {
    this.Catalogos = null;
    this.TituloCatalogos = "";
    this.TablaCatalogos[0] = "";
    this.TablaCatalogos[1] = "";
    this.TablaCatalogos[2] = "";   
    this.controlLista = 1; 
  }
 
}


//--------------------------------------------------------------------------------------------->
//para Limpiar la lista

public LimpiarLista() 
{
  this.controlLista = 0;
}
// -----------------------------------------------------------------------------------------

// Consulta un tipo de documento por medio de su id.

public buscarCatalogo() 
{

  var filtovalor = this.filtrarCatalogo.getRawValue()['combofiltro'];
  //console.log("318    " + filtovalor );
  this.servi.getCatalogo('/' + filtovalor).subscribe((data: {}) => {
    //console.log("313    " + filtovalor );

    this.MiCatalogo = data;


    //console.log("la data es " + data);
    //console.log("MiCatalogo es " + this.MiCatalogo);
   
    this.TituloCatalogo = "CATALOGO SELECCIONADO";
    this.TabBusCatalogo[0] = "Indicador";
    this.TabBusCatalogo[1] = "Denominador";
    this.TabBusCatalogo[2] = "Tipo catalogo";

  },
    error => { console.log(error) });

}

//--------------------------------------------------------------
 //Para insertar un nuevo Tipo de Documento

 public InsertarCatalogo() {

  var datosvalo2 = this.InsertarGCatalogo.getRawValue()['textNuevoCatalogo'];
  var datosvalo3 = this.InsertarGCatalogo.getRawValue()['textNuevoCatalogo1'];
  var datosvalo1 = this.InsertarGCatalogo.getRawValue()['filTipoCatalogo'];
  var cadena = { "Denominacion_catalogo_universal": datosvalo2,"descripcion_catalogo_universal":datosvalo3, "tipo_catalogo_catalogo_universal":datosvalo1 };

  this.servi.insertCatalogo(cadena).then
    ( res => {
        //console.log(res)
      }
    ).catch(err => {
      //console.log(err)
    });
    this.InsertarGCatalogo.reset();
}

//----------------------------------------------------------------------------
// Consulta un tipo de documento por medio de su id para editarlo

buscarEditarCatalogo() 
{
  if ( this.BuscarEvalor != 0)
  {
    this.BuscarEvalor = this.ActualizarACatalogo.getRawValue()["BuscarIdCatalogoe"];
    //console.log(" dos el filtro " + this.ActualizarACatalogo.getRawValue()["BuscarIdCatalogoe"]);
  }
  //console.error(" tres el filtro " + this.BuscarEvalor);

  this.servi.getCatalogo('/' + this.BuscarEvalor).subscribe((data: {}) => {

    this.MiCatalogoE = data; 
    this.TituloCatalogoEdit = "TIPO DE REGISTRO A EDITAR";   
    
  }, error => { console.log(error) });

}

//--------------------------------------------------------------
// Actualiza el Tipo de Documento 

public ActualizarCatalogo() 
{

  var nuevoCatalogo = this.ActualizarACatalogo.getRawValue()['textnuevoCatalogoe'];
  var nuevoCatalogo1 = this.ActualizarACatalogo.getRawValue()['textnuevoCatalogo1e'];
  var nuevoiniCatalogo = this.ActualizarACatalogo.getRawValue()['filtnuevoTIPO_CATALOGOe'];

  var cadena = { "id_catalogo_universal": this.BuscarEvalor,"tipo_catalogo_catalogo_universal": nuevoCatalogo,"denominacion_catalogo_universal": nuevoiniCatalogo,"descripcion_catalogo_universal":nuevoCatalogo1};
  
  this.servi.updateCatalogo(cadena).then
    (
      res => {
        console.log("res  ",res)
      }
    ).catch(err => {
      console.log(err)
    });

    this.BuscarEvalor = 0;
    this.ActualizarACatalogo.reset();
     

  }

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  ngOnInit(): void 
  {
    this.ListaCatalogo = this.formBuilder.group(
      {
  
      });   

      
    this.filtrarCatalogo = this.formBuilder.group(
    {
      combofiltro: []
    });

    
    this.InsertarGCatalogo = this.formBuilder.group(
    {
      textNuevoCatalogo: [], 
      textNuevoCatalogo1: [],
      filTipoCatalogo:[]

    });
    this.formBuilder.group

    
    this.ActualizarACatalogo = this.formBuilder.group(
    {
      BuscarIdCatalogoe: [], 
      textnuevoCatalogoe: [],
      textnuevoCatalogo1e: [],
      filtnuevoTIPO_CATALOGOe: []

    });
    this.formBuilder.group

  }

public listarCatalogoE(catip:any)
{

  this.servi.getListarCatalogoEsp('/'+ catip).subscribe((data:{})=>
  {
    if (catip == 1)
      {
        this.catauniCatalogo = data;
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
        this.catatipDoc = data;
      }  
  },     
   error => { console.log(error) });
  }

  public selectcatalogoE(catip: any, catselec: any)
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
