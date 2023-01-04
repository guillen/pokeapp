import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { PokemonsComponent } from './pokemons.component';
import { CommunicationService } from './services/communication.service';

describe('PokemonsComponent', () => {
  let component: PokemonsComponent;
  let fixture: ComponentFixture<PokemonsComponent>;
  let communicationServiceSpy: jasmine.SpyObj<CommunicationService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokemonsComponent ],
      providers: [
        { provide: CommunicationService, useSpy: jasmine.createSpyObj('CommunicationService', ['showCreateUpdatePokemon']) }
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonsComponent);
    communicationServiceSpy = TestBed.inject(CommunicationService) as jasmine.SpyObj<CommunicationService>;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should show create/update card (UNIT TEST)', () => {
    let showCreateUpdatePokemonFn = spyOn(communicationServiceSpy, 'showCreateUpdatePokemon');

    component.showCreateCard();

    expect(showCreateUpdatePokemonFn).toHaveBeenCalledWith({show: true});
  });

  it('Should show create/update card (INTEGRATION TEST)', () => {
    let showCreateUpdatePokemonFn = spyOn(communicationServiceSpy, 'showCreateUpdatePokemon');

    fixture.detectChanges();
    const btn:HTMLElement = fixture.debugElement.query(By.css('.btn-blue')).nativeElement;
    btn.click();
    fixture.detectChanges();

    expect(showCreateUpdatePokemonFn).toHaveBeenCalledWith({show: true});
  });
});
