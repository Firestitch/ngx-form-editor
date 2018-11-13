import { Component, Input, OnInit } from '@angular/core';

import { index } from '@firestitch/common';
import { FsPrompt } from '@firestitch/prompt';

import { FormEditorConfig, Field } from 'src/app/interfaces';


@Component({
  selector: 'fs-field-header',
  templateUrl: 'field-header.component.html',
  styleUrls: [ 'field-header.component.scss' ],
})
export class FieldHeaderComponent implements OnInit {

  @Input() config: FormEditorConfig;
  @Input() configField;
  @Input() field;
  @Input() form;
  constructor(private fsPrompt: FsPrompt) {
  }

  ngOnInit() {
    this.field.hasDescription = !!this.field.description;
  }

  toggleDescription() {
    this.field.hasDescription = !this.field.hasDescription;
  }

  copy() {
    this.form.fields.splice(this.form.fields.indexOf(this.field), 0, this.field);
  }

  delete() {
    this.fsPrompt.confirm({
      title: 'Confirm',
      template: 'Are you sure you would like to remove this option?',
    }).subscribe((value) => {
        this.form.fields.splice(this.form.fields.indexOf(this.field), 1);
    });
  }

}
