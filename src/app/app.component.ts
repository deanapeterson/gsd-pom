import { Component } from '@angular/core';
import { interval, timer} from 'rxjs';
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent  {
  lenInMin = 1;
  lenInSeconds = 0;
  countdown = 0;
  width = '0%';
  timer$;
  start () {
    this.lenInSeconds = this.lenInMin * 60;
    this.timer$ = timer(0, 1000)
      .subscribe((count)=>{
        this.countdown = count;
        this.updateWidth();
      })
  }
  updateWidth() {
    const percentInt = Math.round((this.countdown / this.lenInSeconds) * 100);
    this.width = percentInt.toString() + '%';
    // this.width = Math.round( * 100 )  * .1;
  }
}
