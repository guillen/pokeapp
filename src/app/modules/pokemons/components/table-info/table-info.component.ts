import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../../models/pokemon';
import { CommunicationService } from '../../services/communication.service';
import { PokemonRepositoryService } from '../../services/pokemon-repository.service';

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
    private _communicationService:CommunicationService,
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
    this._communicationService.showCreateUpdatePokemon({show: true, pokemon: pokemon});
  }

  async removePokemon(pokemon:Pokemon) {
    await this._pokemonRepositoryService.removePokemon(pokemon.id);
    this.makeActions();
  }

  subscribeActions() {
    this._communicationService.getSearchInTableObservable().subscribe(text => this.searchString = text);
    this._communicationService.getUpdatePokemonListObservable().subscribe(_resp => this.loadTable());
  }

  makeActions() {
    this._communicationService.showCreateUpdatePokemon({show: false});
    this.loadTable();
  }
}
