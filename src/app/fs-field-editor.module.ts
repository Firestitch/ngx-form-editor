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
import { FsEditorRichTextModule, FsEditorRendererModule } from '@firestitch/editor';
import { FsLabelModule } from '@firestitch/label';
import { FsDateModule } from '@firestitch/date';

import { FS_FIELD_EDITOR_CONFIG } from './fs-field-editor.providers';
import { FS_FIELD_EDITOR_ORIGINAL_CONFIG } from './fs-field-editor-original.providers';

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
import { FieldViewerComponent } from './components/field-viewer/field-viewer.component';
import { FieldRichTextComponent } from './components/field-rich-text/field-rich-text.component';
import { FieldCustomEditDirective } from './directives/field-custom-edit/field-custom-edit.directive';
import { FieldCustomRenderDirective } from './directives/field-custom-render/field-custom-render.directive';
import { FieldEditorConfig, FieldType } from './interfaces';
import { FieldCoreComponent } from './components/field-core/field-core.component';
import { FieldRenderComponent } from './components/field-render/field-render.component';
import { FieldViewComponent } from './components/field-view/field-view.component';

export function defaultConfigFactory(config) {
  return Object.assign(config,
    { fields: [],
      toolbar: {
        items: [
          { type: FieldType.ShortText },
          { type: FieldType.LongText },
          { type: FieldType.RichText, divide: true },
          { type: FieldType.Dropdown },
          { type: FieldType.Choice },
          { type: FieldType.Checkbox },
          { type: FieldType.Date },
          { type: FieldType.Time, divide: true },
          { type: FieldType.Name },
          { type: FieldType.Phone },
          { type: FieldType.Email, divide: true },
          { type: FieldType.File }
        ]
      }
  });
}

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
    FsPromptModule,
    FsFormModule,
    FsDatePickerModule,
    FsPhoneModule,
    FsLabelModule,
    FsDateModule,
    FsEditorRendererModule.forRoot(),
    FsEditorRichTextModule.forRoot({
      modules: {
        toolbar: [
          [{ header: [1, 2, 3, false] }],
          [
            'bold',
            'italic',
            'underline',
            'strike',
            'blockquote'
          ],
          [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
          ],
          [
            { align: [] }
          ],
          [
            'link',
          ]
        ]
      }
    }),
    FsFileModule.forRoot({
      dragoverMessage: false
    })
  ],
  exports: [
    FieldEditorComponent,
    FieldRendererComponent,
    FieldViewerComponent,
    FieldCustomEditDirective,
    FieldCustomRenderDirective,
    FieldRenderComponent,
    FieldViewComponent
  ],
  declarations: [
    FieldEditorComponent,
    FieldRendererComponent,
    FieldViewerComponent,
    FieldOptionsComponent,
    FieldToolbarComponent,
    FieldHeaderComponent,
    FieldTextComponent,
    FieldNameComponent,
    FieldFileComponent,
    FieldComponent,
    FieldRichTextComponent,
    FieldCustomEditDirective,
    FieldCustomRenderDirective,
    FieldCoreComponent,
    FieldRenderComponent,
    FieldViewComponent
  ]
})

export class FsFieldEditorModule {
  static forRoot(config: FieldEditorConfig = {}): ModuleWithProviders {
    return {
      ngModule: FsFieldEditorModule,
      providers: [
        { provide: FS_FIELD_EDITOR_ORIGINAL_CONFIG, useValue: config },
        {
          provide: FS_FIELD_EDITOR_CONFIG,
          useFactory: defaultConfigFactory,
          deps: [FS_FIELD_EDITOR_ORIGINAL_CONFIG]
        }
      ]
    };
  }
}

