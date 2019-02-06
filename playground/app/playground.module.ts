import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FsExampleModule } from '@firestitch/example';

import { FsFieldEditorModule } from 'fs-package';

import { AppMaterialModule } from './material.module';
import {
ExampleComponent,
ExamplesComponent,
FieldRenderComponent,
FieldViewComponent,
DialogExampleComponent } from './components';
import { AppComponent } from './app.component';


const routes: Routes = [
  { path: '', component: ExamplesComponent },
];

@NgModule({
  bootstrap: [ AppComponent ],
  imports: [
    BrowserModule,
    FsFieldEditorModule.forRoot(),
    BrowserAnimationsModule,
    AppMaterialModule,
    FormsModule,
    FsExampleModule,
    RouterModule.forRoot(routes),
  ],
  entryComponents: [
    DialogExampleComponent
  ],
  declarations: [
    AppComponent,
    ExamplesComponent,
    ExampleComponent,
    DialogExampleComponent,
    FieldRenderComponent,
    FieldViewComponent
  ],
  providers: [
  ],
})
export class PlaygroundModule {
}
