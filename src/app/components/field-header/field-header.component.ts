import { Component, Input, OnInit } from '@angular/core';

import { FsPrompt } from '@firestitch/prompt';

import { Field } from '../../interfaces';
import { guid } from '@firestitch/common/util';


@Component({
  selector: 'fs-field-header',
  templateUrl: 'field-header.component.html',
  styleUrls: [ 'field-header.component.scss' ],
})
export class FieldHeaderComponent implements OnInit {

  @Input() field: Field;
  @Input() fields: Field[];
  constructor(private fsPrompt: FsPrompt) {
  }

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
    this.fields.splice(this.fields.indexOf(this.field) + 1, 0, copiedField);
  }

  delete() {
    this.fsPrompt.confirm({
      title: 'Confirm',
      template: 'Are you sure you would like to remove this option?',
    }).subscribe((value) => {
        this.fields.splice(this.fields.indexOf(this.field), 1);
    });
  }

}
