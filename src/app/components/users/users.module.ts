import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { UsersRoutingModule } from "./users-routing.module";
import { UserService } from "../../services/user.service";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { AddUserDialogModule } from "./add-user-dialog/add-user-dialog.module";
import { InformationDialogModule } from "../../commons/information-dialog/information-dialog.module";

@NgModule({
  declarations: [
    UsersComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MatCheckboxModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    AddUserDialogModule,
    InformationDialogModule
  ],
  providers: [UserService]
})
export class UsersModule { }
