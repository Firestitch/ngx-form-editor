import { Component, Input, OnInit } from '@angular/core';

import { Field } from '../../interfaces';


@Component({
  selector: 'fs-form-field-name',
  templateUrl: 'field-name.component.html',
  styleUrls: [ 'field-name.component.scss' ],
})
export class FieldNameComponent implements OnInit {

  @Input() field: Field;
  @Input() fields: Field[];

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
