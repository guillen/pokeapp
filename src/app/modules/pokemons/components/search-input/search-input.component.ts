import { Component } from '@angular/core';
import { CommunicationService } from '../../services/communication.service';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.css']
})
export class SearchInputComponent {

  constructor(
    private _communicationService:CommunicationService,
  ) { }

  search(event:any) {
    this._communicationService.searchInTable(event.value);
  }

}
