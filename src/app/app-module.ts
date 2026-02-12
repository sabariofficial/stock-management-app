import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from "@angular/forms"
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { environment } from '../environments/environment';
import { Materials } from './core/materials/materials';
import { AgGridModule } from 'ag-grid-angular';
import { AddMaterial } from './core/add-material/add-material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { Popup } from './model/popup/popup';
import { AddManufacture } from './core/add-manufacture/add-manufacture';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    App,
    Materials,
    AddMaterial,
    Popup,
    AddManufacture,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatIconModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideClientHydration(withEventReplay()),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
  ],
  bootstrap: [App]
})
  
export class AppModule { }


