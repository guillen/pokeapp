import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DEFAULT_VALUES } from 'src/app/core/constants/default-values';
import { USER_DATA } from 'src/app/core/constants/user-data';
import { PokemonDTO } from '../dto/request/PokemonDTO';
import { Pokemon } from '../models/pokemon';
import { CommunicationService } from './communication.service';
import { PokemonService } from './pokemon.service';

@Injectable({
  providedIn: 'root'
})
export class PokemonRepositoryService {

  constructor(
    private _pokemonService:PokemonService,
    private communicationService:CommunicationService,
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

  createPokemon(pokemon:Pokemon) {
    this._pokemonService.post(this.getDTO(pokemon)).subscribe(resp => this.makeActions());
  }

  updatePokemon(pokemon:Pokemon) {
    this._pokemonService.put(this.getDTO(pokemon), pokemon.id).subscribe(resp => this.makeActions());
  }

  removePokemon(id:number) {
    this._pokemonService.delete(id).subscribe(resp => this.makeActions());
  }

  makeActions() {
    this.communicationService.showCreateUpdatePokemon({show: false});
    this.communicationService.updatePokemonList();
  }
}
