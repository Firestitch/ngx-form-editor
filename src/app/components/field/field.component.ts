import { Component, Input, EventEmitter, OnDestroy, OnInit } from '@angular/core';

import { guid } from '@firestitch/common/util';
import { Field, FieldMode, FieldType } from '../../interfaces';


@Component({
  template: ''
})
export class FieldComponent implements OnDestroy, OnInit {

  public fieldMode = FieldMode;
  public fieldType = FieldType;
  public field: Field;
  protected $destory = new EventEmitter();

  @Input('field') set setField(field: Field) {
    this.field = this.initField(field);
  }

  @Input() mode: FieldMode;

  ngOnDestroy() {
    this.$destory.complete();
  }

  ngOnInit(): void {
    this.field = this.initField(this.field);
  }

  initField(field) {
    if (!field) {
      field = {};
    }

    if (!field.data) {
      field.data = { value: '' };
    }

    if (field.config.type===FieldType.Checkbox || field.config.type===FieldType.Choice || field.config.type===FieldType.Dropdown) {

      if (!field.config.options) {
        field.config.options = [];
      }

      if (!field.data.other && (field.config.type===FieldType.Checkbox || field.config.type===FieldType.Choice)) {
        field.data.other = { selected: false, value: '' };
      }
    }

    if(!field.data.guid) {
      field.data.guid = guid();
    }

    return field;
  }
}
