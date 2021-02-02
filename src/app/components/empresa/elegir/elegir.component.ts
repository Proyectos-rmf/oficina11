import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

import { Empresa } from 'src/app/models/empresa';
import { EmpresaService } from '../empresas.service';

@Component({
  selector: 'app-elegir',
  templateUrl: './elegir.component.html',
  styleUrls: ['./elegir.component.scss']
})
export class ElegirComponent implements OnInit, AfterViewInit {
  empresas$ = this.empresaSvc.empresas;
  ELEMENT_DATA: Empresa[];

  displayedColumns: string[] = ['Nombre','Domicilio','actions'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private empresaSvc: EmpresaService) {}

  ngOnInit(): void {
    // this.empresas$.subscribe(res => { this.ELEMENT_DATA = res });
    // this.empresas$.subscribe(res => { this.dataSource.data = res });
    // this.empresaSvc.getAllEmpresas.su
    this.empresas$.subscribe(res => this.dataSource.data = res);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      // this.dataSource = new MatTableDataSource<Empresa>(this.ELEMENT_DATA);
      // this.dataSource = this.ELEMENT_DATA;
      this.dataSource = new MatTableDataSource();
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      // console.log(this.ELEMENT_DATA);
      console.log(this.dataSource.data);
    }, 2000);
  }
}
