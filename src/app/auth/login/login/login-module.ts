import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Login } from '../login';
import { LoginRoutingModule } from "./login-routing-module"
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { Header } from '../../../core/header/header';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [Login],
  imports: [
    CommonModule,
    LoginRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule
]
})
export class LoginModule { }