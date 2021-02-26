import { Component, OnInit, VERSION, ViewChild } from '@angular/core';
// import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
// import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { DeleteComponent } from '../delete/delete.component';
// import { Router } from '@angular/router';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {
  breakpoint: number; // Breakpoint observer code
  fname: string = `Ramesh`;
  lname: string = `Suresh`;
  addCusForm: FormGroup;
  wasFormChanged = false;

  constructor(
    private fb: FormBuilder,
    // public dialog: MatDialog
  ) { }

  public ngOnInit(): void {
    this.addCusForm = this.fb.group({
      IdProof: null,
      firstname: [this.fname, [Validators.required, Validators.pattern('[a-zA-Z]+([a-zA-Z ]+)*')]],
      lastname: [this.lname, [Validators.required, Validators.pattern('[a-zA-Z]+([a-zA-Z ]+)*')]],
      email: [null, [Validators.required, Validators.email]],
    });
    this.breakpoint = window.innerWidth <= 600 ? 1 : 2; // Breakpoint observer code
  }

  public onAddCus(): void {
    this.markAsDirty(this.addCusForm);
  }

  // openDialog(): void {
  //   console.log(this.wasFormChanged);
  //   if(this.addCusForm.dirty) {
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