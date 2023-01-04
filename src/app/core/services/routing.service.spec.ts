import { TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from 'src/app/app-routing.module';
import { ROUTE_NAMES } from '../constants/route-names';

import { RoutingService } from './routing.service';

describe('RoutingService', () => {
  let service: RoutingService;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule.withRoutes(routes) ],
      providers: [
        {provide: Router, useValue: jasmine.createSpyObj('Router', ['navigate'])}
      ]
    });
    service = TestBed.inject(RoutingService);
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('Should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should call navigate function', () => {    
    service.navigateByRoute(ROUTE_NAMES.POKEMONS);
    const spy = router.navigate as jasmine.Spy;

    expect(spy).toHaveBeenCalled();
  });
});
