import { Component, Input, EventEmitter, OnInit, OnDestroy } from '@angular/core';

import { guid } from '@firestitch/common';

import { initField } from './../../helpers/init-field';
import { Field, FieldMode, FieldType } from '../../interfaces';
import { FieldEditorComponent } from '../field-editor';


@Component({
  template: ''
})
export class FieldComponent implements OnDestroy, OnInit {

  public fieldMode = FieldMode;
  public fieldType = FieldType;
  public field: Field = null;
  public name = 'field_' + guid();
  protected $destory = new EventEmitter();

  public changed(event?) {
    this.fieldEditor.fieldChanged$.emit({ field: this.field, event: event });
  }

  @Input('field') set _field(field: Field) {
    this.setField(field);
  }

  public setField(field) {
    this.field = this.initField(field);
  }

  @Input() public fieldEditor: FieldEditorComponent = null;

  public ngOnDestroy() {
    this.$destory.complete();
  }

  public ngOnInit(): void {
    this.field = this.initField(this.field);
  }

  public initField(field) {
    return initField(field);
  }

}
