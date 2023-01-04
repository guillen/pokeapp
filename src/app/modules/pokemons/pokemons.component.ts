import { Component, OnInit } from '@angular/core';
import { Pokemon } from './models/pokemon';
import { CommunicationService } from './services/communication.service';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.css']
})
export class PokemonsComponent implements OnInit {
  showEditUpdate:boolean = false;
  pokemon?:Pokemon;

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
    this.communicationService.createUpdatePokemonObservable.subscribe(resp => {
      this.pokemon = resp.pokemon;
      this.showEditUpdate = resp.show;
    });
  }
}
