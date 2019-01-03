import { Component, Input, OnInit } from '@angular/core';

import { FsPrompt } from '@firestitch/prompt';

import { Field } from '../../interfaces';
import { guid } from '@firestitch/common/util';
import { FieldEditorComponent } from '../field-editor';


@Component({
  selector: 'fs-field-header',
  templateUrl: 'field-header.component.html',
  styleUrls: [ 'field-header.component.scss' ],
})
export class FieldHeaderComponent implements OnInit {

  @Input() field: Field;
  @Input() selected = false;
  @Input() fieldEditor: FieldEditorComponent;

  constructor(private fsPrompt: FsPrompt) {}

  ngOnInit() {
    this.field.hasDescription = !!this.field.description;
  }

  toggleDescription() {
    this.field.hasDescription = !this.field.hasDescription;
    this.field.description = '';
  }

  copy() {
    const copiedField = Object.assign({}, this.field);
    copiedField.guid = guid();
    const idx = this.fieldEditor.fields.indexOf(this.field) + 1;
    this.fieldEditor.fields.splice(idx, 0, copiedField);
    this.fieldEditor.selectField(copiedField);
  }

  delete() {
    this.fsPrompt.confirm({
      title: 'Confirm',
      template: 'Are you sure you would like to remove this field?',
    }).subscribe((value) => {
        this.fieldEditor.fields.splice(this.fieldEditor.fields.indexOf(this.field), 1);
    });
  }

}
