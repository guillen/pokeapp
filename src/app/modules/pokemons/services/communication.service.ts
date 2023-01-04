import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ShowPokemon } from '../interfaces/show-pokemon';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  private createUpdatePokemonSubject = new Subject<ShowPokemon>();
  private createUpdatePokemonObservable = this.createUpdatePokemonSubject.asObservable();
  private updatePokemonListSubject = new Subject<void>();
  private updatePokemonListObservable = this.updatePokemonListSubject.asObservable();
  private searchInTableSubject = new BehaviorSubject<string>('');
  private searchInTableObservable = this.searchInTableSubject.asObservable();

  showCreateUpdatePokemon(action:ShowPokemon) {
    return this.createUpdatePokemonSubject.next(action);
  }

  updatePokemonList() {
    return this.updatePokemonListSubject.next();
  }

  searchInTable(text:string) {
    this.searchInTableSubject.next(text);
  }

  getSearchInTableObservable() {
    return this.searchInTableObservable;
  }

  getUpdatePokemonListObservable() {
    return this.updatePokemonListObservable;
  }

  getCreateUpdatePokemonObservable() {
    return this.createUpdatePokemonObservable;
  }
}
