import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';

import { CreateUpdateCardComponent } from './create-update-card.component';

describe('CreateUpdateCardComponent', () => {
  let component: CreateUpdateCardComponent;
  let fixture: ComponentFixture<CreateUpdateCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientModule, HttpClientTestingModule ],
      declarations: [ CreateUpdateCardComponent ],
      providers: [ FormBuilder ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUpdateCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
