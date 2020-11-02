import { Component, Input, Inject, Output, EventEmitter, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';

import { FieldEditorConfig } from '../../interfaces';
import { FieldType, FieldMode } from '../../enums';
import { FieldEditorService } from '../../services/field-editor.service';
import { FS_FIELD_EDITOR_CONFIG } from '../../injectors/fs-field-editor.providers';
import { initField } from '../../helpers/init-field';

@Component({
  template: '',
})
export class FieldCoreComponent implements OnDestroy {

  @Output() public fieldChanged = new EventEmitter();

  public fieldType = FieldType;
  public fieldMode = FieldMode;
  public config: FieldEditorConfig;

  protected _destroy$ = new Subject();

  @Input('config') set setConfig(config: FieldEditorConfig) {

    this.config = { ...this.defaultConfig, ...config };
    if (this.config.fields) {
      this.config.fields = this.fieldEditorService.input(this.config.fields);

      this.config.fields.forEach((field) => {
        field = initField(field);
      });
    }
  }

  public getConfig() {
    return this.fieldEditorService.output(this.config);
  }

  constructor(
    @Inject(FS_FIELD_EDITOR_CONFIG) private defaultConfig,
    protected fieldEditorService: FieldEditorService,
  ) { }

  public ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

}
