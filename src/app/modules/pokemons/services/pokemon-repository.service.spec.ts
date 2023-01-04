import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { PokemonRepositoryService } from './pokemon-repository.service';
import { PokemonService } from './pokemon.service';

describe('PokemonRepositoryService', () => {
  let service: PokemonRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule, HttpClientTestingModule ],
      providers: [
        {provide: PokemonService, useSpy: jasmine.createSpyObj('PokemonService', ['get', 'post', 'put', 'delete'])}
      ],
    });
    service = TestBed.inject(PokemonRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
