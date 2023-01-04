import { Component, OnInit } from '@angular/core';
import { CommunicationService } from './services/communication.service';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.css']
})
export class PokemonsComponent implements OnInit {
  showEditUpdate:boolean = false;

  constructor(
    private _communicationService:CommunicationService,
  ) {
    this.subscribeActions();
  }

  ngOnInit(): void {
  }

  showCreateCard() {
    this._communicationService.showCreateUpdatePokemon({show: true});
  }

  subscribeActions() {
    this._communicationService.getCreateUpdatePokemonObservable().subscribe(resp => this.showEditUpdate = resp.show);
  }
}
