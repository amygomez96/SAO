import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfessorsComponent } from './professors.component';
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { InformationDialogModule } from "../../commons/information-dialog/information-dialog.module";
import { UserService } from "../../services/user.service";
import { ProfessorsRoutingModule } from "./professors-routing.module";
import { AddProfessorDialogModule } from "./add-professor-dialog/add-professor-dialog.module";

@NgModule({
  declarations: [
    ProfessorsComponent
  ],
  imports: [
    CommonModule,
    ProfessorsRoutingModule,
    MatCheckboxModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    AddProfessorDialogModule,
    InformationDialogModule
  ],
  providers: [UserService]
})
export class ProfessorsModule {
}
