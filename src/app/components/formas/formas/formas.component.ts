import { Component, Inject, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-formas',
  templateUrl: './formas.component.html',
  styleUrls: ['./formas.component.css']
})
export class FormasComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<FormasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any ) { }

  public ngOnInit(): void {
  }

}
