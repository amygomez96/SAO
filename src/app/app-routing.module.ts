import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./authentication/authentication.module').then((m) => m.AuthenticationModule)
      },
      {
        path: 'administration',
        loadChildren: () => import('./components/components.module').then((m) => m.ComponentsModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    relativeLinkResolution: 'legacy'
  })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
