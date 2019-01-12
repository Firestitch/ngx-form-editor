import { Component, Input, EventEmitter, OnDestroy } from '@angular/core';

import { Field } from '../../interfaces';
import { FieldEditorComponent } from '../field-editor';


@Component({
  template: ''
})
export class FieldComponent implements OnDestroy {

  public field: Field;
  protected $destory = new EventEmitter();

  @Input('field') set setField(field: Field) {
    this.field = field;
  }

  @Input() fieldEditor: FieldEditorComponent;

  ngOnDestroy() {
    this.$destory.complete();
  }
}
