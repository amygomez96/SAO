import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OptionalsComponent } from './optionals.component';
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { OptionalsRoutingModule } from "./optionals-routing.module";
import { InformationDialogModule } from "../../commons/information-dialog/information-dialog.module";
import { MatTableModule } from "@angular/material/table";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { AddOptionalDialogModule } from "./add-optional-dialog/add-optional-dialog.module";

@NgModule({
  declarations: [
    OptionalsComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    OptionalsRoutingModule,
    InformationDialogModule,
    MatTableModule,
    MatCheckboxModule,
    AddOptionalDialogModule
  ]
})
export class OptionalsModule { }
