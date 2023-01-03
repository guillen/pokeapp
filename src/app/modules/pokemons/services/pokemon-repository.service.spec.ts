import { TestBed } from '@angular/core/testing';

import { PokemonRepositoryService } from './pokemon-repository.service';

describe('PokemonRepositoryService', () => {
  let service: PokemonRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokemonRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
