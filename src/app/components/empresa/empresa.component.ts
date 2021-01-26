import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  noactivo = false;

  constructor(private empresaSvc: EmpresaService, private router: Router, private UTIL: UtilService) { }
  indice = 1;

  ngOnInit(): void {
    this.getEmpresa();
  }

  getEmpresa(): void {
    const espera = this.UTIL.start();
    setTimeout(() => {
      if (typeof(this.empresaSvc.Empresamodal[0])==='undefined') {
        this.indice = 0;
        this.noactivo = true;
      } else {
        this.indice = 1;
        this.UTIL.Variables(this.empresaSvc.Empresamodal);
      }
      this.UTIL.stop(espera);
    }, 2000);

    // console.log(this.empresas$.operator.project);

    // const espera = this.UTIL.start();
    // this.empresas$.subscribe(res => { this.Empresamodal = res });
    // this.UTIL.stop(espera);

    // setTimeout(() => {
    //   if (this.Empresamodal.length != 0) { this.indice = 1 } else { this.indice = 0; this.noactivo = true }
    //   this.UTIL.Variables(this.Empresamodal);
    // }, 1000);
  }
}
