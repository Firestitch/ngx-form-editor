import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FsExampleModule } from '@firestitch/example';
import { FsMessageModule } from '@firestitch/message';
import { FsFieldEditorModule } from '@firestitch/field-editor';
import { FsPhoneModule } from '@firestitch/phone';

import { ToastrModule } from 'ngx-toastr';

import { AppMaterialModule } from './material.module';
import {
  DialogExampleComponent,
  ExampleComponent,
  ExamplesComponent,
  FieldRenderComponent,
  FieldViewComponent
} from './components';
import { AppComponent } from './app.component';
import { FsFormModule } from '@firestitch/form';


const routes: Routes = [
  { path: '', component: ExamplesComponent },
];

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    FsFieldEditorModule.forRoot(),
    BrowserAnimationsModule,
    AppMaterialModule,
    FormsModule,
    FsFormModule,
    RouterModule.forRoot(routes),
    FsExampleModule.forRoot(),
    FsPhoneModule.forRoot(),
    FsMessageModule.forRoot(),
    ToastrModule.forRoot({ preventDuplicates: true }),
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
  ]
})
export class PlaygroundModule {
}
