import { Injectable } from '@angular/core';
// import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';

export interface Student {
    $key: string;
    firstName: string;
    lastName: string;
    email: string;
    mobileNumber: number;
 }
@Injectable({
  providedIn: 'root'
})

export class CrudService {
  crudsRef: AngularFireList<any>;
  crudRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) { }

  // Create Student
  AddCrud(student: Student) {
    this.crudsRef.push({
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      mobileNumber: student.mobileNumber
    });
  }

  // Fetch Single Student Object
  GetCrud(id: string) {
    this.crudRef = this.db.object('students-list/' + id);
    return this.crudRef;
  }

  // Fetch Students List
  GetCrudList() {
    this.crudsRef = this.db.list('students-list');
    return this.crudsRef;
  }

  // Update Student Object
  UpdateCrud(student: Student) {
    this.crudRef.update({
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      mobileNumber: student.mobileNumber
    });
  }

  // Delete Student Object
  DeleteCrud(id: string) {
    this.crudRef = this.db.object('students-list/' + id);
    this.crudRef.remove();
  }
}
