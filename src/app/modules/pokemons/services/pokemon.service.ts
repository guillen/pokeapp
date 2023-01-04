import { Injectable } from "@angular/core";
import { CrudService } from "src/app/core/interfaces/crud.service";
import { PokemonDTO } from "../dto/request/PokemonDTO";
import { Pokemon } from "../models/pokemon";

@Injectable({
  providedIn: 'root'
})
export class PokemonService extends CrudService<PokemonDTO, Pokemon> {
  
}
