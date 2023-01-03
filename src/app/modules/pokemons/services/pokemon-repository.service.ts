import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pokemon } from '../models/pokemon';
import { PokemonService } from './pokemon.service';

@Injectable({
  providedIn: 'root'
})
export class PokemonRepositoryService {

  constructor(private _pokemonService:PokemonService) { }

  getTableData() : Observable<Pokemon[]> {
    return this._pokemonService.get();
  }
}
