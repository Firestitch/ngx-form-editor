import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DragDropModule } from '@angular/cdk/drag-drop';

import { FsCommonModule } from '@firestitch/common';
import { FsPromptModule } from '@firestitch/prompt';
import { FsFormModule } from '@firestitch/form';
import { FsDatePickerModule } from '@firestitch/datepicker';
import { FsPhoneModule } from '@firestitch/phone';
import { FsFileModule } from '@firestitch/file';

import {
  MatButtonModule,
  MatTooltipModule,
  MatCardModule,
  MatCheckboxModule,
  MatDividerModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatRadioModule,
  MatSelectModule
} from '@angular/material';

import { FlexLayoutModule } from '@angular/flex-layout';

import { FieldEditorComponent } from './components/field-editor/field-editor.component';
import { FieldTextComponent } from './components/field-text/field-text.component';
import { FieldHeaderComponent } from './components/field-header/field-header.component';
import { FieldToolbarComponent } from './components/field-toolbar/field-toolbar.component';
import { FieldOptionsComponent } from './components/field-options/field-options.component';
import { FieldNameComponent } from './components/field-name/field-name.component';
import { FieldFileComponent } from './components/field-file/field-file.component';
import { FieldComponent } from './components/field/field.component';
import { FieldRendererComponent } from './components/field-renderer/field-renderer.component';
import { StickyModule } from 'ng2-sticky-kit';

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
    FsFormModule,
    FsDatePickerModule,
    FsPhoneModule,
    FsFileModule.forRoot({
      dragoverMessage: false
    })
  ],
  exports: [
    FieldEditorComponent,
    FieldRendererComponent
  ],
  entryComponents: [
  ],
  declarations: [
    FieldEditorComponent,
    FieldRendererComponent,
    FieldOptionsComponent,
    FieldToolbarComponent,
    FieldHeaderComponent,
    FieldTextComponent,
    FieldNameComponent,
    FieldFileComponent,
    FieldComponent
  ]
})
export class FsFieldEditorModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FsFieldEditorModule
    };
  }
}
