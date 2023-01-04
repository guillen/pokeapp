import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Pokemon } from './models/pokemon';
import { CommunicationService } from './services/communication.service';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.css']
})
export class PokemonsComponent implements OnInit {
  showEditUpdate:boolean = false;

  constructor(
    private communicationService:CommunicationService,
  ) {
    this.subscribeActions();
  }

  ngOnInit(): void {
  }

  showCreateCard() {
    this.communicationService.showCreateUpdatePokemon({show: true});
  }

  subscribeActions() {
    this.communicationService.createUpdatePokemonObservable.subscribe(resp => this.showEditUpdate = resp.show);
  }
}
