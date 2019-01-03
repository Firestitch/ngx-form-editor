import { Component, Input, ViewChild, ElementRef, OnInit, EventEmitter, OnDestroy } from '@angular/core';

import { Field, FieldType } from '../../interfaces';
import { FieldEditorComponent } from '../field-editor';


@Component({
  template: ''
})
export class FieldComponent implements OnInit, OnDestroy {

  public field: Field;
  protected $destory = new EventEmitter();

  @Input('field') set setField(field: Field) {
    this.field = field;
  }

  @Input() fieldEditor: FieldEditorComponent;


  ngOnInit() {

  }

  ngOnDestroy() {
    this.$destory.complete();
  }
}
