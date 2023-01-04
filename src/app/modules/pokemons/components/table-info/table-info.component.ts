import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../../models/pokemon';
import { CommunicationService } from '../../services/communication.service';
import { PokemonRepositoryService } from '../../services/pokemon-repository.service';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-table-info',
  templateUrl: './table-info.component.html',
  styleUrls: ['./table-info.component.css']
})
export class TableInfoComponent implements OnInit {
  pokemonList:Pokemon[] = [];
  searchString = '';

  constructor(
    private _pokemonRepositoryService:PokemonRepositoryService,
    private communicationService:CommunicationService,
  ) {
    this.subscribeActions();
  }

  ngOnInit(): void {
    this.loadTable();
  }

  loadTable() {
    this._pokemonRepositoryService.getTableData().subscribe(resp => this.pokemonList = resp);
  }

  showEditCard(pokemon:Pokemon) {
    this.communicationService.showCreateUpdatePokemon({show: true, pokemon: pokemon});
  }

  removePokemon(pokemon:Pokemon) {
    this._pokemonRepositoryService.removePokemon(pokemon.id);
  }

  subscribeActions() {
    this.communicationService.updatePokemonListObservable.subscribe(() => this.loadTable());
    this.communicationService.searchInTableObservable.subscribe(text => this.searchString = text);
  }
}
