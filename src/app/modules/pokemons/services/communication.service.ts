import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ShowPokemon } from '../interfaces/show-pokemon';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  //notify you want to show creation/update panel card
  private createUpdatePokemonSubject = new Subject<ShowPokemon>();
  private createUpdatePokemonObservable = this.createUpdatePokemonSubject.asObservable();
  //notify you want to 
  private updatePokemonListSubject = new Subject<void>();
  private updatePokemonListObservable = this.updatePokemonListSubject.asObservable();
  //notify you want to filter table with a string
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
