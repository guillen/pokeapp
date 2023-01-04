import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ShowPokemon } from '../interfaces/show-pokemon';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  private createUpdatePokemonSubject = new Subject<ShowPokemon>();
  createUpdatePokemonObservable = this.createUpdatePokemonSubject.asObservable();
  private updatePokemonListSubject = new Subject<void>();
  updatePokemonListObservable = this.updatePokemonListSubject.asObservable();

  constructor() { }

  showCreateUpdatePokemon(action:ShowPokemon) {
    return this.createUpdatePokemonSubject.next(action);
  }

  updatePokemonList() {
    return this.updatePokemonListSubject.next();
  }
}
