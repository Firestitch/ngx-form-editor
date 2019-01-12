import { Component, Input, OnInit } from '@angular/core';

import { FsPrompt } from '@firestitch/prompt';

import { guid } from '@firestitch/common/util';
import { FieldComponent } from '../field/field.component';


@Component({
  selector: 'fs-field-header',
  templateUrl: 'field-header.component.html',
  styleUrls: [ 'field-header.component.scss' ],
})
export class FieldHeaderComponent extends FieldComponent implements OnInit {

  constructor(private fsPrompt: FsPrompt) {
    super();
  }

  ngOnInit() {
    this.field.config.hasDescription = !!this.field.config.description;
  }

  toggleDescription() {
    this.field.config.hasDescription = !this.field.config.hasDescription;
    this.field.config.description = '';
  }

  copy(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    const copiedField = Object.assign({}, this.field);
    copiedField.config.guid = guid();
    const idx = this.fieldEditor.fields.indexOf(this.field) + 1;
    this.fieldEditor.fields.splice(idx, 0, copiedField);
    this.fieldEditor.selectField(copiedField);
  }

  delete(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    this.fsPrompt.confirm({
      title: 'Confirm',
      template: 'Are you sure you would like to remove this field?',
    }).subscribe((value) => {
        this.fieldEditor.fields.splice(this.fieldEditor.fields.indexOf(this.field), 1);
        this.fieldEditor.unselectField();
    });
  }

}
