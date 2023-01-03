import { Injectable } from "@angular/core";
import { CrudClass } from "src/app/core/interfaces/crud.class";
import { PokemonDTO } from "../dto/request/PokemonDTO";
import { Pokemon } from "../models/pokemon";
import { PokemonsModule } from "../pokemons.module";

@Injectable({
  providedIn: 'root'
})
export class PokemonService extends CrudClass<PokemonDTO, Pokemon> {
  
}
