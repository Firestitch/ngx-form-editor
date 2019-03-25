import { Component, Input, OnInit } from '@angular/core';

import { FsPrompt } from '@firestitch/prompt';

import { guid } from '@firestitch/common';
import { FieldComponent } from '../field/field.component';
import { FieldEditorComponent } from '../field-editor';


@Component({
  selector: 'fs-field-header',
  templateUrl: 'field-header.component.html',
  styleUrls: [ 'field-header.component.scss' ],
})
export class FieldHeaderComponent extends FieldComponent implements OnInit {

  @Input() fieldEditor: FieldEditorComponent;
  @Input() showRequired = true;

  constructor(private fsPrompt: FsPrompt) {
    super();
  }

  ngOnInit() {
    this.field.config.hasDescription = !!this.field.config.description;
  }

  toggleRequired() {
    this.field.config.configs.required = !this.field.config.configs.required;
    this.fieldEditor.fieldChanged$.emit(this.field);
  }

  toggleDescription() {
    this.field.config.hasDescription = !this.field.config.hasDescription;
    this.field.config.description = '';
    this.fieldEditor.fieldChanged$.emit(this.field);
  }

  copy(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    const copiedField = Object.assign({}, this.field);
    copiedField.config.guid = guid();
    const idx = this.fieldEditor.config.fields.indexOf(this.field) + 1;
    this.fieldEditor.config.fields.splice(idx, 0, copiedField);
    this.fieldEditor.selectField(copiedField);
    this.fieldEditor.fieldDuplicated$.emit(this.field);
  }

  close(e) {
    e.stopPropagation();
    this.fieldEditor.unselectField();
  }

  delete(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    this.fsPrompt.confirm({
      title: 'Confirm',
      template: 'Are you sure you would like to remove this field?',
    }).subscribe((value) => {
        this.fieldEditor.config.fields.splice(this.fieldEditor.config.fields.indexOf(this.field), 1);
        this.fieldEditor.unselectField();
        this.changed();
    });
  }

}
