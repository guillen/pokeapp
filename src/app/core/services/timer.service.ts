import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  timeout(seconds:number, action:() => void) {
    setTimeout(action, seconds * 1000);
  }

}
