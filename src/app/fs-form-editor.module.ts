import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {  FormEditorComponent,
        FieldTextComponent,
        FieldHeaderComponent,
        FieldOptionsComponent} from './components';



import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule
} from '@angular/material';

import { DragulaModule } from 'ng2-dragula';

import { FlexLayoutModule, FlexModule } from '@angular/flex-layout';


@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatMenuModule,
    MatCheckboxModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    FlexLayoutModule,
    FormsModule,
    DragulaModule.forRoot()
  ],
  exports: [
    FormEditorComponent
  ],
  entryComponents: [
  ],
  declarations: [
    FormEditorComponent,
    FieldOptionsComponent,
    FieldHeaderComponent,
    FieldTextComponent
  ],
  providers: [
    // FsComponentService,
  ],
})
export class FsFormEditorModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FsFormEditorModule,
      // providers: [FsComponentService]
    };
  }
}
