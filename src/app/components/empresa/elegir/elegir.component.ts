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

  displayedColumns: string[] = ['nombre_Emp','calle_Emp','actions'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private empresaSvc: EmpresaService) {}

  ngOnInit(): void {
    this.empresas$.subscribe(res => { this.ELEMENT_DATA = res });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.dataSource = new MatTableDataSource();
      this.dataSource.data = this.ELEMENT_DATA;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, 2000);
  }

   applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
