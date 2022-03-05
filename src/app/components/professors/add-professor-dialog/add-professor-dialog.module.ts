import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddProfessorDialogComponent } from './add-professor-dialog.component';
import { MatDialogModule } from "@angular/material/dialog";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { UserService } from "../../../services/user.service";

@NgModule({
  declarations: [AddProfessorDialogComponent],
  exports: [AddProfessorDialogComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  providers: [UserService]
})
export class AddProfessorDialogModule {
}
