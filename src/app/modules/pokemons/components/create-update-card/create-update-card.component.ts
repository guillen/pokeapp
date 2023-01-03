import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-update-card',
  templateUrl: './create-update-card.component.html',
  styleUrls: ['./create-update-card.component.css']
})
export class CreateUpdateCardComponent implements OnInit {
  actionName:string = 'Nuevo';

  constructor() { }

  ngOnInit(): void {
  }

}
