import { Component } from '@angular/core';
import { Observable, Subject, interval, timer } from 'rxjs';
import { takeWhile, takeUntil, filter } from 'rxjs/operators/';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  timer$;
  reset$ = new Subject();
  completed$ = new Subject();
  lenInMin = '.25';
  lenInSeconds = 0;
  secElapsed = 0; // seconds
  percentComplete = 0;
  remaining = '0:00';
  width = '0%';
  completed = false;
  running = false;
  paused = false;

  start() {
    this.reset();
    this.lenInSeconds = parseFloat(this.lenInMin) * 60;
    this.completed = false;
    this.running = true;
    this.timer$ = timer(0, 1000)
      .pipe(
        filter(()=> !this.paused),
        takeUntil(this.reset$),
        takeWhile(() => {
          return this.percentComplete <= 100;
        })
      )
      .subscribe((count) => {
        this.secElapsed = this.secElapsed + 1;
        this.updateWidth();
        this.updateRemaining();
      }, () => { }, () => this.onComplete());





  }
  reset(completed = false) {
    this.lenInSeconds = 0;
    this.secElapsed = 0;
    this.percentComplete = 0;
    this.remaining = '0:00';
    this.width = '0%';

    this.reset$.next();
    if (completed) {
      this.completed = true;
    }
  }

  onComplete() {
    this.completed = true;
    this.running = false;
  }
  updateWidth() {
    this.percentComplete = Math.round((this.secElapsed / this.lenInSeconds) * 100);
    this.width = this.percentComplete.toString() + '%';
  }

  private updateRemaining() {
    const totalSecRemaining = (this.lenInSeconds - this.secElapsed);

    if (totalSecRemaining < 0) {
      return '0:00';
    }

    const minRemaining = (Math.floor(totalSecRemaining / 60)).toString();
    let secRemaining = (totalSecRemaining % 60).toString();

    if (secRemaining.length === 1) {
      secRemaining = '0' + secRemaining;
    }

    this.remaining = `${minRemaining}:${secRemaining}`;
  }
}
