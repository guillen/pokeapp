import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs/internal/observable/of';
import { DEFAULT_VALUES } from 'src/app/core/constants/default-values';
import { USER_DATA } from 'src/app/core/constants/user-data';
import { getPokemons, getPokemon } from 'src/app/testing/helpers/utl';
import { PokemonDTO } from '../dto/request/PokemonDTO';
import { Pokemon } from '../models/pokemon';
import { CommunicationService } from './communication.service';

import { PokemonRepositoryService } from './pokemon-repository.service';
import { PokemonService } from './pokemon.service';

describe('PokemonRepositoryService', () => {
  let service: PokemonRepositoryService;
  let pokemonServiceSpy: jasmine.SpyObj<PokemonService>;
  let communicationServiceSpy: jasmine.SpyObj<CommunicationService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule, HttpClientTestingModule ],
      providers: [
        {provide: PokemonService, useSpy: jasmine.createSpyObj('PokemonService', ['get', 'post', 'put', 'delete'])},
        {provide: CommunicationService, useSpy: jasmine.createSpyObj('CommunicationService', ['showCreateUpdatePokemon', 'updatePokemonList'])}
      ],
    });
    service = TestBed.inject(PokemonRepositoryService);
    pokemonServiceSpy = TestBed.inject(PokemonService) as jasmine.SpyObj<PokemonService>;
    communicationServiceSpy = TestBed.inject(CommunicationService) as jasmine.SpyObj<CommunicationService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should call get function from pokemon service at time to get all pokemons', () => {
    let get = spyOn(pokemonServiceSpy, 'get').and.returnValue(of(getPokemons()));

    service.getTableData();

    expect(get).toHaveBeenCalled();
  });

  it('Should call post function from pokemon service at time to create a pokemon', () => {
    let charizard = getPokemon('Charizard');
    let charizardDTO:PokemonDTO = {
      attack: charizard.attack,
      defense: charizard.defense,
      hp: 100,
      image: charizard.image,
      idAuthor: USER_DATA.idAuthor,
      name: charizard.name,
      type: 'NA',
    };

    let post = spyOn(pokemonServiceSpy, 'post').and.returnValue(of(charizard));
    let showCreateUpdatePokemonFn = spyOn(communicationServiceSpy, 'showCreateUpdatePokemon');//notify to hide creation panel
    let updatePokemonListFn = spyOn(communicationServiceSpy, 'updatePokemonList');//notify to update table

    service.createPokemon(charizard);

    expect(post).toHaveBeenCalledWith(charizardDTO);
    expect(showCreateUpdatePokemonFn).toHaveBeenCalledWith({show: false});//hide creation panel
    expect(updatePokemonListFn).toHaveBeenCalled();//just called to update table
  });

  it('Should call put function from pokemon service at time to update a pokemon', () => {
    let charizard = getPokemon('Charizard');
    charizard.id = 6;
    let charizardDTO:PokemonDTO = {
      attack: charizard.attack,
      defense: charizard.defense,
      hp: DEFAULT_VALUES.hp,
      image: charizard.image,
      idAuthor: USER_DATA.idAuthor,
      name: charizard.name,
      type: DEFAULT_VALUES.type,
    };

    let put = spyOn(pokemonServiceSpy, 'put').and.returnValue(of(charizard));
    let showCreateUpdatePokemonFn = spyOn(communicationServiceSpy, 'showCreateUpdatePokemon');//notify to hide creation panel
    let updatePokemonListFn = spyOn(communicationServiceSpy, 'updatePokemonList');//notify to update table

    service.updatePokemon(charizard);

    expect(put).toHaveBeenCalledWith(charizardDTO, charizard.id);
    expect(showCreateUpdatePokemonFn).toHaveBeenCalledWith({show: false});//hide creation panel
    expect(updatePokemonListFn).toHaveBeenCalled();//just called to update table
  });

  it('Should call delete function from pokemon service at time to remove a pokemon', () => {
    let charizard = getPokemon('Charizard');
    charizard.id = 6;

    let deleteFn = spyOn(pokemonServiceSpy, 'delete').and.returnValue(of(void 1));
    let showCreateUpdatePokemonFn = spyOn(communicationServiceSpy, 'showCreateUpdatePokemon');//notify to hide creation panel
    let updatePokemonListFn = spyOn(communicationServiceSpy, 'updatePokemonList');//notify to update table

    service.removePokemon(charizard.id);

    expect(deleteFn).toHaveBeenCalledWith(charizard.id);
    expect(showCreateUpdatePokemonFn).toHaveBeenCalledWith({show: false});//hide creation panel
    expect(updatePokemonListFn).toHaveBeenCalled();//just called to update table
  });
});
