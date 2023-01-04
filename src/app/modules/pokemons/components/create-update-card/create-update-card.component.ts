import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from '../../models/pokemon';
import { CommunicationService } from '../../services/communication.service';

@Component({
  selector: 'app-create-update-card',
  templateUrl: './create-update-card.component.html',
  styleUrls: ['./create-update-card.component.css']
})
export class CreateUpdateCardComponent implements OnInit {
  @Input() pokemon?:Pokemon;

  constructor(
    private communicationService:CommunicationService,
  ) { }

  ngOnInit(): void {
  }

  hideCard() {
    this.communicationService.showCreateUpdatePokemon({show: false});
  }
}
