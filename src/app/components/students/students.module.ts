import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsComponent } from './students.component';
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { InformationDialogModule } from "../../commons/information-dialog/information-dialog.module";
import { UserService } from "../../services/user.service";
import { AddStudentDialogModule } from "./add-student-dialog/add-student-dialog.module";
import { StudentsRoutingModule } from "./students-routing.module";

@NgModule({
  declarations: [
    StudentsComponent
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    MatCheckboxModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    AddStudentDialogModule,
    InformationDialogModule
  ],
  providers: [UserService]
})
export class StudentsModule {
}
