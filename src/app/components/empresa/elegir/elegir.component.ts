import { Component, Input, OnInit } from '@angular/core';
import { UtilService } from '../../../services/util.service';

import { Empresa } from 'src/app/models/empresa';

@Component({
  selector: 'app-elegir',
  templateUrl: './elegir.component.html',
  styleUrls: ['./elegir.component.scss']
})
export class ElegirComponent implements OnInit {
  empresas$ = this.UTIL.ApuntadorAction$;
  Empresamodal: Empresa[];

  constructor(private UTIL: UtilService) {}

  ngOnInit(): void {
    this.empresas$.subscribe(res => { this.Empresamodal = res });

    setTimeout(() => {
      // console.log(this.Empresamodal[0].nombre_Emp);
    }, 1000);
  }
}
