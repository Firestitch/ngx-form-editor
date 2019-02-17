import { Component, Input, EventEmitter, OnDestroy, OnInit } from '@angular/core';

import { initField } from './../../helpers/init-field';
import { Field, FieldMode, FieldType } from '../../interfaces';
import { FieldEditorComponent } from '../field-editor';


@Component({
  template: ''
})
export class FieldComponent implements OnDestroy, OnInit {

  public fieldMode = FieldMode;
  public fieldType = FieldType;
  public field: Field;
  protected $destory = new EventEmitter();

  public changed(event?) {
    this.fieldEditor.$fieldChanged.emit({ field: this.field, event: event });
  }

  @Input('field') set _field(field: Field) {
    this.setField(field);
  }

  public setField(field) {
    this.field = this.initField(field);
  }

  @Input() fieldEditor: FieldEditorComponent;

  ngOnDestroy() {
    this.$destory.complete();
  }

  ngOnInit(): void {
    this.field = this.initField(this.field);
  }

  initField(field) {
    return initField(field);
  }
}
