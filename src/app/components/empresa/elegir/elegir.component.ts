import { Component, OnInit, ViewChild } from '@angular/core';
import { UtilService } from '../../../services/util.service';

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

import { Empresa } from 'src/app/models/empresa';
import { EmpresaService } from '../empresas.service';

@Component({
  selector: 'app-elegir',
  templateUrl: './elegir.component.html',
  styleUrls: ['./elegir.component.scss']
})
export class ElegirComponent implements OnInit {
  // empresas$ = this.UTIL.ApuntadorAction$;
  empresas$ = this.empresaSvc.empresas;
  // Empresamodal: Empresa[];
  // dataSource: Empresa[];

  ELEMENT_DATA: Empresa[];

  displayedColumns: string[] = ['Nombre','Domicilio'];
  dataSource: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private UTIL: UtilService, private empresaSvc: EmpresaService) {}

  ngOnInit(): void {
    this.empresas$.subscribe(res => {  this.ELEMENT_DATA = res });

    setTimeout(() => {
      // this.ELEMENT_DATA = this.Empresamodal;
      this.dataSource = new MatTableDataSource<Empresa>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
      console.log(this.ELEMENT_DATA);
      console.log(this.dataSource.paginator);


      // this.dataSource = this.Empresamodal;

      // console.log(this.Empresamodal[0].nombre_Emp);
    }, 2000);
  }
}
