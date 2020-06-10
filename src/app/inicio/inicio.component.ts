import { Component, OnInit } from '@angular/core';
import { stringify } from 'querystring';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../servicio/api.service';
import Swal from 'sweetalert2';
import { Login } from '../models/login';
import { Persona } from '../models/persona';
import { Elegibilidad } from '../models/elegibilidad';
import { Beneficiario } from '../models/beneficiario';
import { UtilService } from '../util/util.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {
  rutPuntos = '';
  digito: string;
  rutBenef: string;
  public login: Login = new Login();
  public beneficiario: Beneficiario = new Beneficiario();
  elegibilidad: Elegibilidad;
  persona: Persona;
  public mensajeBeneficiario: string;
  private booleanmensaje: boolean = false;
  public booleanmsgben: boolean = false;


  mensajeRun = '';
  mensajeSerie = '';
  runArray: string[];
  disableMensaje = false;
  public errores: string[];


  constructor(
    private apiService: ApiService,
    private utilService: UtilService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    // this.checkRut(this)

  }
  ngOnInit() {
    this.booleanmensaje = false;

  }


  public validaLogin(): void {
    //  console.log(' RUT ' + this.login.rut, + this.login.serie);
    console.log('Valida Login  ', this.login.rut, ' serie ', this.login.serie)
    console.log('rutbenef', this.rutBenef);
    if (!this.validaDV(this.rutBenef, this.digito)) {
      this.router.navigate(['/inicio']);
      this.mensajeBeneficiario = 'RUN Invalido ';
      this.booleanmensaje = true;
    }
    else {
      this.apiService
        .getPersona(this.rutBenef)
        .subscribe((beneficario) => {
          this.beneficiario = beneficario
          console.log('Beneficiario  ', this.beneficiario)
          console.log('Codigo   ', this.beneficiario.return.code)
          if (this.beneficiario.persona == null) {
            this.booleanmensaje = true;
            this.router.navigate(['/inicio']);
            this.booleanmsgben = true;
            this.mensajeBeneficiario = this.beneficiario.return.message;

            //   Swal.fire(this.beneficiario.return.code, this.beneficiario.return.message, 'error');
          }
          else {
            if (this.beneficiario.persona.iRUN != this.login.serie) {
              this.booleanmsgben = true;
              this.mensajeBeneficiario = 'Serie o Numero de Documento es Incorrecto '
              this.router.navigate(['/inicio']);
            }
            else {
              if (this.beneficiario.persona.dFechaDefuncion.toString() != "1900-01-01") {
                this.booleanmensaje = true;
                this.mensajeBeneficiario = 'Estimado(a), A la fecha de esta consulta, el sistema indica que este RUN corresponde a una persona que estaría fallecida, por lo tanto no podría acceder a los beneficios del Programa de Ahorro Colectivo Solidario (PACS).'
                this.router.navigate(['/inicio']);
                Swal.fire('', this.mensajeBeneficiario, 'warning');
              }
              else {
                if (this.beneficiario.persona.edad < '01') {
                  this.booleanmensaje = true;

                  this.mensajeBeneficiario = 'Estimado(a), Para tener derecho a los Beneficios del Programa de Ahorro Colectivo Solidario (PACS), debe tener 65 años o más, y según nuestros registros usted no cumple con este requisito. ';
                  this.router.navigate(['/inicio']);
                  Swal.fire('', this.mensajeBeneficiario, 'warning');

                }
                else {
                  if (this.beneficiario.persona.cBeneficioPacs == '0') {
                    this.booleanmensaje = true;

                    this.mensajeBeneficiario = 'Usted ya tiene los Beneficios del Programa de Ahorro Colectivo Solidario (PACS)'
                    this.router.navigate(['/inicio']);
                    Swal.fire('', this.mensajeBeneficiario, 'warning');
                  }
                  else {
                    this.booleanmensaje = true;

                    this.router.navigate(['/inicio/cumple', this.rutBenef]);
                  }
                }
              }
            }
          }
        }, err => {
          //      console.log(this.beneficiario.return.message, ' returnleano la persona');
          this.errores = err.error.errors as string[];
          if (err.status == 400) {
            console.error('Codigo de Error desde el Backend : ', err.status);
            console.log(this.beneficiario.return.message, ' returnleano la persona');
          }
        }
        );
    }
  }

  formateaRut(rut: string) {
    //   console.log('rut: ', rut, ' id: ', id, ' this.login.rut ', this.login.rut)
    if (rut.length > 3) {
      this.rutPuntos = this.utilService.formateaRut(rut);
    }
    this.rutBenef = this.rutPuntos.split('-')[0];
    this.digito = this.rutPuntos.split('-')[1];
    this.rutBenef = this.rutBenef.split('.').join("");
    console.log('rut ', this.rutBenef, ' dv  ', this.digito, ' largo : ', this.rutBenef.length);

  }

  validaDV(rut: string, digito: string): boolean {
    console.log('entra a validar rut');
    this.booleanmsgben = false;
    const runSinDv = rut;
    console.log('runSinDv ', runSinDv);
    const dv = digito;
    let dvConvertido = '';
    let dvEsperado = 0;
    let multiplo = 2;
    let suma = 0;
    for (let i = 1; i <= runSinDv.length; i++) {
      // Obtener su Producto con el Múltiplo Correspondiente
      const index = multiplo * Number(runSinDv.charAt(runSinDv.length - i));

      // Sumar al Contador General
      suma = suma + index;

      // Consolidar Múltiplo dentro del rango [2,7]
      if (multiplo < 7) {
        multiplo = multiplo + 1;
      } else {
        multiplo = 2;
      }
    }

    // Calcular Dígito Verificador en base al Módulo 11
    dvEsperado = 11 - (suma % 11);
    console.log('dvEsperado', dvEsperado)

    // Casos Especiales (0 y K)
    switch (dvEsperado) {
      case 11:
        dvConvertido = 'K';
        break;
      case 10:
        dvConvertido = '0';
        break;
      default:
        dvConvertido = String(dvEsperado);
        break;
    }
    // tslint:disable-next-line: triple-equals

    if (dvConvertido != digito) {
      this.booleanmsgben = true;
      return false;
    }
    else {
      return true;
    }
  }
  //   return dvConvertido.localeCompare(dv) == 0
  //     ? ''
  //     : 'El rut ingresado no es valido';
}
//[routerLink]="['inicio/cumple/', login.rut]"
//this.router.navigate(['/clientes'])