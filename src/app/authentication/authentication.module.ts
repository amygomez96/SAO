import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationComponent } from './authentication.component';
import { ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { AuthenticationRoutingModule } from "./authentication-routing.module";
import { MatButtonModule } from "@angular/material/button";
import { UserService } from "../services/user.service";

@NgModule({
  declarations: [
    AuthenticationComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    AuthenticationRoutingModule,
    MatButtonModule
  ],
  providers: [UserService]
})
export class AuthenticationModule {
}
