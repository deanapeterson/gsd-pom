import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MaterialModule } from '../material-module';

import { NotesComponent } from './notes.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule, MaterialModule, FlexLayoutModule ],
  declarations: [ AppComponent, NotesComponent ],
  providers: [ Title ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
