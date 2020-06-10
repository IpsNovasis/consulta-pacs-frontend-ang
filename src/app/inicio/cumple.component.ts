import { Component, OnInit } from '@angular/core';
 
import { Router, ActivatedRoute } from '@angular/router';

import { ApiService } from '../servicio/api.service';
import { Elegibilidad } from '../models/elegibilidad';
import { Persona } from '../models/persona';
import { Pension } from '../models/pension';
import { Beneficiario } from '../models/beneficiario';

 



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
  public calificaBeneficioFijo: string;
  public calificaBeneficioVariable: string;
  public calificaTieneBeneficioPacs: string;
// datos beneficiarios
public rutBeneficirario: String;
public nombresBeneficirario: String;
public fechaNacbeneficiario: String;
public edadBeneficiario: String;
public sexoBeneficirario: String;
// Datos Pension
public dFechaPension: String;
public iNumeroMesesCotizados: String;
// DIPRECA
public cBonoReconoceDIPRECA: String;
public iCotizacionesDIPRECA = 10; 
public nMontoPensionDIPRECA = 1.8;
// CAPREDENA
public cBonoReconoceCAPREDENA: String;
public iCotizacionesCAPREDENA = 15; 
public nMontoPensionCAPREDENA = 2.8;
// IPS
public cBonoReconoceIPS: String;
public iCotizacionesIPS = 20;
public nMontoPensionIPS = 1.7; 
// OTROS HABERES PESOS
public nMontoPensionMutual = 10000
public nMontoPilarSolidario = 20000;	
public nMontoSubsidioDependencia = 30000;	
public nMontoSeguroDependecia = 40000;	
public nMontoTGR = 500000;
// DFL 3500
public iCotizacionesAFP = 360;	
public nMontoPensionPagadaRP = 1.8;	
public nMontoPensionPegadaRV = 15.9;



public iNumeroCotizacionesIPS: String;
public  nMontoIngreso: String;

 public fValorUf: string


  constructor(
    private apiService: ApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
 //   console.log('Entrada');
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
  //      console.log('rut recibido Persona ', run)
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
              this.edadBeneficiario = this.beneficiario.persona.edad;
              this.fechaNacbeneficiario = this.beneficiario.persona.dFechaNacimiento;
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
 //             console.error('este es err: ', err);
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
 //       console.log('rut recibido Pension ', rut)
        if (rut) {
          this.apiService.getPension(rut).subscribe(
            (pension) => {
              this.pension = pension
              console.log('datos pension : ', this.pension)
 /*             if (pension.pensionado.cResultadoBeneficioFijo.toString() == '1') {
                this.calificaBeneficioFijo = 'Cumple'
              } else {
                this.calificaBeneficioFijo = 'No Cumple'
              } */
 
              this.calificaBeneficioFijo = 'Cumple'

/*              if (pension.pensionado.cResultadoBeneficioVariabe.toString() == '1') {
                this.calificaBeneficioVariable = 'Cumple'
              } else {
                this.calificaBeneficioVariable = 'No Cumple'
              } */
              this.calificaBeneficioVariable = 'Cumple'
               this.fValorUf = this.pension.pensionado.nValorUFUtilizado.toString();
               this.dFechaPension = this.pension.pensionado.dFechaPension;
               this.iNumeroMesesCotizados = this.pension.pensionado.iNumeroCotizaciones.toString();
               this.cBonoReconoceDIPRECA = this.pension.pensionado.cBonoReconocimientoDIPRECA.toString();
               this.cBonoReconoceCAPREDENA = this.pension.pensionado.cBonoReconocimientoCAPREDENA.toString();
               this.cBonoReconoceIPS = this.pension.pensionado.cBonoReconocimientoIPS
               this.iNumeroCotizacionesIPS = this.pension.pensionado.iCotizacionesIPS.toString();
             //  this. nMontoIngreso = this.pension.pensionado.nMontoIngreso.toString();
            },
            err => {
              this.errores = err.error.errors as string[];
              console.error('Codigo de Error desde el Backend  err: ', err.status);
 //             console.error('este es err: ', err);
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
  //      console.log('rut recibido elegibilidad', rut)
        if (rut) {
          this.apiService.getElegibilidad(rut).subscribe(
            (elegibilidad) => {
              this.elegibilidad = elegibilidad
            },
            err => {
              this.errores = err.error.errors as string[];
              console.error('Codigo de Error desde el Backend  err: ', err.status);
 //             console.error('este es err: ', err);
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

  habilitar: boolean = true;
  setHabilitar(): void {

    this.habilitar = this.habilitar == true ? false : true;

  }


}
