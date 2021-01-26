import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

import { Empresa } from 'src/app/models/empresa';

@Injectable({
  providedIn: 'root'
})

export class EmpresaService {
  empresas: Observable<Empresa[]>;
  Empresamodal: Empresa[];

  private empresasCollection: AngularFirestoreCollection<Empresa>;


  constructor(private readonly afs: AngularFirestore) {
    this.empresasCollection = afs.collection<Empresa>('empresas');
    this.getEmpresas();
  }

  private getEmpresas(): void {
    this.empresas = this.empresasCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => a.payload.doc.data() as Empresa)));

    setTimeout(() => {
      this.empresas.subscribe(res => { this.Empresamodal = res });
    }, 1000);
  }


  // Crear Colección
  async onSaveFormas(Formas: any, coleccion: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const id = this.afs.createId();
        const data = { id, ...Formas };
        const result = this.afs.collection<any>(coleccion).doc(id).set(data);
        resolve(result);
      } catch (error) {
        reject(error.message);
      }
    });
  }

  // Obtener todas las colecciones
  TodasEmpresas(coleccion: string) {
    return this.afs.collection(coleccion).snapshotChanges();

    // return this.afs.collection(coleccion).get();
  }

  // async onGetFormas(Formas: any, coleccion: string): Promise<void> {
  //   return new Promise(async (resolve, reject) => {
  //     try {
  //       const id = this.afs.createId();
  //       const data = { id, ...Formas };
  //       const result = this.afs
  //                          .collection<any>(coleccion)
  //                          .get()
  //                          .then(doc => {
  //                             doc.data();
  //                           });
  //       resolve(result);
  //     } catch (error) {
  //       reject(error.message);
  //     }
  //   });
  // }

  // cityRef = this.afs.collection('cities').doc('SF').get()
  // // getDoc = cityRef.get()
  // .then(doc => {
  //   if (!doc.exists) {
  //     console.log('No such document!');
  //   } else {
  //     console.log('Document data:', doc.data());
  //   }
  // })
  // .catch(err => {
  //   console.log('Error getting document', err);
  // });


  // Crear Empresa
  creaEmpresa(empresa: any, coleccion: string){
    return this.afs.collection(coleccion).add(empresa);
  }


 getBuscar(coleccion, buscar) {
   var empresaref = this.afs.collection(coleccion, ref => ref.where('nombre_Emp', '==', buscar));
  // var query = empresaref.where('nombre_Emp', buscar)
  //     this.tablaCollection = this.afs.collection(coleccion);
//     this.tablaCollection = this.afs.collection(coleccion, ref => ref.where('nombre_Emp', '==', buscar));
//      return this.tablas = empresaref.snapshotChanges()
//        .pipe(map(changes => {
//         return changes.map(action => {
//          const data = action.payload.doc.data() as TablaInterface;
//            data.id = action.payload.doc.id;
//            return data;
//          });
//       }));
 }

// idEmpresas(coleccion: string) {
//   this.empresaColeccion = this.afs.collection(coleccion);
//   return this.empresaColeccion.snapshotChanges()
//     .pipe(map(changes => {
//       return changes.map(action => {
//         const data = action.payload.doc.data();
//         data.id = action.payload.doc.id;
//         return data;
//     });
//   }));
// }


//  todasEmpresas(coleccion: string) {
//    this.empresaColeccion = this.afs.collection(coleccion);
//   return this.tablas = this.empresaColeccion.snapshotChanges()
//      .pipe(map(changes => {
//        return changes.map(action => {
//          const data = action.payload.doc.data();
//          data.id = action.payload.doc.id;
//          return data;
//      });
//    }));
//  }

  // getTabla(orden: string, coleccion) {
  //  this.dataApi.getAllTabla(orden,this.tablaService.config.tipo,coleccion).subscribe(tablas => {
  //    this.tablas = tablas;
  //    this.tablaService.config.totalItems = this.tablas.length;
  //  });
  // }

}
