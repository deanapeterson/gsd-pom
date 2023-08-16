import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable, Subject, interval, timer } from 'rxjs';
import { takeWhile, takeUntil, filter } from 'rxjs/operators/';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'GTD-POM-ADD-Timer';
  selectedPreset: [] | null = null;
  width = 300;
  constructor(private titleService: Title) {
    this.setTitle();
  }
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
      .subscribe(
        (count) => {
          this.secElapsed = this.secElapsed + 1;
          this.updateWidth();
          this.updateRemaining();
        },
        () => {},
        () => this.onComplete()
      );
  }
  setTitle(content = '') {
    if (content) {
      content = content + ' | ';
    }
    this.titleService.setTitle(`${content}${this.title}`);
  }

  // https://devdocs.io/dom/notification
  notify() {
    // Let's check if the browser supports notifications
    if (!('Notification' in window)) {
      alert('This browser does not support desktop notification');
    }

    // Let's check whether notification permissions have already been granted
    else if (Notification.permission === 'granted') {
      // If it's okay let's create a notification
      var notification = new Notification('Hi there!');
    }

    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(function (permission) {
        // If the user accepts, let's create a notification
        if (permission === 'granted') {
          var notification = new Notification('Times UP!!!!');
        }
      });
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

    this.setTitle(`${minRemaining}:${secRemaining}`);
    if (secRemaining.length === 1) {
      secRemaining = '0' + secRemaining;
    }

    this.remaining = `${minRemaining}:${secRemaining}`;
  }
}
