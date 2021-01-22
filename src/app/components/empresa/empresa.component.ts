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
  item: Empresa[];
  Empresamodal: Empresa[];
  noactivo = false;

  // navigationExtras: NavigationExtras = {
  //   state: {
  //     value: null
  //   }
  // };

  constructor(private empresaSvc: EmpresaService, private router: Router, private UTIL: UtilService) { }
  indice = 1;

  ngOnInit(): void {
    this.getEmpresa();
  }

  ponerdato(datos: Empresa[]): void { this.item = datos; console.log(this.item) }

  getEmpresa(): void {
      this.empresas$.subscribe(res => { this.Empresamodal = res; this.ponerdato(this.Empresamodal) });
      setTimeout(() => {
        // this.navigationExtras.state.value = this.empresas$;
        const espera = this.UTIL.start();
        if (this.item[0]?.id) { this.indice = 1 } else { this.indice = 0; this.noactivo = true }
        this.UTIL.stop(espera);
      }, 500);
  }
}
