import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Pokemon } from '../../models/pokemon';
import { CommunicationService } from '../../services/communication.service';
import { PokemonRepositoryService } from '../../services/pokemon-repository.service';

@Component({
  selector: 'app-create-update-card',
  templateUrl: './create-update-card.component.html',
  styleUrls: ['./create-update-card.component.css']
})
export class CreateUpdateCardComponent {
  pokemon?:Pokemon;
  pokemonForm!:FormGroup;

  constructor(
    private _communicationService:CommunicationService,
    private _fb: FormBuilder,
    private _pokemonRepositoryService:PokemonRepositoryService,
  ) {
    this.createForm();
    this.subscribeActions();
  }

  createForm() {
    this.pokemonForm = this._fb.group({
      name: ['', Validators.required],
      image: ['', Validators.required],
      attack: [50, [Validators.required, Validators.min(0), Validators.max(100)]],
      defense: [50, [Validators.required, Validators.min(0), Validators.max(100)]],
    });
  }

  updateForm() {
    this.pokemonForm.controls['name'].patchValue(this.pokemon?.name);
    this.pokemonForm.controls['image'].patchValue(this.pokemon?.image);
    this.pokemonForm.controls['attack'].patchValue(this.pokemon ? this.pokemon.attack : 50);
    this.pokemonForm.controls['defense'].patchValue(this.pokemon ? this.pokemon.defense : 50);
  }

  hideCard() {
    this._communicationService.showCreateUpdatePokemon({show: false});
  }

  async onSubmit() {
    if (this.pokemon) {
      this.pokemon.name = this.pokemonForm.controls['name'].value;
      this.pokemon.image = this.pokemonForm.controls['image'].value;
      this.pokemon.attack = this.pokemonForm.controls['attack'].value;
      this.pokemon.defense = this.pokemonForm.controls['defense'].value;
      await this._pokemonRepositoryService.updatePokemon(this.pokemon);
      this.makeActions()
    }  else {
      this.pokemon = {
        id: 0,
        attack: this.pokemonForm.controls['attack'].value,
        defense: this.pokemonForm.controls['defense'].value,
        image: this.pokemonForm.controls['image'].value,
        name: this.pokemonForm.controls['name'].value,
      };
      await this._pokemonRepositoryService.createPokemon(this.pokemon);
      this.makeActions()
    }
  }

  subscribeActions() {
    this._communicationService.getCreateUpdatePokemonObservable().subscribe(resp => {
      this.pokemon = resp.pokemon;
      this.updateForm();
    });
  }

  makeActions() {
    this._communicationService.showCreateUpdatePokemon({show: false});
    this._communicationService.updatePokemonList();
  }
}
