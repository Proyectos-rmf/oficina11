import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss']
})
export class RegistrarComponent {
  llenar = false;
  arEmpresa: any[][];

  @ViewChild('fileInput') fileInput;

  file: File | null = null;

  constructor() { }

  llenado(): void {
    this.llenar = true;
  }

  onClickFileInputButton(): void {
    this.fileInput.nativeElement.click();
  }

  onChangeFileInput(): void {
    const files: { [key: string]: File } = this.fileInput.nativeElement.files;
    this.file = files[0];
  }

  onFileChange(evt: any): void {
    this.arEmpresa = evt;
  }

}
