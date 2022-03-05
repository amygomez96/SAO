import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OptionalsComponent } from "./optionals.component";

const routes: Routes = [
  {
    path: '',
    component: OptionalsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OptionalsRoutingModule {
}
