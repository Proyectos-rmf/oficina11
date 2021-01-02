import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { UtilService } from 'src/app/services/util.service';
import { CrudService } from 'src/app/services/empresas.service';
import { XlsService } from 'src/app/services/xls.service';

@Component({
  selector: 'app-llenar',
  templateUrl: './llenar.component.html',
  styleUrls: []
})
export class LlenarComponent implements OnInit {
  @Input() archivo: any;
  empresaForm: FormGroup;

  public datos: any[][];
  public XLSarr$ = this.XLSX.XLSAction$;

  constructor(public XLSX: XlsService, public UTIL: UtilService,
              public formBuilder: FormBuilder, public crudApi: CrudService) {}

  ngOnInit(): void {
    if (this.archivo) { this.onFileChange(this.archivo); }

    this.empresaForm = this.formBuilder.group({
      nombre_Emp: ['', [Validators.required, Validators.minLength(6)]],
      calle_Emp: ['', [Validators.required, Validators.minLength(8)]],
      colonia_Emp: ['', [Validators.required, Validators.minLength(6)]],
      ciudad_Emp: ['', [Validators.required, Validators.minLength(4)]],
      estado_Emp: ['', [Validators.required, Validators.minLength(4)]],
      cp_Emp: ['', [Validators.minLength(5), Validators.maxLength(6), Validators.pattern('^[0-9]*$') ] ],
      telefono_Emp: ['', [Validators.minLength(5), Validators.maxLength(10), Validators.pattern('^[0-9]*$') ] ],
    });

  }

  onSubmit(): void {
    if (navigator.onLine) {
      this.onSaveEmpresas();
    } else {
      this.UTIL.openDialog('red', 'clear', 'No tienes acceso a INTERNET, espere un momento ...', 3000);
     }
  }

  onSaveEmpresas() {
    this.UTIL.Variables(this.empresaForm.value);
    this.UTIL.onSaveFormas('empresas', 'Empresa creada');
  }

  ponerdatos(informa: any[][]): void {
    const empresas = {
      nombre_Emp: (informa ? informa[1][0] : ''),
      calle_Emp: (informa ? informa[1][1] : ''),
      colonia_Emp: (informa ? informa[1][2] : ''),
      ciudad_Emp: (informa ? informa[1][4] : ''),
      estado_Emp: (informa ? informa[1][5] : ''),
      cp_Emp: (informa ? informa[1][3] : ''),
      telefono_Emp: (informa ? informa[1][6] : '')
    };

    this.empresaForm.setValue(empresas);
    // console.log('Empresa', this.empresaForm.controls.nombre_Emp.value);
  }

  getErrorMessage(campo: any): string {
    return this.UTIL.getErrorMessage(campo);
  }

  onFileChange(evt: any): void {
    this.XLSX.XLStoJSON(evt).subscribe(datos => {
      setTimeout(() => {
        this.XLSarr$.subscribe(res => { this.datos = res; });
        this.ponerdatos(this.datos);
      }, 300);
    });
  }

}
