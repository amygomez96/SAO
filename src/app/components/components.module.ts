import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentRoutingModule } from "./components-routing.module";
import { ComponentsComponent } from './components.component';
import { MatButtonModule } from "@angular/material/button";
import { MatMenuModule } from "@angular/material/menu";
import { MatIconModule } from "@angular/material/icon";
import { UserService } from "../services/user.service";

@NgModule({
  declarations: [
    ComponentsComponent
  ],
  imports: [
    CommonModule,
    ComponentRoutingModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule
  ],
  providers: [UserService]
})
export class ComponentsModule {
}
