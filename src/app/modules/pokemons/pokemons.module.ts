import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PokemonsRoutingModule } from './pokemons-routing.module';
import { PokemonsComponent } from './pokemons.component';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { TableInfoComponent } from './components/table-info/table-info.component';
import { CreateUpdateCardComponent } from './components/create-update-card/create-update-card.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PokemonsComponent,
    SearchInputComponent,
    TableInfoComponent,
    CreateUpdateCardComponent
  ],
  imports: [
    CommonModule,
    PokemonsRoutingModule,
    ReactiveFormsModule,
  ],
})
export class PokemonsModule { }
