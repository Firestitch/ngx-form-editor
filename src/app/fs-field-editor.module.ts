import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

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
  MatSelectModule,
  MatFormFieldModule
} from '@angular/material';

import { FlexLayoutModule } from '@angular/flex-layout';

import { FieldEditorComponent } from './components/field-editor/field-editor.component';
import { FieldRenderTextComponent } from './components/field-render-text/field-render-text.component';
import { FieldHeaderComponent } from './components/field-header/field-header.component';
import { FieldToolbarComponent } from './components/field-toolbar/field-toolbar.component';
import { FieldRenderOptionsComponent } from './components/field-render-options/field-render-options.component';
import { FieldRenderNameComponent } from './components/field-render-name/field-render-name.component';
import { FieldRenderFileComponent } from './components/field-render-file/field-render-file.component';
import { FieldRenderGenderComponent } from './components/field-render-gender/field-render-gender.component';
import { FieldRenderAddressComponent } from './components/field-render-address/field-render-address.component';
import { FieldComponent } from './components/field/field.component';
import { FieldRendererComponent } from './components/field-renderer/field-renderer.component';
import { FieldViewerComponent } from './components/field-viewer/field-viewer.component';
import { FieldRenderRichTextComponent } from './components/field-render-rich-text/field-render-rich-text.component';
import { FieldConfigDirective } from './directives/field-config/field-config.directive';
import { FieldRenderDirective } from './directives/field-render/field-render.directive';
import { FieldEditorConfig, FieldType } from './interfaces';
import { FieldCoreComponent } from './components/field-core/field-core.component';
import { FieldRenderComponent } from './components/field-render/field-render.component';
import { FieldViewComponent } from './components/field-view/field-view.component';
import { FieldConfigNameComponent } from './components/field-config-name/field-config-name.component';
import { FieldConfigOptionsComponent } from './components/field-config-options/field-config-options.component';
import { FieldConfigFileComponent } from './components/field-config-file/field-config-file.component';
import { FieldConfigGenderComponent } from './components/field-config-gender/field-config-gender.component';
import { FieldConfigAddressComponent } from './components/field-config-address/field-config-address.component';
import { FieldRenderNameModelComponent } from './components/field-render-name-model/field-render-name-model.component';
import { FieldConfigHeadingComponent } from './components/field-config-heading/field-config-heading.component';
import { FieldRenderHeadingComponent } from './components/field-render-heading/field-render-heading.component';
import { FieldConfigContentComponent } from './components/field-config-content/field-config-content.component';
import { FieldRenderContentComponent } from './components/field-render-content/field-render-content.component';
import { FieldRenderCheckboxesComponent } from './components/field-render-checkbox/field-render-checkboxes/field-render-checkboxes.component';
import { FieldRenderCheckboxComponent } from './components/field-render-checkbox/field-render-checkbox.component';


export function defaultConfigFactory(config) {
  return Object.assign(config,
    { fields: [],
      toolbar: {
        items: [
          { type: FieldType.Heading },
          { type: FieldType.Content },
          { type: FieldType.Divider },
          { type: FieldType.ShortText },
          { type: FieldType.LongText },
          { type: FieldType.RichText },
          { type: FieldType.Divider },
          { type: FieldType.Dropdown },
          { type: FieldType.Choice },
          { type: FieldType.Checkbox },
          { type: FieldType.Date },
          { type: FieldType.Time },
          { type: FieldType.Divider },
          { type: FieldType.Name },
          { type: FieldType.Phone },
          { type: FieldType.Email },
          { type: FieldType.Address },
          { type: FieldType.Gender },
          { type: FieldType.Divider },
          { type: FieldType.File }
        ]
      }
  });
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatMenuModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatTooltipModule,
    FlexLayoutModule,

    DragDropModule,

    FsFormModule,
    FsCommonModule,
    FsPromptModule,
    FsDatePickerModule,
    FsPhoneModule,
    FsLabelModule,
    FsDateModule,
    FsEditorRendererModule,
    FsEditorRichTextModule.forRoot(),
    FsFileModule,
    FsPromptModule.forRoot()
  ],
  exports: [
    FieldEditorComponent,
    FieldRendererComponent,
    FieldViewerComponent,
    FieldConfigDirective,
    FieldRenderDirective,
    FieldRenderComponent,
    FieldViewComponent
  ],
  declarations: [
    FieldEditorComponent,
    FieldRendererComponent,
    FieldViewerComponent,
    FieldRenderOptionsComponent,
    FieldToolbarComponent,
    FieldHeaderComponent,
    FieldRenderTextComponent,
    FieldRenderNameComponent,
    FieldRenderFileComponent,
    FieldRenderGenderComponent,
    FieldRenderAddressComponent,
    FieldComponent,
    FieldRenderRichTextComponent,
    FieldConfigDirective,
    FieldRenderDirective,
    FieldCoreComponent,
    FieldRenderComponent,
    FieldViewComponent,
    FieldConfigNameComponent,
    FieldConfigOptionsComponent,
    FieldConfigFileComponent,
    FieldConfigGenderComponent,
    FieldConfigAddressComponent,
    FieldRenderNameModelComponent,
    FieldConfigHeadingComponent,
    FieldRenderHeadingComponent,
    FieldConfigContentComponent,
    FieldRenderContentComponent,
    FieldRenderCheckboxComponent,
    FieldRenderCheckboxesComponent
  ],
  providers: [
    NgForm
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

