import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CommunicationService } from '../../services/communication.service';

import { SearchInputComponent } from './search-input.component';

describe('SearchInputComponent', () => {
  let component: SearchInputComponent;
  let fixture: ComponentFixture<SearchInputComponent>;
  let communicationServiceSpy: jasmine.SpyObj<CommunicationService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchInputComponent ],
      providers: [
        {provide: CommunicationService, useSpy: jasmine.createSpyObj('CommunicationService', ['searchInTable'])}
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchInputComponent);
    communicationServiceSpy = TestBed.inject(CommunicationService) as jasmine.SpyObj<CommunicationService>;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should notify at time to type in input text (UNIT TEST)', () => {
    let value = 'XYZ';
    let searchInTableFn = spyOn(communicationServiceSpy, 'searchInTable');

    component.search({value});

    expect(searchInTableFn).toHaveBeenCalledWith(value);
  })

  it('Should notify at time to type in input text (INTEGRATION TEST)', () => {
    let value = 'XYZ';
    let searchInTableFn = spyOn(communicationServiceSpy, 'searchInTable');

    const btn:DebugElement = fixture.debugElement.query(By.css("#search-btn"));
    btn.nativeElement.value = value;
    btn.triggerEventHandler('keyup');
    fixture.detectChanges();

    expect(searchInTableFn).toHaveBeenCalledWith(value);
  })
});
