import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { getPokemon } from 'src/app/testing/helpers/utl';
import { CommunicationService } from '../../services/communication.service';
import { PokemonRepositoryService } from '../../services/pokemon-repository.service';

import { CreateUpdateCardComponent } from './create-update-card.component';

describe('CreateUpdateCardComponent', () => {
  let component: CreateUpdateCardComponent;
  let fixture: ComponentFixture<CreateUpdateCardComponent>;
  let communicationServiceSpy: jasmine.SpyObj<CommunicationService>;
  let pokemonRepositoryServiceSpy: jasmine.SpyObj<PokemonRepositoryService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientModule, HttpClientTestingModule ],
      declarations: [ CreateUpdateCardComponent ],
      providers: [ 
        FormBuilder,
        { provide: CommunicationService, useSpy: jasmine.createSpyObj('CommunicationService', ['showCreateUpdatePokemon', 'updatePokemonList']) },
        { provide: PokemonRepositoryService, useSpy: jasmine.createSpyObj('PokemonRepositoryService', ['createPokemon', 'updatePokemon']) },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUpdateCardComponent);
    communicationServiceSpy = TestBed.inject(CommunicationService) as jasmine.SpyObj<CommunicationService>;
    pokemonRepositoryServiceSpy = TestBed.inject(PokemonRepositoryService) as jasmine.SpyObj<PokemonRepositoryService>;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  it("Shouldn't create a new Pokemon (UNIT TEST)", async () => {
    let showCreateUpdatePokemonFn = spyOn(communicationServiceSpy, 'showCreateUpdatePokemon');
    let updatePokemonListFn = spyOn(communicationServiceSpy, 'updatePokemonList');
    let updatePokemonFn = spyOn(pokemonRepositoryServiceSpy, 'updatePokemon');
    let createPokemonFn = spyOn(pokemonRepositoryServiceSpy, 'createPokemon');

    await component.onSubmit();

    expect(showCreateUpdatePokemonFn).toHaveBeenCalledTimes(0);
    expect(updatePokemonListFn).toHaveBeenCalledTimes(0);
    expect(updatePokemonFn).toHaveBeenCalledTimes(0);
    expect(createPokemonFn).toHaveBeenCalledTimes(0);
  });

  it("Shouldn't create a new Pokemon (INTEGRATION TEST)", fakeAsync(() => {
    let showCreateUpdatePokemonFn = spyOn(communicationServiceSpy, 'showCreateUpdatePokemon');
    let updatePokemonListFn = spyOn(communicationServiceSpy, 'updatePokemonList');
    let updatePokemonFn = spyOn(pokemonRepositoryServiceSpy, 'updatePokemon');
    let createPokemonFn = spyOn(pokemonRepositoryServiceSpy, 'createPokemon');

    fixture.detectChanges();
    const btnCreate:HTMLElement = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
    btnCreate.click();
    fixture.detectChanges();

    expect(showCreateUpdatePokemonFn).toHaveBeenCalledTimes(0);
    expect(updatePokemonListFn).toHaveBeenCalledTimes(0);
    expect(updatePokemonFn).toHaveBeenCalledTimes(0);
    expect(createPokemonFn).toHaveBeenCalledTimes(0);
    expect(btnCreate.getAttribute('disabled')).toBeDefined();
  }));

  it('Should create a Pokemon (UNIT TEST)', async () => {
    let rattata = getPokemon('Rattata');
    let showCreateUpdatePokemonFn = spyOn(communicationServiceSpy, 'showCreateUpdatePokemon');
    let updatePokemonListFn = spyOn(communicationServiceSpy, 'updatePokemonList');
    let updatePokemonFn = spyOn(pokemonRepositoryServiceSpy, 'updatePokemon');
    let createPokemonFn = spyOn(pokemonRepositoryServiceSpy, 'createPokemon').and.returnValue(Promise.resolve(rattata));

    component.pokemonForm.controls['name'].patchValue(rattata.name);
    component.pokemonForm.controls['image'].patchValue(rattata.image);
    component.pokemonForm.controls['attack'].patchValue(rattata.attack);
    component.pokemonForm.controls['defense'].patchValue(rattata.defense);

    await component.onSubmit();

    expect(showCreateUpdatePokemonFn).toHaveBeenCalled();
    expect(updatePokemonListFn).toHaveBeenCalled();
    expect(createPokemonFn).toHaveBeenCalledWith(rattata);
    expect(updatePokemonFn).not.toHaveBeenCalled();
  });

  it('Should update a Pokemon (UNIT TEST)', async () => {
    let rattata = getPokemon('Rattata');
    let showCreateUpdatePokemonFn = spyOn(communicationServiceSpy, 'showCreateUpdatePokemon');
    let updatePokemonListFn = spyOn(communicationServiceSpy, 'updatePokemonList');
    let updatePokemonFn = spyOn(pokemonRepositoryServiceSpy, 'updatePokemon').and.returnValue(Promise.resolve(rattata));
    let createPokemonFn = spyOn(pokemonRepositoryServiceSpy, 'createPokemon');

    component.pokemon = rattata;
    component.pokemonForm.controls['name'].patchValue(rattata.name);
    component.pokemonForm.controls['image'].patchValue(rattata.image);
    component.pokemonForm.controls['attack'].patchValue(rattata.attack);
    component.pokemonForm.controls['defense'].patchValue(rattata.defense);

    await component.onSubmit();

    expect(showCreateUpdatePokemonFn).toHaveBeenCalled();
    expect(updatePokemonListFn).toHaveBeenCalled();
    expect(updatePokemonFn).toHaveBeenCalled();
    expect(createPokemonFn).not.toHaveBeenCalled();
  });
});
