import { Component } from '@angular/core';
import { interval, timer } from 'rxjs';
import { takeWhile } from 'rxjs/operators/';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  lenInMin = .33;
  lenInSeconds = 0;
  countdown = 0; // seconds
  percentComplete = 0;
  remaining = 0;
  width = '0%';
  completed = false;
  timer$;
  setLength(lenInMinutes){

  }
  start() {
    this.lenInSeconds = this.lenInMin * 60;
    this.timer$ = timer(0, 1000)
      .pipe(
        takeWhile(() => {
          return this.percentComplete <= 100;
        })
      )
      .subscribe((count) => {
        this.countdown = count;
        this.updateWidth();
        this.updateRemaining();
      }, () => this.onError(), () => this.onComplete());
  }
  reset() {
    this.lenInSeconds = 0;
    this.countdown = 0;
    this.percentComplete = 0;
    this.width = '0%';
    this.completed = false;
  }
  onError() { }
  onComplete() {
    this.completed = true;
  }
  updateWidth() {
    this.percentComplete = Math.round((this.countdown / this.lenInSeconds) * 100);
    this.width = this.percentComplete.toString() + '%';

    // this.width = Math.round( * 100 )  * .1;
  }
  updateRemaining() {
    const result = (this.lenInSeconds - this.countdown);
    this.remaining = result >= 0 ? result : 0;
  }
}
