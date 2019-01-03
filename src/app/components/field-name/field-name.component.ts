import { Component, Input, OnInit } from '@angular/core';

import { Field } from '../../interfaces';
import { FieldEditorComponent } from '../field-editor';


@Component({
  selector: 'fs-field-field-name',
  templateUrl: 'field-name.component.html',
  styleUrls: [ 'field-name.component.scss' ],
})
export class FieldNameComponent implements OnInit {

  @Input() field: Field;
  @Input() fieldEditor: FieldEditorComponent;
  @Input() selected = false;

  constructor() {
  }

  ngOnInit(): void {
    if (!this.field.configs || Array.isArray(this.field.configs)) {
      this.field.configs = {
        first_name: {
          display: true,
          label: 'First Name',
        },
        middle_name: {
          display: false,
          label: 'Middle Name',
        },
        last_name: {
          display: true,
          label: 'Last Name',
        },
      }
    }
  }
}
