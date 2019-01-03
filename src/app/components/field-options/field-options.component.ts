import { Component, Input } from '@angular/core';

import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

import { FsPrompt } from '@firestitch/prompt';
import { guid } from '@firestitch/common/util';

import { Field, FieldType } from '../../interfaces';
import { FieldEditorComponent } from '../field-editor';


@Component({
  selector: 'fs-field-field-options',
  templateUrl: 'field-options.component.html',
  styleUrls: [ 'field-options.component.scss' ],
})
export class FieldOptionsComponent {
  public newOption = '';
  public _field: Field;
  public fieldType = FieldType;

  @Input() set field(field: Field) {
    this._field = field;

    if(!field.field_options) {
      field.field_options = [];
    }
  }

  @Input() fieldEditor: FieldEditorComponent;
  @Input() selected;

  constructor(
    private fsPrompt: FsPrompt,
  ) {}

  get field() {
    return this._field;
  }

  addOption() {

    if (this.newOption.length) {

      if (!this.field.field_options) {
        this.field.field_options = [];
      }

      this.field.field_options.push({
        guid: guid(),
        label: this.newOption,
      });

      this.newOption = '';
    }
  }

  removeOption(index: number) {
    this.fsPrompt.confirm({
      title: 'Confirm',
      template: 'Are you sure you would like to remove this option?',
    }).subscribe((value) => {
        this.field.field_options.splice(index, 1);
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.field.field_options, event.previousIndex, event.currentIndex);
  }
}
