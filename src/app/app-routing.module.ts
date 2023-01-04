import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeTitleComponent } from './components/home-title/home-title.component';
import { ROUTE_NAMES } from './core/constants/route-names';

export const routes: Routes = [
  { 
    path: ROUTE_NAMES.POKEMONS, 
    loadChildren: () => import('./modules/pokemons/pokemons.module').then(m => m.PokemonsModule),
  },
  {
    path: ROUTE_NAMES.HOME,
    component: HomeTitleComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
