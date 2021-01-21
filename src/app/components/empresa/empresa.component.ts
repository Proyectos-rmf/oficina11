import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

import { UtilService } from '../../services/util.service';
import { EmpresaService } from './empresas.service';
import { Empresa } from '../../models/empresa';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styles: [
  ]
})
export class EmpresaComponent implements OnInit {
  empresas$ = this.empresaSvc.empresas;

  navigationExtras: NavigationExtras = {
    state: {
      value: null
    }
  };

  public Empresamodal: Empresa[];
  noactivo = false;

  constructor(private empresaSvc: EmpresaService, private router: Router, private UTIL: UtilService) { }
  indice = 1;

  ngOnInit(): void {
    this.getEmpresa();
    // this.listaEmpresas('empresas');
  }

  getEmpresa(): void {
    this.empresas$.subscribe(res => { this.Empresamodal = res; });
    console.log(this.Empresamodal);

    this.navigationExtras.state.value = this.empresas$;
    const espera = this.UTIL.start();
    if (this.empresas$.nombre_Emp) {
      console.log('Existen');
    } else {
      console.log('No existen');
    }
    this.UTIL.stop(espera);

    // this.empresaSvc.TodasEmpresas(coleccion).subscribe(data => {
    //   this.Empresamodal = data.map(e => {
    //     return {
    //       id: e.payload.doc.id,
    //       elegir: false,
    //       ...e.payload.doc.data() as Empresa
    //     };
    //   });

    //   if (this.Empresamodal[0]?.id) {
    //     this.noactivo = false;
    //     this.UTIL.Variables(this.Empresamodal);
    //     this.indice = 1
    //   } else {
    //       this.noactivo = true;
    //       this.indice = 0
    //     }

    //   this.UTIL.stop(espera);
    // }, (error) => {
    //     this.UTIL.stop(espera);
    //     this.UTIL.openDialog('red', 'clear', 'La Base de datos no esta Disponible', 3000);
    //     this.router.navigate(['']);
    // });
  }


listaEmpresas(coleccion: string): void {
    const espera = this.UTIL.start();

    this.empresaSvc.TodasEmpresas(coleccion).subscribe(data => {
      this.Empresamodal = data.map(e => {
        return {
          id: e.payload.doc.id,
          elegir: false,
          ...e.payload.doc.data() as Empresa
        };
      });

      if (this.Empresamodal[0]?.id) {
        this.noactivo = false;
        this.UTIL.Variables(this.Empresamodal);
        this.indice = 1
      } else {
          this.noactivo = true;
          this.indice = 0
        }

      this.UTIL.stop(espera);
    }, (error) => {
        this.UTIL.stop(espera);
        this.UTIL.openDialog('red', 'clear', 'La Base de datos no esta Disponible', 3000);
        this.router.navigate(['']);
    });
  }

}
