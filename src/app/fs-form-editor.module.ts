import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DragDropModule } from '@angular/cdk/drag-drop';

import { FsCommonModule } from '@firestitch/common';
import { FsPromptModule } from '@firestitch/prompt';

import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatTooltipModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
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

import { FlexLayoutModule, FlexModule } from '@angular/flex-layout';

import { FormEditorComponent } from './components/form-editor/form-editor.component';
import { FieldTextComponent } from './components/field-text/field-text.component';
import { FieldHeaderComponent } from './components/field-header/field-header.component';
import { FormToolbarComponent } from './components/form-toolbar/form-toolbar.component';
import { FieldOptionsComponent } from './components/field-options/field-options.component';
import { FieldNameComponent } from './components/field-name/field-name.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatDividerModule,
    MatInputModule,
    MatIconModule,
    MatMenuModule,
    MatCheckboxModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    FlexLayoutModule,
    MatTooltipModule,
    FormsModule,
    DragDropModule,
    FsCommonModule,
    FsPromptModule.forRoot(),
  ],
  exports: [
    FormEditorComponent
  ],
  entryComponents: [
  ],
  declarations: [
    FormEditorComponent,
    FieldOptionsComponent,
    FormToolbarComponent,
    FieldHeaderComponent,
    FieldTextComponent,
    FieldNameComponent
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
