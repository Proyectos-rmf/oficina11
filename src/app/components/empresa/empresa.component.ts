import { Component, OnInit } from '@angular/core';

import { UtilService } from '../../services/util.service';
import { EmpresaService } from './empresas.service';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styles: [
  ]
})
export class EmpresaComponent implements OnInit {
  empresas$ = this.empresaSvc.empresas;
  noactivo = false;

  constructor(private empresaSvc: EmpresaService, private UTIL: UtilService) { }
  indice = 1;

  ngOnInit(): void {
    this.getEmpresa();
  }

  getEmpresa(): void {
    const espera = this.UTIL.start();
    setTimeout(() => {
      if (typeof(this.empresaSvc.Empresamodal[0]?.id)==='undefined') {
        this.indice = 0;
        this.noactivo = true;
      } else {
        this.indice = 1;
        this.UTIL.Variables(this.empresaSvc.Empresamodal);
      }
      this.UTIL.stop(espera);
    }, 2500);
  }

}
