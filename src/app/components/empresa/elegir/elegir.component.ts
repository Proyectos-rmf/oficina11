import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

import {MatPaginator, MatPaginatorIntl} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

import {Empresa} from 'src/app/models/empresa';
import {EmpresaService} from '../empresas.service';
import {UtilService} from 'src/app/services/util.service';

@Component({
  selector: 'app-elegir',
  templateUrl: './elegir.component.html',
  styleUrls: ['./elegir.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ElegirComponent implements OnInit, AfterViewInit {
  empresas$ = this.empresaSvc.empresas;
  ELEMENT_DATA: Empresa[];

  displayedColumns: string[] = ['nombre_Emp'];
  dataSource = new MatTableDataSource();
  expandedElement: Empresa | null;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private empresaSvc: EmpresaService,  private pagina: MatPaginatorIntl, private UTIL: UtilService) {
    this.pagina.itemsPerPageLabel = "Registros";
    this.pagina.nextPageLabel = "Siguiente página";
    this.pagina.previousPageLabel = "Página anterior";
    this.pagina.firstPageLabel = "Primera página";
    this.pagina.lastPageLabel = "Última página";
  }

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

  onActivado() {
    this.UTIL.openDialog('', '', '', 1, 'Activar');
  }
}
