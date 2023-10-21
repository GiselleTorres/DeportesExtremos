import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators,ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { ServicioService } from '../servicio.service'
@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent implements OnInit {

  title = "MANEJO DE PERSONAS";

  Personals: any = [];              //Lista de Tipos de Documentos
  TituloPersonals = "";             //Titulo Lista de Tipos de Documentos
  TablaPersonals: any = [];        //Encabezados tabla Lista de Tipos de Documentos 

  MiPersonal: any = [];             //Tipo de Documento Buscado
  TituloPersonal = "";              //Titulo de Tipo de Documento Buscado
  TabBusPersonal: any = [];        //Encabezados tabla Tipo de Documento Buscado 
  comboListaPersonal: any = [];     //Combo Buscar Tipo de Documento

  TituloPersonalEdit = "";          //Titulo de Tipo de Documento a Editar
  MiPersonalE: any = [];            //Tipo de Documento a Editar
  comboEditarPersonal: any = [];    //Combo Editar Tipo de Documento

  controlLista = 1;               //Control para limpiar la lista
  BuscarEvalor = 1;               //Control para carga del valor a buscar

  catatipdoc: any = [];
  catacargo: any = [];

   //*****************************************************************************
 //Form group 
  ListaPersonal =  new FormGroup (
  {

  });

  filtrarPersonal =  new FormGroup(
  {
    combofiltro: new FormControl()
  });

  
  InsertarGPersonal =  new FormGroup(
  {
    textNombre1e: new FormControl(), 
    textNombre2e:new FormControl(),
    textApellido1e: new FormControl(),
    textApellido2e: new FormControl(),
    filtipdoce: new FormControl(),
    textNumdoce: new FormControl(),
    textfechanacee: new FormControl(),
    textsexoe: new FormControl(),
    textnumcele: new FormControl(),
    textemaile: new FormControl(),
    textdireccione: new FormControl(),
    filCargoe: new FormControl()
  });

  
  ActualizarAPersonal =  new FormGroup(
  {
    BuscarIdPersonal:new FormControl(),  
    textNombre1: new FormControl(), 
    textNombre2:new FormControl(),
    textApellido1: new FormControl(),
    textApellido2: new FormControl(),
    filtipdoc: new FormControl(),
    textNumdoc: new FormControl(),
    filCargo: new FormControl()
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

public consultaPersonalI()
{
      this.servi.getPersonals().subscribe((data: any) => 
      {

          let dat = data;
         
          this.Personals = data;
          this.TituloPersonals = "LISTA DE Personals";
          this.TablaPersonals[0] = "Indicador";
          this.TablaPersonals[1] = "Nombre 1";
          this.TablaPersonals[2] = "Nombre 2";
          this.TablaPersonals[3] = "Apellido 1";
          this.TablaPersonals[4] = "Apellido 2";
          this.TablaPersonals[5] = "Tipo documento";
          this.TablaPersonals[6] = "Numero de documento";
          this.TablaPersonals[7] = "Fecha de nacimiento";
          this.TablaPersonals[8] = "Sexo ";
          this.TablaPersonals[9] = "Celular";
          this.TablaPersonals[10] = "Email";
          this.TablaPersonals[11] = "Direccion";
          this.TablaPersonals[12] = "Tipo";
      });
  }

//............................................................................................
// Lista Tipos de documentos.

public consultaPersonals(op:any)
{
  //console.error(" El listado 1 " );
  if(this.controlLista == 1)
  {
      //console.log("component")
      this.servi.getPersonals().subscribe((data: any) => { //revisar


        if (op == 1)
        {
          let dat = data;

          this.Personals = data;
          this.TituloPersonals = "LISTA DE PERSONAS";
          this.TablaPersonals[0] = "Indicador";
          this.TablaPersonals[1] = "Nombre 1";
          this.TablaPersonals[2] = "Nombre 2";
          this.TablaPersonals[3] = "Apellido 1";
          this.TablaPersonals[4] = "Apellido 2";
          this.TablaPersonals[5] = "Tipo documento";
          this.TablaPersonals[6] = "Numero de documento";
          this.TablaPersonals[7] = "Fecha de nacimiento";
          this.TablaPersonals[8] = "Sexo ";
          this.TablaPersonals[9] = "Celular";
          this.TablaPersonals[10] = "Email";
          this.TablaPersonals[11] = "Direccion";
          this.TablaPersonals[12] = "Tipo";

          }
          else if(op == 2)
          {
            this.comboListaPersonal = data;//JSON.parse(data);
            this.MiPersonal = null;
            this.TituloPersonal = "";
            this.TabBusPersonal[0] = "";
            this.TabBusPersonal[1] = "";
            this.TabBusPersonal[2] = "";
            this.TabBusPersonal[3] = "";
            this.TabBusPersonal[4] = "";
            this.TabBusPersonal[5] = "";
            this.TabBusPersonal[6] = "";
            this.TabBusPersonal[7] = "";
            this.TabBusPersonal[8] = "";
            this.TabBusPersonal[9] = "";
            this.TabBusPersonal[10] = "";
            this.TabBusPersonal[11] = "";
            this.TabBusPersonal[12] = "";
          }
          else if(op == 3)
          { 
            this.comboEditarPersonal  = data;//JSON.parse(data);
            this.MiPersonalE = null;
            this.TituloPersonalEdit = ""; 
          }              
    },
      error => { console.error(error + " ") });
  }
  else
  {
    this.Personals = null;
    this.TituloPersonals = "";
    this.TablaPersonals[0] = "";
    this.TablaPersonals[1] = "";
    this.TablaPersonals[2] = "";
    this.TablaPersonals[3] = "";
    this.TablaPersonals[4] = "";

    this.controlLista = 1; 
  }
 
}


//--------------------------------------------------------------------------------------------->
//para Limpiar la lista

  public LimpiarLista() 
    {
      this.controlLista = 0;
    }
//--------------------------------------------------------------------------------------------->
//Llamar ID

    public buscarPersonal() 
    {
    
      var filtovalor = this.filtrarPersonal.getRawValue()['combofiltro'];
      this.servi.getPersonal('/' + filtovalor).subscribe((data: {}) => {
    
    
        this.MiPersonal = data;   
        this.TituloPersonal = "PERSONAL SELECCIONADO";
        this.TabBusPersonal[0] = "Indicador";
        this.TabBusPersonal[1] = "Nombre 1";
        this.TabBusPersonal[2] = "Nombre 2";
        this.TabBusPersonal[3] = "Apellido 1";
        this.TabBusPersonal[4] = "Apellido 2";
        this.TabBusPersonal[5] = "Tipo documento";
        this.TabBusPersonal[6] = "Numero de documento";
        this.TabBusPersonal[7] = "Fecha de nacimiento";
        this.TabBusPersonal[8] = "Sexo ";
        this.TabBusPersonal[9] = "Celular";
        this.TabBusPersonal[10] = "Email";
        this.TabBusPersonal[11] = "Direccion";
        this.TabBusPersonal[12] = "Tipo";
      
      },
        error => { console.log(error) });
    
    }
    /*
//----------------------------------------------------------------------------------------------->
//----------------------------------------------------------------------------------------------->
// Insertar un contacto
public InsertarPersonal() {

  var datosvalo1 = this.InsertarGPersonal.getRawValue()['textNombre1e']
  var datosvalo2 = this.InsertarGPersonal.getRawValue()['textNombre2e'];
  var datosvalo3 = this.InsertarGPersonal.getRawValue()['textApellido1e']
  var datosvalo4 = this.InsertarGPersonal.getRawValue()['textApellido2e'];
  var datosvalo5 = this.InsertarGPersonal.getRawValue()['filtipdoce'];
  var datosvalo6 = this.InsertarGPersonal.getRawValue()['textNumdoce'];
  var datosvalo7 = this.InsertarGPersonal.getRawValue()['textfechanacee'];
  var datosvalo8 = this.InsertarGPersonal.getRawValue()['textsexoe'];
  var datosvalo9 = this.InsertarGPersonal.getRawValue()['textnumcele'];
  var datosvalo10 = this.InsertarGPersonal.getRawValue()['textemaile'];
  var datosvalo11 = this.InsertarGPersonal.getRawValue()['textdireccione'];
  var datosvalo12 = this.InsertarGPersonal.getRawValue()['filCargoe'];
  var cadena = {"nombre1_persona": datosvalo1, 
                "nombre2_persona": datosvalo2, 
                "apellido1_persona":datosvalo3,
                "apellido2_persona":datosvalo4,
                "tipDoc_persona ":datosvalo5,
                "numero_doc_persona":datosvalo6, 
                "fecha_nacimiento_persona":datosvalo7, 
                "sexo_persona	":datosvalo8,
                "celular ":datosvalo9,
                "email_persona	":datosvalo10 , 
                "direccion_persona":datosvalo11,
                "tipo_persona":datosvalo12};

  this.servi.insertPersonal(cadena).then
    ( res => {
      }
    ).catch(err => {
    });
    this.InsertarGPersonal.reset();
}*/
//------------------------------------------------------------------------------------------------->
//--------------------------------------------------------------
// Actualiza el Tipo de Documento 
buscarEditarPersonal() 
{
  if ( this.BuscarEvalor != 0)
  {
    this.BuscarEvalor = this.ActualizarAPersonal.getRawValue()["BuscaridPersonal"];
    
  }
  
  this.servi.getPersonal('/' + this.BuscarEvalor).subscribe((data: {}) => {

    this.MiPersonalE = data; 
    this.TituloPersonalEdit = "PERSONAL A EDITAR";   
    
  }, error => { console.log(error) });

}

public ActualizarPersonal() 
{

  var datosvalo1 = this.InsertarGPersonal.getRawValue()['textNombre1']
  var datosvalo2 = this.InsertarGPersonal.getRawValue()['textNombre2']
  var datosvalo3 = this.InsertarGPersonal.getRawValue()['textApellido1'];
  var datosvalo4 = this.InsertarGPersonal.getRawValue()['textApellido2'];
  var datosvalo5 = this.InsertarGPersonal.getRawValue()['filtipdoc'];
  var datosvalo6 = this.InsertarGPersonal.getRawValue()['textNumdoc'];
  var datosvalo7 = this.InsertarGPersonal.getRawValue()['filCargo'];
  var cadena = {"ID_PERSONAL":this.BuscarEvalor,"PNOM_PERSONAL": datosvalo1, "SNOM_PERSONAL": datosvalo2, "PAPELL_PERSONAL":datosvalo3,"SAPELL_PERSONAL":datosvalo4,"TIPO_DOC":datosvalo5,"NUM_DOC":datosvalo6, "CARGO_PERSONA":datosvalo7 };


  this.servi.updatePersonal(cadena).then
    (
      res => {
        console.log("res  ",res)
      }
    ).catch(err => {
      console.log(err)
    });

    this.BuscarEvalor = 0;
    this.ActualizarAPersonal.reset();
     

  }

//----------------------------------------------------------------------------------------------->
//----------------------------------------------------------------------------------------------->
  
  ngOnInit(): void 
    {
      this.ListaPersonal = this.formBuilder.group(
        {
    
        });   
  
        
      this.filtrarPersonal = this.formBuilder.group(
      {
        combofiltro: []
      });

      this.InsertarGPersonal = this.formBuilder.group(
        {
          textNombre1e: [], 
          textNombre2e:[],
          textApellido1e: [],
          textApellido2e: [],
          filtipdoce: [],
          textNumdoce: [],
          textfechanacee: [],
          textsexoe: [],
          textnumcele: [],
          textemaile: [],
          textdireccione:[],
          filCargoe: []

        });

        this.ActualizarAPersonal = this.formBuilder.group(
          {
            BuscaridPersonal:[],  
            textNombre1: [], 
            textNombre2:[],
            textApellido1: [],
            textApellido2: [],
            filtipdoc: [],
            textNumdoc: [],
            filCargo: []
          });
          this.formBuilder.group
        }
    public Filtro1(){

      this.servi.getListarCatalogoEsp('/'+'5').subscribe((data:any) =>{
        this.catatipdoc = data;
      },
      error => {console.log(error)});
    }
    
    public Filtro2(){
    
      this.servi.getListarCatalogoEsp('/'+'6').subscribe((data:any) =>{
        this.catacargo = data;
      },
      error => {console.log(error)});
    }
}
