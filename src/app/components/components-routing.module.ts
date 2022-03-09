import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ComponentsComponent} from "./components.component";

const routes: Routes = [
  {
    path: '',
    component: ComponentsComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then((m) => m.HomeModule)
      },
      {
        path: 'users',
        loadChildren: () => import('./users/users.module').then((m) => m.UsersModule)
      },
      {
        path: 'optionals',
        loadChildren: () => import('./optionals/optionals.module').then((m) => m.OptionalsModule)
      },
      {
        path: 'students',
        loadChildren: () => import('./students/students.module').then((m) => m.StudentsModule)
      },
      {
        path: 'professors',
        loadChildren: () => import('./professors/professors.module').then((m) => m.ProfessorsModule)
      },
      {
        path: 'requests',
        loadChildren: () => import('./requests/requests.module').then((m) => m.RequestsModule)
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentRoutingModule {
}
