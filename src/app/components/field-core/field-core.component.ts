import { Component, Input, Inject } from '@angular/core';

import { FieldType, FieldMode, FieldEditorConfig } from '../../interfaces';
import { FS_FIELD_EDITOR_CONFIG } from '../../fs-field-editor.providers';


@Component({
  template: ''
})
export class FieldCoreComponent {

  public fieldType = FieldType;
  public fieldMode = FieldMode;
  public config: FieldEditorConfig;

  @Input('config') set setConfig(config: FieldEditorConfig) {

    this.config = Object.assign({}, this.defaultConfig, config);

    if (this.config.fields) {
      this.config.fields.forEach(field => {
        if (!field.data) {
          field.data = {};
        }
      });
    }
  }

  constructor(@Inject(FS_FIELD_EDITOR_CONFIG) private defaultConfig)  {}
}
