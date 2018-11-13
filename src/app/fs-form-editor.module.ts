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

import {  FormEditorComponent,
  FieldTextComponent,
  FieldHeaderComponent,
  FormToolbarComponent,
  FieldOptionsComponent} from './components';


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
