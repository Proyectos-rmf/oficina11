import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { DialogComponent } from '../components/dialog/dialog-component';
import { EmpresaService } from 'src/app/components/empresa/empresas.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  private apuntador = new BehaviorSubject<any>(null);
  ApuntadorAction$ = this.apuntador.asObservable();

  constructor(private dialogo: MatDialog, private crudApi: EmpresaService, private router: Router) { }

  Variables(value: any): void {
    this.apuntador.next(value);
  }

  getErrorMessage(campo: any): string {

    if (campo.errors != null) {
      if (campo.errors.required) {
        return 'Es necesario introducir datos';
      }

      if (campo.errors.pattern?.requiredPattern) {
        return 'No es válido';
      }

      if (campo.errors.minlength?.requiredLength) {
        return 'Mínimo de ' + campo.errors.minlength.requiredLength + ' Caractéres';
      }

      if (campo.errors.maxlength?.requiredLength) {
        return 'Máximo de ' + campo.errors.maxlength.requiredLength + ' Caractéres';
      }
    }

    if (campo.status === 'INVALID') {
      return 'El dato no es válido';
    }

  }

  start(): MatDialogRef<DialogComponent> {
    const dialogRef = this.dialogo.open(DialogComponent, {
        data: {info: 'Espere...', carga: true},
        disableClose: true
    });
    return dialogRef;
  }

  stop(ref: MatDialogRef<DialogComponent>){
    ref.close();
  }

  openDialog(Color: string, Icono: string, Info: string, tiempo: number, forma: string): void {
    if (forma.length == 0) {
      const dialogRef = this.dialogo.open(DialogComponent, {
        data: {color: Color, icono: Icono, info: Info, carga: false},
        disableClose: tiempo !== 0 ? true : false
      });

      setTimeout(() => { dialogRef.close(); }, tiempo);
    } else {
        const dialogRef = this.dialogo.open(DialogComponent, {
          data: {carga: false},
          disableClose: true
        });
    }
  }


  // CRUD con FireBase

  // Crear Colección
  async onSaveFormas(coleccion: string, mensaje: string, pagina: string): Promise<void> {
    const cargando = this.start();
    try {
      const formValue = this.apuntador.value;
      await this.crudApi.onSaveFormas(formValue, coleccion);
      this.stop(cargando);
      this.openDialog('green', 'done', mensaje, 2000, '');
      this.router.navigate([pagina]);
    } catch (error: any) {
      alert(error.code);
    }
  }

}
