import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  timeout(seconds:number, action:() => void) {
    setTimeout(action, seconds * 1000);
  }

}
