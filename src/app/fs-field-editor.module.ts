import { FieldEditorService } from './services/field-editor.service';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DragDropModule } from '@angular/cdk/drag-drop';

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

import { FsCommonModule } from '@firestitch/common';
import { FsPromptModule } from '@firestitch/prompt';
import { FsFormModule } from '@firestitch/form';
import { FsDatePickerModule } from '@firestitch/datepicker';
import { FsPhoneModule } from '@firestitch/phone';
import { FsFileModule } from '@firestitch/file';
import { FsLabelModule } from '@firestitch/label';
import { FsDateModule } from '@firestitch/date';
import { FsGalleryModule } from '@firestitch/gallery';
import { FsCheckboxGroupModule } from '@firestitch/checkboxgroup';
import { FsRadioGroupModule } from '@firestitch/radiogroup';
import { FsHtmlEditorModule } from '@firestitch/html-editor';

import { AngularStickyThingsModule } from '@w11k/angular-sticky-things';

import { FS_FIELD_EDITOR_CONFIG } from './injectors/fs-field-editor.providers';
import { FS_FIELD_EDITOR_ORIGINAL_CONFIG } from './injectors/fs-field-editor-original.providers';

import { FieldEditorComponent } from './components/field-editor/field-editor.component';
import { FieldRenderTextComponent } from './components/render/field-render-text/field-render-text.component';
import { FieldHeaderComponent } from './components/field-editor/field-header/field-header.component';
import { FieldToolbarComponent } from './components/field-editor/field-toolbar/field-toolbar.component';
import { FieldRenderChoiceComponent } from './components/render/field-render-choice/field-render-choice.component';
import { FieldRenderDropdownComponent } from './components/render/field-render-dropdown/field-render-dropdown.component';
import { FieldRenderNameComponent } from './components/render/field-render-name/field-render-name.component';
import { FieldRenderFileComponent } from './components/render/field-render-file/field-render-file.component';
import { FieldRenderGenderComponent } from './components/render/field-render-gender/field-render-gender.component';
import { FieldRenderAddressComponent } from './components/render/field-render-address/field-render-address.component';
import { FieldComponent } from './components/field/field.component';
import { FieldRendererComponent } from './components/field-renderer/field-renderer.component';
import { FieldViewerComponent } from './components/field-viewer/field-viewer.component';
import { FieldConfigDirective } from './directives/field-config/field-config.directive';
import { FieldRenderDirective } from './directives/field-render/field-render.directive';
import { FieldViewDirective } from './directives/field-view/field-view.directive';
import { FieldEditorConfig } from './interfaces/field.interface';
import { FieldType } from './enums/field-type';
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
import { FieldRenderCheckboxComponent } from './components/render/field-render-checkbox/field-render-checkbox.component';
import { FieldToolbarItemComponent } from './components/field-editor/field-toolbar-item/field-toolbar-item.component';
import { FieldRenderTermsComponent } from './components/render/field-render-terms/field-render-terms.component';
import { FieldConfigTermsComponent } from './components/config/field-config-terms/field-config-terms.component';



export function defaultConfigFactory(config) {
  return Object.assign(config,
    { fields: [],
      toolbar: {
        items: [
          { type: FieldType.Heading },
          { type: FieldType.Content },
          { type: FieldType.ShortText },
          { type: FieldType.LongText },
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
          { type: FieldType.Terms },
          { type: FieldType.Divider },
          { type: FieldType.File },
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
    AngularStickyThingsModule,

    FsFormModule,
    FsCommonModule,
    FsPromptModule,
    FsDatePickerModule,
    FsPhoneModule,
    FsGalleryModule,
    FsLabelModule,
    FsDateModule,
    FsHtmlEditorModule,
    FsFileModule,
    FsPromptModule,
    FsCheckboxGroupModule,
    FsRadioGroupModule,
  ],
  exports: [
    FieldEditorComponent,
    FieldRendererComponent,
    FieldViewerComponent,
    FieldConfigDirective,
    FieldRenderDirective,
    FieldRenderComponent,
    FieldViewComponent,
    FieldViewDirective,
  ],
  declarations: [
    FieldEditorComponent,
    FieldRendererComponent,
    FieldViewerComponent,
    FieldViewDirective,
    FieldRenderChoiceComponent,
    FieldRenderDropdownComponent,
    FieldToolbarComponent,
    FieldToolbarItemComponent,
    FieldHeaderComponent,
    FieldRenderTextComponent,
    FieldRenderNameComponent,
    FieldRenderFileComponent,
    FieldRenderGenderComponent,
    FieldRenderAddressComponent,
    FieldComponent,
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
    FieldViewDirective,
    FieldRenderTermsComponent,
    FieldConfigTermsComponent,
  ],
  providers: [
    NgForm
  ],
})

export class FsFieldEditorModule {
  static forRoot(config: FieldEditorConfig = { case: 'camel' }): ModuleWithProviders<FsFieldEditorModule> {
    return {
      ngModule: FsFieldEditorModule,
      providers: [
        FieldEditorService,
        { provide: FS_FIELD_EDITOR_ORIGINAL_CONFIG, useValue: config },
        {
          provide: FS_FIELD_EDITOR_CONFIG,
          useFactory: defaultConfigFactory,
          deps: [FS_FIELD_EDITOR_ORIGINAL_CONFIG]
        },
      ]
    };
  }
}

