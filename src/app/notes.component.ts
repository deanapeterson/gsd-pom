import { Component } from '@angular/core';


const template = `
<textarea [(ngModel)]="note"></textarea>
<br>
<button (click)="updateStore()">Update</button>
`;
const styles = [`
  textarea {
    width:99%;
    min-height:100px;
  }
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
    this.note = this.store.getItem(this.storageToken) || '';
  }
  public updateStore() {
    this.store.setItem(this.storageToken, this.note);
  }
}