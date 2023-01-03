import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTE_NAMES } from './core/constants/route-names';
import { TimerService } from './core/services/timer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'mypokeapp';

  constructor(
    private _timerService: TimerService,
    private _route: Router,
  ) { }

  ngOnInit(): void {
    this._timerService.timeout(3, () => this._route.navigate([ROUTE_NAMES.POKEMONS]));
  }
}
