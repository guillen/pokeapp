import { Component, OnInit } from '@angular/core';
import { ROUTE_NAMES } from 'src/app/core/constants/route-names';
import { RoutingService } from 'src/app/core/services/routing.service';
import { TimerService } from 'src/app/core/services/timer.service';

@Component({
  selector: 'app-home-title',
  templateUrl: './home-title.component.html',
  styleUrls: ['./home-title.component.css']
})
export class HomeTitleComponent implements OnInit {

  constructor(
    private _timerService: TimerService,
    private _routingService: RoutingService,
  ) { }

  ngOnInit(): void {
    this._timerService.timeout(3, () => this._routingService.navigateByRoute(ROUTE_NAMES.POKEMONS));
  }

}
