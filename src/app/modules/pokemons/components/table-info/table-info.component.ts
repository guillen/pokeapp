import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../../models/pokemon';
import { PokemonRepositoryService } from '../../services/pokemon-repository.service';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-table-info',
  templateUrl: './table-info.component.html',
  styleUrls: ['./table-info.component.css']
})
export class TableInfoComponent implements OnInit {
  pokemonList:Pokemon[] = [];

  constructor(private _pokemonRepositoryService:PokemonRepositoryService) { }

  ngOnInit(): void {
    this.loadTable();
  }

  loadTable() {
    this._pokemonRepositoryService.getTableData().subscribe(resp => this.pokemonList = resp);
  }
}
