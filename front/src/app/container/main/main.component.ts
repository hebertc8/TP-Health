import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbStepperComponent, NbStepComponent } from '@nebular/theme';
import { RequestsService } from 'src/app/services/requests.service';
import { LoginService } from "src/app/services/login.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  t_inicio: any;
  MainForm: FormGroup;
  validators = {
    acepto: false, 
    lugar: false,
    site: false,
    sitename: false,
    fiebre: false,
    tieneFiebre: false,
    temperatura: false,
    midiotemperatura: false,
    grados: false,
    unidad: false,
    contacto: false,
    sintomas: false,
    prueba: false,
    resultado: false,
    nombrecel: false,
    visitarmed: false,
    canPass2: false,
    SintForm: false
  }

  
  @ViewChild('HealthCheck') HealthCheck: NbStepperComponent;
  @ViewChild('SecondStep') SecondStep: NbStepComponent;
  @ViewChild('Gracias1') Gracias1: NbStepComponent;
  @ViewChild('Gracias2') Gracias2: NbStepComponent;
  @ViewChild('SintomasSect') Sintomas: NbStepComponent;  
  @ViewChild('Guardando') Guardando: NbStepComponent;
  @ViewChild('Saved') Saved: NbStepComponent;


  constructor(private fb: FormBuilder, private service: RequestsService, private login: LoginService) {}

  ngOnInit() {
    this.t_inicio = (new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString().slice(0, new Date().toLocaleTimeString().length - 3));
    this.MainForm = this.fb.group({
      Acepto: ['', Validators.required],
      Site: [],
      Lugar: [],
      Fiebre: [],
      Temperatura: [],
      Termometro: [],
      Grados: [],
      Unidad: [],
      Contacto: [],
      Sintomas: [],
      Sint_Fiebre: [],
      Sint_Malestar: [],
      Sint_Congestion: [],
      Sint_Tos: [],
      Sint_Dificultad_Res: [],
      Sint_Garganta: [],
      Sint_Pecho: [],
      Sint_Cabeza: [],
      Sint_Ninguno: [],
      Prueba: [],
      Resultado: [],
      NombreCel: [],
      VisitarMed: []
    });
  }

  Aceptas(val) {
    if (val == 'Si') {
      this.SecondStep.hidden = false;
      this.SecondStep.select();
    }
    if (val == 'No') {
      this.SecondStep.hidden = true;
      this.HealthCheck.next();
      this.HealthCheck.next();
      this.HealthCheck.next();
      for (var input in this.MainForm.value) {
        if (input != 'Acepto') {
          this.MainForm.value[input] = null;
        }
      }
    }
  }

  CheckAcepto(val) {
    this.validators.acepto = (val != '') ? true : false;
    this.Validateforms()
  }
  CheckLugar(val) { 
    this.validators.lugar = (val != '') ? true : false;
    this.validators.site = (val == 'Site') ? true : false;
    this.Validateforms()
  }
  CheckSite(val) {
    this.validators.sitename = (val != '') ? true : false;
    this.Validateforms()
  }
  CheckFiebre(val) {
    this.validators.fiebre = (val != '') ? true : false;
    this.validators.tieneFiebre = (val == 'Si') ? true : false;

    if (val == 'Si' || val == 'No') {
      this.MainForm.value.Grados = this.MainForm.value.Unidad = this.MainForm.value.Contacto = null;
    }
    this.Validateforms()
  }
  CheckTemperatura(val) {
    this.validators.temperatura = (val != '') ? true : false;
    this.validators.midiotemperatura = (val == 'Si') ? true : false;
    this.Validateforms()
  }
  CheckGrados(val) {
    this.validators.grados = !isNaN(val);
    this.Validateforms()
  }
  CheckUnidad(val) {
    this.validators.unidad = (val != '') ? true : false;
    this.Validateforms()
  }
  CheckContacto(val) {
    this.validators.contacto = (val != '') ? true : false;
    this.Validateforms()
  }
  CheckPrueba(val) {
    if (val == 'No') {
      this.MainForm.value.Resultado = null;
    }
    this.validators.prueba = (val != '') ? true : false;
    this.Validateforms()
  }
  CheckResultado(val) {
    this.validators.resultado = (val != '') ? true : false;
    this.Validateforms()
  }
  CheckNombreCel(val) {
    this.MainForm.value.NombreCel = val;
    this.validators.nombrecel = (val != '') ? true : false;
    this.Validateforms()
  }
  CheckVisitarMed(val) {
    this.validators.visitarmed = (val != '') ? true : false;
    this.Validateforms()
  }
  CheckSintomas(val) {

  }
  
  AnteriorAintomas() {
    this.HealthCheck.previous();
    this.Sintomas.hidden = true;
  }

  Validateforms() {
    this.updateSigForm();
    this.updateSintForm();
  }

  updateSintForm() {
    if (this.MainForm.value.Prueba == "Si" && this.MainForm.value.Resultado != null && this.MainForm.value.Resultado != "" && this.MainForm.value.NombreCel.length > 10) {
      this.validators.SintForm = true;
    } else if (this.MainForm.value.Prueba == "No" && this.MainForm.value.NombreCel.length > 10) {
      this.validators.SintForm = true;
    } else {
      this.validators.SintForm = false;
    }
  }

  updateSigForm() {
    if (this.validators.lugar && this.validateSite()) {
      
      if (this.MainForm.value.Fiebre == "Si") {
        this.validators.canPass2 = true;
      } else if (this.MainForm.value.Fiebre == "No") {

        if (this.MainForm.value.Temperatura == "Si") {
          this.Sintomas.hidden = false;

          if (this.validators.grados && this.validators.unidad && this.validators.contacto) {
            this.validators.canPass2 = true;
          } else {
            this.validators.canPass2 = false;
          }

        } else if (this.MainForm.value.Temperatura == "No" && this.MainForm.value.Termometro) {
          this.Sintomas.hidden = true;
          this.validators.canPass2 = true;
        } else {
          this.Sintomas.hidden = true;
          this.validators.canPass2 = false;
        }

      } else {
        this.validators.canPass2 = false;
      }

    } else {
      this.validators.canPass2 = false;
    }
  }

  validateSite() {
    if (this.MainForm.value.Lugar == 'Site') {
      if (this.MainForm.value.Site != '' && this.MainForm.value.Site != null) {
        return true;
      } else {
        return false;
      }
    } else if (this.MainForm.value.Lugar == 'Casa'){
      return true;
    } else {
      return false
    }
  }

  onFirstSubmit() {
    console.log("Form submition have been disabled");
  }
  //Sig Control
  SigFormSave() {
    if (this.MainForm.value.Fiebre == 'Si') {
      this.Sintomas.hidden = false;
      this.HealthCheck.next();
    } else {
      this.Gracias1.hidden = true;
      this.Gracias2.hidden = false;
      this.HealthCheck.next();
      this.HealthCheck.next();
      this.HealthCheck.next();
    }
  }

  AtrasGracias2() {
    this.HealthCheck.previous();
    this.HealthCheck.previous();
    this.HealthCheck.previous();
  }

  SendData(nextCount) {
    this.Guardando.hidden = false;
    for (var i = 0; i < nextCount; i++) {
      this.HealthCheck.next();
    }
    //t_inicio 
    this.MainForm.value['ccms_id'] = this.login.getUser().idccms;
    this.MainForm.value['timestamp_inicio'] = this.t_inicio;
    this.MainForm.value['timestamp_fin'] = (new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString().slice(0,new Date().toLocaleTimeString().length-3));
    console.log(this.MainForm.value);
    this.service.saveHealth(JSON.stringify(this.MainForm.value)).subscribe((res: any) => {
      this.Saved.hidden = false;
      this.HealthCheck.next();
    }, (err) => {
        console.log("Something went wrong");
        console.log(err);
    });
  }

  //Back Control
  AtrasGracias1() {
    if (this.MainForm.value.Acepto == 'No') {
      this.HealthCheck.previous();
      this.HealthCheck.previous();
      this.HealthCheck.previous();
    }
  }
}