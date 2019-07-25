import { Component } from '@angular/core';


const template = `
<textarea (change)="updateStore()" ([ngModel])="note"></textarea>

`;
const styles = [`
  app-notes{}
`];
@Component({
  selector: 'app-notes',
  template,
  styles
})
export class NotesComponent {
  public note = '';
  private store: Storage;
  private storageToken = 'gsd-pom';
  constructor() {
    this.store = window.localStorage;
    this.note = this.store.getItem(this.storageToken);
  }
  updateStore() {
    this.store.setItem(this.storageToken, this.note);
  }
}