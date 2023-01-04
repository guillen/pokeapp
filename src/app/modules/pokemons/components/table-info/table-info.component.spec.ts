import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchPipe } from 'src/app/core/pipes/search.pipe';
import { CommunicationService } from '../../services/communication.service';
import { PokemonRepositoryService } from '../../services/pokemon-repository.service';

import { TableInfoComponent } from './table-info.component';

describe('TableInfoComponent', () => {
  let component: TableInfoComponent;
  let fixture: ComponentFixture<TableInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableInfoComponent, SearchPipe ],
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [
        {provide: PokemonRepositoryService, useSpy: jasmine.createSpyObj('PokemonRepositoryService', ['getTableData', 'removePokemon'])},
        {provide: CommunicationService, useSpy: jasmine.createSpyObj('CommunicationService', ['showCreateUpdatePokemon', 'updatePokemonListObservable', 'searchInTableObservable'])}
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
