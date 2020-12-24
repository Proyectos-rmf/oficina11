import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import * as XLSX from 'xlsx';

type AOA = any[][];

@Injectable({
  providedIn: 'root'
})
export class XlsService {
  public data: AOA = [[1, 2], [3, 4]];
  private excelObj = new BehaviorSubject<AOA>(null);
  XLSAction$ = this.excelObj.asObservable();

  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };

  XLStoJSON(evt: any): Observable<AOA> {
    /* Leer el Archivo */
    const target: DataTransfer = (evt.target) as DataTransfer;
    if (target.files.length !== 1) { throw new Error('No se puede usar multiples archivos'); }
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = ((XLSX.utils.sheet_to_json(ws, { header: 1 })) as AOA);
      this.XLSarreglo(this.data);
    };
    reader.readAsBinaryString(target.files[0]);
    return of(this.data);
  }

  XLSarreglo(value: AOA): void {
    this.excelObj.next(value);
  }

}
