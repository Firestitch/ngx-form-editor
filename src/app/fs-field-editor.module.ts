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
import { FsGalleryModule } from '@firestitch/gallery';

import { FS_FIELD_EDITOR_CONFIG } from './fs-field-editor.providers';
import { FS_FIELD_EDITOR_ORIGINAL_CONFIG } from './fs-field-editor-original.providers';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';

import { FlexLayoutModule } from '@angular/flex-layout';

import { FieldEditorComponent } from './components/field-editor/field-editor.component';
import { FieldRenderTextComponent } from './components/render/field-render-text/field-render-text.component';
import { FieldHeaderComponent } from './components/field-header/field-header.component';
import { FieldToolbarComponent } from './components/field-toolbar/field-toolbar.component';
import { FieldRenderOptionsComponent } from './components/render/field-render-options/field-render-options.component';
import { FieldRenderNameComponent } from './components/render/field-render-name/field-render-name.component';
import { FieldRenderFileComponent } from './components/render/field-render-file/field-render-file.component';
import { FieldRenderGenderComponent } from './components/render/field-render-gender/field-render-gender.component';
import { FieldRenderAddressComponent } from './components/render/field-render-address/field-render-address.component';
import { FieldComponent } from './components/field/field.component';
import { FieldRendererComponent } from './components/field-renderer/field-renderer.component';
import { FieldViewerComponent } from './components/field-viewer/field-viewer.component';
import { FieldRenderRichTextComponent } from './components/render/field-render-rich-text/field-render-rich-text.component';
import { FieldConfigDirective } from './directives/field-config/field-config.directive';
import { FieldRenderDirective } from './directives/field-render/field-render.directive';
import { FieldEditorConfig, FieldType } from './interfaces';
import { FieldCoreComponent } from './components/field-core/field-core.component';
import { FieldRenderComponent } from './components/render/field-render/field-render.component';
import { FieldViewComponent } from './components/field-view/field-view.component';
import { FieldConfigNameComponent } from './components/config/field-config-name/field-config-name.component';
import { FieldConfigOptionsComponent } from './components/config/field-config-options/field-config-options.component';
import { FieldConfigFileComponent } from './components/config/field-config-file/field-config-file.component';
import { FieldConfigGenderComponent } from './components/config/field-config-gender/field-config-gender.component';
import { FieldConfigAddressComponent } from './components/config/field-config-address/field-config-address.component';
import { FieldRenderNameModelComponent } from './components/render/field-render-name-model/field-render-name-model.component';
import { FieldConfigHeadingComponent } from './components/config/field-config-heading/field-config-heading.component';
import { FieldRenderHeadingComponent } from './components/render/field-render-heading/field-render-heading.component';
import { FieldConfigContentComponent } from './components/config/field-config-content/field-config-content.component';
import { FieldRenderContentComponent } from './components/render/field-render-content/field-render-content.component';
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
    FsGalleryModule,
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

