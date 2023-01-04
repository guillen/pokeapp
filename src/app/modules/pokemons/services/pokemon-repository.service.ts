import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DEFAULT_VALUES } from 'src/app/core/constants/default-values';
import { USER_DATA } from 'src/app/core/constants/user-data';
import { PokemonDTO } from '../dto/request/PokemonDTO';
import { Pokemon } from '../models/pokemon';
import { PokemonService } from './pokemon.service';

@Injectable({
  providedIn: 'root'
})
export class PokemonRepositoryService {

  constructor(
    private _pokemonService:PokemonService,
  ) { }

  getTableData() : Observable<Pokemon[]> {
    return this._pokemonService.get();
  }

  getDTO(pokemon:Pokemon) : PokemonDTO {
    return {
      attack: pokemon.attack,
      defense: pokemon.defense,
      hp: DEFAULT_VALUES.hp,
      image: pokemon.image,
      idAuthor: USER_DATA.idAuthor,
      name: pokemon.name,
      type: DEFAULT_VALUES.type,
    }
  }

  createPokemon(pokemon:Pokemon) : Promise<Pokemon> {
    return new Promise<Pokemon>((resolve, reject) => {
      this._pokemonService.post(this.getDTO(pokemon)).subscribe(resolve);
    });
  }

  updatePokemon(pokemon:Pokemon) : Promise<Pokemon> {
    return new Promise<Pokemon>((resolve, reject) => {
      this._pokemonService.put(this.getDTO(pokemon), pokemon.id).subscribe(resolve);
    });
  }

  removePokemon(id:number) : Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this._pokemonService.delete(id).subscribe(resolve);
    });
  }
}
