import { Component, Input, Inject } from '@angular/core';

import { FieldMode, FieldEditorConfig } from '../../interfaces';
import { FieldType } from '../../enums';
import { FS_FIELD_EDITOR_CONFIG } from '../../injectors/fs-field-editor.providers';
import { initField } from '../../helpers/init-field';


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
        field = initField(field);
      });
    }
  }

  constructor(@Inject(FS_FIELD_EDITOR_CONFIG) private defaultConfig)  {}
}
