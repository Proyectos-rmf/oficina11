import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app/app-routing.module';
import { AppComponent } from './app/app.component';
import { environment } from 'src/environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './app/material-module';

import {DialogComponent} from '../app/components/dialog/dialog-component';

/* Importar FireBase */
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule, BUCKET } from '@angular/fire/storage';

import { NavComponent } from './components/nav/nav.component';
import { EmpresaModule } from './components/empresa/empresa.module';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    EmpresaModule
  ],
  entryComponents: [DialogComponent],
  providers: [ { provide: BUCKET, useValue: 'gs://ofpempresas.appspot.com' },
               { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: '' } }],
  bootstrap: [AppComponent]
})
export class AppModule { }
