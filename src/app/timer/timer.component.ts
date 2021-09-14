import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subject, timer } from 'rxjs';
import { filter, takeUntil, takeWhile } from 'rxjs/operators';

const presets = [
  [1, '1'],
  [2, '2'],
  [5, '5'],
  [10, '10'],
  [15, '15'],
  [20, '20'],
  [22, '22'],
  [25, '25'],
  [30, '30']
];

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {
  timer$;
  notes = '';
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
  presets = presets;
  selectedPreset: [] | null = null;

  @Output() isCompleted = new EventEmitter();
  @Output() isPaused = new EventEmitter();
  @Output() isCanceled = new EventEmitter();

  @Output() statusUpdate = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  start(preset) {
    this.reset();
    this.selectedPreset = preset;
    this.lenInSeconds = parseFloat(preset[0]) * 60;
    this.completed = false;
    this.running = true;
    this.timer$ = timer(0, 1000)
      .pipe(
        filter(() => !this.paused),
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



  onComplete() {
    this.completed = true;
    this.running = false;

    this.isCompleted.emit(true);
  }
  reset(completed = false) {
    this.lenInSeconds = 0;
    this.secElapsed = 0;
    this.percentComplete = 0;
    this.remaining = '0:00';
    this.width = '0%';
    this.completed = false;
    this.reset$.next();
    if (completed) {
      this.completed = true;
    }
  }

  updateWidth() {
    this.percentComplete = Math.round(
      (this.secElapsed / this.lenInSeconds) * 100
    );
    this.width = this.percentComplete.toString() + '%';
  }

  private updateRemaining() {
    const totalSecRemaining = this.lenInSeconds - this.secElapsed;

    if (totalSecRemaining < 0) {
      return '0:00';
    }

    const minRemaining = Math.floor(totalSecRemaining / 60).toString();
    let secRemaining = (totalSecRemaining % 60).toString();


    this.statusUpdate.emit(`${minRemaining}:${secRemaining}`);

    if (secRemaining.length === 1) {
      secRemaining = '0' + secRemaining;
    }

    this.remaining = `${minRemaining}:${secRemaining}`;
  }
}
