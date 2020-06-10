import { Component, OnInit } from '@angular/core';
import { Toaster, ToastType } from 'ngx-toast-notifications';
import { Router, ActivatedRoute } from '@angular/router';

import { ApiService } from '../servicio/api.service';
import { Elegibilidad } from '../models/elegibilidad';
import { Persona } from '../models/persona';
import { Pension } from '../models/pension';
import { Beneficiario } from '../models/beneficiario';

import Swal from 'sweetalert2';



@Component({
  selector: 'app-cumple',
  templateUrl: './cumple.component.html',
  styleUrls: ['./cumple.component.css'],
})
export class CumpleComponent implements OnInit {

  public persona: Persona;
  public elegibilidad: Elegibilidad = new Elegibilidad();
  public pension: Pension = new Pension();
  public beneficiario: Beneficiario;
  private errores: string[];
  private booleanFijo: boolean = true;
  private booleanVariable: boolean = true;
  public tituloBeneficio: string;
  public cFijo = 0;
  public cVariable = 0;
  public textoMensaje: string;
  public textoCriterio: string;
  public nombresBeneficirario: String;
  public rutBeneficirario: String;
  public sexoBeneficirario: String;
  public calificaBeneficioFijo: string;
  public calificaBeneficioVariable: string;
  public calificaTieneBeneficioPacs: string;

  public fValorUf: string


  constructor(
    private apiService: ApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    console.log('Entrada');
    this.tituloBeneficio = 'Beneficio Monto Fijo PACS';
    this.obtienePersona();
    this.obtieneElegibilidad();
    this.obtienePension();
  }

  // `Cliente ${this.cliente.nombre} creado con exito!`
  public obtienePersona(): void {
    this.activatedRoute.params.subscribe(
      params => {
        let run = params['rutBenef']
        console.log('rut recibido Persona ', run)
        if (run) {
          this.apiService.getPersona(run).subscribe(
            (beneficiario) => {
              this.beneficiario = beneficiario
              this.nombresBeneficirario = (`${this.beneficiario.persona.vcNombres}  
              ${this.beneficiario.persona.vcApellidoPaterno}  ${this.beneficiario.persona.vcApellidoMaterno}`);
              this.rutBeneficirario = (`${this.beneficiario.persona.iRUN} -   
              ${this.beneficiario.persona.cDV}  `);
              if (this.beneficiario.persona.cSexo == 'M') {
                this.sexoBeneficirario = 'Masculino'
              } else {
                this.sexoBeneficirario = 'Femenino'
              };

              if (beneficiario.persona.cBeneficioPacs == 'S') {
                this.calificaTieneBeneficioPacs = 'Si';
              }
              else {
                this.calificaTieneBeneficioPacs = 'No';
              };

            },
            err => {
              this.errores = err.error.errors as string[];
              console.error('Codigo de Error desde el Backend  err: ', err.status);
              console.error('este es err: ', err);
            }
          )
        }
      }
    )

  }


  public obtienePension(): void {
    this.activatedRoute.params.subscribe(
      params => {
        let rut = params['rutBenef']
        console.log('rut recibido Pension ', rut)
        if (rut) {
          this.apiService.getPension(rut).subscribe(
            (pension) => {
              this.pension = pension
              if (pension.pensionado.cResultadoBeneficioFijo.toString() == '1') {
                this.calificaBeneficioFijo = 'Cumple'
              } else {
                this.calificaBeneficioFijo = 'No Cumple'
              }
              console.log('beneficio variable ', pension.pensionado.cResultadoBeneficioVariabe )
              if (pension.pensionado.cResultadoBeneficioVariabe.toString() == '1') {
                this.calificaBeneficioVariable = 'Cumple'
              } else {
                this.calificaBeneficioVariable = 'No Cumple'
              }
              console.log('calificaBeneficioVariable', this.calificaBeneficioVariable )

              this.fValorUf = this.pension.pensionado.dFechaValorUF.toString();
              console.log(this.fValorUf, 'pensjon ', this.pension)
            },
            err => {
              this.errores = err.error.errors as string[];
              console.error('Codigo de Error desde el Backend  err: ', err.status);
              console.error('este es err: ', err);
            }
          )
        }
      }
    )

  }

  public obtieneElegibilidad(): void {
    this.activatedRoute.params.subscribe(
      params => {
        let rut = params['rutBenef']
        console.log('rut recibido elegibilidad', rut)
        if (rut) {
          this.apiService.getElegibilidad(rut).subscribe(
            (elegibilidad) => {
              this.elegibilidad = elegibilidad,
                console.log(this.elegibilidad.body[0].vcNombres, this.elegibilidad.body[0].vcApellidoPaterno);

              // `Cliente ${this.cliente.nombre} creado con exito!`

              (this.elegibilidad.body[0].vcNombres);
            },
            err => {
              this.errores = err.error.errors as string[];
              console.error('Codigo de Error desde el Backend  err: ', err.status);
              console.error('este es err: ', err);
            }

          );
        }
      });
  }

  public fbooleanFijo(item: number): boolean {
    if (item == 1) {
      if (this.cFijo == 0) {
        this.tituloBeneficio = 'Beneficio Monto Fijo PACS';
        this.cFijo++;
        return true
      } else {
        this.tituloBeneficio = 'Beneficio Monto Fijo PACS';
        return false
      }
    } else {
      if (item == 2) {
        if (this.cVariable == 0) {
          this.tituloBeneficio = 'Beneficio Monto Variable PACS';
          this.cVariable++;
          return true
        } else {
          this.tituloBeneficio = 'Beneficio Monto Variable PACS';
          this.tituloBeneficio = ' ';
          return false
        }

      }
    }

  }

  public showDetalle(detalle: string, criterio: string, titulo: string) {
    this.textoMensaje = detalle;
    this.textoCriterio = criterio;
    this.tituloBeneficio = titulo;
    console.log('si entra a esta funcion estamos listos', detalle, ' ', criterio);
    //Swal.fire('', detalle , 'warning');
  }

}
