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
  FieldViewComponent,
  SectionsComponent,
} from './components';
import { AppComponent } from './app.component';
import { FsFormModule } from '@firestitch/form';
import { FsApiModule } from '@firestitch/api';
import { FsFileModule } from '@firestitch/file';
import { FsLabelModule } from '@firestitch/label';
import { FsUploadModule } from '@firestitch/upload';
import { FsDatePickerModule } from '@firestitch/datepicker';
import { DragulaModule } from 'ng2-dragula';
import { FsGalleryModule } from '@firestitch/gallery';
import { FsSignatureModule } from '@firestitch/signature';
import { FsSelectionModule } from '@firestitch/selection';
import { FsListModule } from '@firestitch/list';
import { FsHtmlEditorModule } from '@firestitch/html-editor';
import { TermsFieldModule } from './modules/terms-field';
import { LAZY_MAPS_API_CONFIG } from '@agm/core';
import { GOOGLE_MAP_KEY } from '@firestitch/address';
import { GoogleMapConfig } from './google-map.config';


const routes: Routes = [
  { path: '', component: ExamplesComponent },
];

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    FsFieldEditorModule.forRoot({ case: 'camel' }),
    FsHtmlEditorModule.forRoot(),
    BrowserAnimationsModule,
    AppMaterialModule,
    FormsModule,
    FsFormModule,
    FsLabelModule,
    RouterModule.forRoot(routes),
    FsExampleModule.forRoot(),
    FsPhoneModule.forRoot(),
    FsDatePickerModule.forRoot(),
    FsMessageModule.forRoot(),
    FsFileModule.forRoot(),
    FsApiModule,
    DragulaModule.forRoot(),
    FsGalleryModule.forRoot(),
    FsUploadModule.forRoot(),
    ToastrModule.forRoot({ preventDuplicates: true }),
    FsSignatureModule,
    FsSelectionModule.forRoot(),
    FsListModule.forRoot(),
    TermsFieldModule,
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
    FieldViewComponent,
    SectionsComponent,
  ],
  providers: [
    {
      provide: LAZY_MAPS_API_CONFIG,
      useClass: GoogleMapConfig,
    },
    { provide: GOOGLE_MAP_KEY, useValue: '' },
  ],
})
export class PlaygroundModule {
}
