import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { SearchPipe } from 'src/app/core/pipes/search.pipe';
import { getPokemon, getPokemons } from 'src/app/testing/helpers/utl';
import { CommunicationService } from '../../services/communication.service';
import { PokemonRepositoryService } from '../../services/pokemon-repository.service';

import { TableInfoComponent } from './table-info.component';

describe('TableInfoComponent', () => {
  let component: TableInfoComponent;
  let fixture: ComponentFixture<TableInfoComponent>;
  let pokemonRepositoryServiceSpy: jasmine.SpyObj<PokemonRepositoryService>;
  let communicationServiceSpy: jasmine.SpyObj<CommunicationService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableInfoComponent, SearchPipe ],
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [
        {provide: PokemonRepositoryService, useSpy: jasmine.createSpyObj('PokemonRepositoryService', ['getTableData', 'removePokemon'])},
        {provide: CommunicationService, useSpy: jasmine.createSpyObj('CommunicationService', ['showCreateUpdatePokemon', 'getUpdatePokemonListObservable', 'getSearchInTableObservable'])}
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableInfoComponent);
    pokemonRepositoryServiceSpy = TestBed.inject(PokemonRepositoryService) as jasmine.SpyObj<PokemonRepositoryService>;
    communicationServiceSpy = TestBed.inject(CommunicationService) as jasmine.SpyObj<CommunicationService>;
    component = fixture.componentInstance;
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should list pokemons in table (UNIT TEST)', () => {
    let pokemons = getPokemons();
    let getTableDataFn = spyOn(pokemonRepositoryServiceSpy, 'getTableData').and.returnValue(of(pokemons));

    component.loadTable();

    expect(getTableDataFn).toHaveBeenCalled();
    expect(component.pokemonList).toEqual(pokemons);
  });

  it('Should list pokemons in table (INTEGRATION TEST)', () => {
    let pokemons = getPokemons();
    let getTableDataFn = spyOn(pokemonRepositoryServiceSpy, 'getTableData').and.returnValue(of(pokemons));

    fixture.detectChanges();
    const tableBody = fixture.debugElement.queryAll(By.css(".table>tbody>tr"));

    expect(getTableDataFn).toHaveBeenCalled();
    expect(component.pokemonList).toEqual(pokemons);
    expect(tableBody.length).toEqual(pokemons.length);
    expect((tableBody[0].query(By.css('.pokemon-name-table')).nativeElement as HTMLElement).innerHTML).toEqual(pokemons[0].name);
    expect((tableBody[1].query(By.css('.pokemon-name-table')).nativeElement as HTMLElement).innerHTML).toEqual(pokemons[1].name);
    expect((tableBody[2].query(By.css('.pokemon-name-table')).nativeElement as HTMLElement).innerHTML).toEqual(pokemons[2].name);
  });

  it('Should remove a pokemon (UNIT TEST)', async () => {
    let pokemons = getPokemons();
    pokemons[0].id = 11;
    let removePokemonFn = spyOn(pokemonRepositoryServiceSpy, 'removePokemon').and.returnValue(Promise.resolve());
    let showCreateUpdatePokemonSpy = spyOn(communicationServiceSpy, 'showCreateUpdatePokemon');
    let getTableDataFn = spyOn(pokemonRepositoryServiceSpy, 'getTableData').and.returnValue(of(pokemons));

    await component.removePokemon(pokemons[0]);

    expect(removePokemonFn).toHaveBeenCalledWith(11);//remove pokemon
    expect(showCreateUpdatePokemonSpy).toHaveBeenCalledWith({show: false});//notify to hide creation panel 
    expect(getTableDataFn).toHaveBeenCalled();//get pokemons updated
  });

  it('Should remove a pokemon (INTEGRATION TEST)', fakeAsync(() => {
    let pokemons = getPokemons();
    pokemons[0].id = 11;
    let removePokemonFn = spyOn(pokemonRepositoryServiceSpy, 'removePokemon').and.returnValue(Promise.resolve());
    let showCreateUpdatePokemonSpy = spyOn(communicationServiceSpy, 'showCreateUpdatePokemon');
    let getTableDataFn = spyOn(pokemonRepositoryServiceSpy, 'getTableData').and.returnValue(of(pokemons));

    fixture.detectChanges();

    const removeBtn:HTMLElement = fixture.debugElement.queryAll(By.css('.delete-btn'))[0].nativeElement;
    removeBtn.click();
    tick();
    fixture.detectChanges();

    expect(removePokemonFn).toHaveBeenCalledWith(11);//remove pokemon
    expect(showCreateUpdatePokemonSpy).toHaveBeenCalledWith({show: false});//notify to hide creation panel 
    expect(getTableDataFn).toHaveBeenCalledTimes(2);//get pokemons updated
  }));

  it('Should notify to edit a pokemon (UNIT TEST)', () => {
    const charizard = getPokemon('Charizard');
    let showCreateUpdatePokemonSpy = spyOn(communicationServiceSpy, 'showCreateUpdatePokemon');

    component.showEditCard(charizard);

    expect(showCreateUpdatePokemonSpy).toHaveBeenCalledWith({show: true, pokemon: charizard});//notify to show creation panel 
  });

  it('Should notify to edit a pokemon (INTEGRATION TEST)', () => {
    const pokemons = getPokemons();
    let showCreateUpdatePokemonSpy = spyOn(communicationServiceSpy, 'showCreateUpdatePokemon');
    spyOn(pokemonRepositoryServiceSpy, 'getTableData').and.returnValue(of(pokemons));

    fixture.detectChanges();

    let btnEdit:HTMLElement = fixture.debugElement.queryAll(By.css('.edit-btn'))[0].nativeElement;
    btnEdit.click();

    expect(showCreateUpdatePokemonSpy).toHaveBeenCalledWith({show: true, pokemon: pokemons[0]});//notify to show creation panel 
  });
});
