import { Component, Input, OnInit } from '@angular/core';

import { FsPrompt } from '@firestitch/prompt';

import { guid } from '@firestitch/common';
import { FieldComponent } from '../field/field.component';
import { FieldEditorComponent } from '../field-editor';
import { cloneDeep } from 'lodash-es';


@Component({
  selector: 'fs-field-header',
  templateUrl: 'field-header.component.html',
  styleUrls: [ 'field-header.component.scss' ],
})
export class FieldHeaderComponent extends FieldComponent implements OnInit {

  @Input() fieldEditor: FieldEditorComponent;
  @Input() showRequired = true;
  @Input() showDescription = true;

  constructor(private fsPrompt: FsPrompt) {
    super();
  }

  ngOnInit() {
    this.field.config.hasDescriptionNote = !!this.field.config.description || !!this.field.config.configs.note;
  }

  toggleRequired() {
    this.field.config.configs.required = !this.field.config.configs.required;
    this.fieldEditor.fieldChanged$.emit(this.field);
  }

  toggleDescriptionNote() {
    this.field.config.hasDescriptionNote = !this.field.config.hasDescriptionNote;
    this.fieldEditor.fieldChanged$.emit(this.field);
  }

  copy(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    const copiedField = cloneDeep(this.field);
    const idx = this.fieldEditor.config.fields.indexOf(this.field) + 1;

    copiedField.config.guid = guid();
    copiedField.data = {};
    this.fieldEditor.fieldDuplicate$.emit(copiedField);

    this.fieldEditor.config.fields.splice(idx, 0, copiedField);
    this.fieldEditor.selectField(copiedField);
    this.fieldEditor.fieldDuplicated$.emit(copiedField);
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
        this.fieldEditor.fieldRemoved$.emit({ field: this.field, event: event });
    });
  }

}
