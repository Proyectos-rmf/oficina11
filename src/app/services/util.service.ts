import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { DialogComponent } from '../components/dialog/dialog-component';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  private apuntador = new BehaviorSubject<any>(null);
  ApuntadorAction$ = this.apuntador.asObservable();

  constructor(public dialogo: MatDialog) { }

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
        disableClose: false
    });
    return dialogRef;
  }

  // tslint:disable-next-line: typedef
  stop(ref: MatDialogRef<DialogComponent>){
    ref.close();
  }

  openDialog(Color: string, Icono: string, Info: string, tiempo: number): void {
    const dialogRef = this.dialogo.open(DialogComponent, {
      data: {color: Color, icono: Icono, info: Info, carga: false},
      disableClose: tiempo !== 0 ? true : false
    });

    if (tiempo !== 0) { setTimeout(() => { dialogRef.close(); }, tiempo); }
  }
}
