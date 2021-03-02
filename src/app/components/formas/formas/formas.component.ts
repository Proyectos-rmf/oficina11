import { Component, OnInit, VERSION, ViewChild } from '@angular/core';
// import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
// import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { DeleteComponent } from '../delete/delete.component';
// import { Router } from '@angular/router';

@Component({
  selector: 'app-formas',
  templateUrl: './formas.component.html',
  styleUrls: ['./formas.component.css']
})
export class FormasComponent implements OnInit {
  breakpoint: number; // Breakpoint observer code
  
  correo: string;
  contrasena: string;

  Formas: FormGroup;
  wasFormChanged = false;

  constructor( private fb: FormBuilder ) { }

  public ngOnInit(): void {
    this.Formas = this.fb.group({
      correo: [this.correo, [Validators.required, Validators.pattern('[a-zA-Z]+([a-zA-Z ]+)*')]],
      email: [this.contrasena, [Validators.required, Validators.email]],
    });
    this.breakpoint = window.innerWidth <= 600 ? 1 : 2; // Breakpoint observer code
  }

  public onAddFormas(): void {
    console.log(this.Formas);
    
    this.markAsDirty(this.Formas);
  }

  // openDialog(): void {
  //   console.log(this.wasFormChanged);
  //   if(this.Formas.dirty) {
  //     const dialogRef = this.dialog.open(DeleteComponent, {
  //       width: '340px',
  //     });
  //   } else {
  //     this.dialog.closeAll();
  //   }
  // }

  // tslint:disable-next-line:no-any
  public onResize(event: any): void {
    this.breakpoint = event.target.innerWidth <= 600 ? 1 : 2;
  }

  private markAsDirty(group: FormGroup): void {
    group.markAsDirty();
    // tslint:disable-next-line:forin
    for (const i in group.controls) {
      group.controls[i].markAsDirty();
    }
  }

  formChanged() {
    this.wasFormChanged = true;
  }

}