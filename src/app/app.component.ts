import { Component } from '@angular/core';
import { Subject, interval, timer } from 'rxjs';
import { takeWhile, takeUntil } from 'rxjs/operators/';

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
  remaining = '0:00';
  width = '0%';
  completed = false;
  timer$;
  reset$ = new Subject();

  start() {
    this.lenInSeconds = this.lenInMin * 60;
    this.completed = false;
    this.timer$ = timer(0, 1000)
      .pipe(
        takeUntil(this.reset$),
        takeWhile(() => {
          return this.percentComplete <= 100;
        })
      )
      .subscribe((count) => {
        this.countdown = count;
        this.updateWidth();
        this.updateRemaining();
      }, () => {}, () => this.onComplete());
  }
  reset() {
    this.lenInSeconds = 0;
    this.countdown = 0;
    this.percentComplete = 0;
    this.remaining = '0:00';
    this.width = '0%';
    this.reset$.next();
  }

  onComplete() {
    this.completed = true;
    this.reset();
  }
  updateWidth() {
    this.percentComplete = Math.round((this.countdown / this.lenInSeconds) * 100);
    this.width = this.percentComplete.toString() + '%';
  }

  private updateRemaining() {
    const totalSecRemaining = (this.lenInSeconds - this.countdown);

    if( totalSecRemaining < 0 ){
      return '0:00';
    }

    const minRemaining = (Math.floor(totalSecRemaining / 60)).toString(); 
    let secRemaining = (totalSecRemaining % 60).toString();

    if(secRemaining.length === 1) {
      secRemaining = '0' + secRemaining;
    }


    this.remaining = `${minRemaining}:${secRemaining}`;
  }
}
