import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestsComponent } from './requests.component';
import { RequestsRoutingModule } from "./requests-routing.module";
import { RequestService } from "../../services/request.service";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { InformationDialogModule } from "../../commons/information-dialog/information-dialog.module";
import { UserService } from "../../services/user.service";
import { AddRequestDialogModule } from "./add-request-dialog/add-request-dialog.module";
import { MatTooltipModule } from "@angular/material/tooltip";

@NgModule({
  declarations: [
    RequestsComponent
  ],
  imports: [
    CommonModule,
    RequestsRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatCheckboxModule,
    InformationDialogModule,
    AddRequestDialogModule,
    MatTooltipModule
  ],
  providers: [RequestService, UserService]
})
export class RequestsModule {
}
