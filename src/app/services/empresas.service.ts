import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
// import { Observable } from "rxjs";
// import { Empresa } from '../models/empresa';

@Injectable({
  providedIn: 'root'
})

export class CrudService {

  // contacts: Observable<Empresa>;
  // private empresaColeccion: AngularFirestoreCollection<Empresa>;

  constructor(private readonly db: AngularFirestore) {
    // this.empresaColeccion = db.collection<Empresa>('empresas');
  }


  // Crear Colección
  async onSaveFormas(Formas: any, coleccion: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const id = this.db.createId();
        const data = { id, ...Formas };
        const result = this.db.collection<any>(coleccion).doc(id).set(data);
        resolve(result);
      } catch (error) {
        reject(error.message);
      }
    });
  }

  // Obtener todas las colecciones
  TodasEmpresas(coleccion: string) {
    return this.db.collection(coleccion).snapshotChanges();

    // return this.db.collection(coleccion).get();
  }

  // async onGetFormas(Formas: any, coleccion: string): Promise<void> {
  //   return new Promise(async (resolve, reject) => {
  //     try {
  //       const id = this.db.createId();
  //       const data = { id, ...Formas };
  //       const result = this.db
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

  // cityRef = this.db.collection('cities').doc('SF').get()
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
    return this.db.collection(coleccion).add(empresa);
  }


 getBuscar(coleccion, buscar) {
   var empresaref = this.db.collection(coleccion, ref => ref.where('nombre_Emp', '==', buscar));
  // var query = empresaref.where('nombre_Emp', buscar)
  //     this.tablaCollection = this.db.collection(coleccion);
//     this.tablaCollection = this.db.collection(coleccion, ref => ref.where('nombre_Emp', '==', buscar));
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
//   this.empresaColeccion = this.db.collection(coleccion);
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
//    this.empresaColeccion = this.db.collection(coleccion);
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
