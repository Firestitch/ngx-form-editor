import { Component, Input } from '@angular/core';

import { FieldComponent } from '../field/field.component';
import { Field } from '../../interfaces';


@Component({
  selector: 'fs-field-name',
  templateUrl: 'field-name.component.html',
  styleUrls: [ 'field-name.component.scss' ],
})
export class FieldNameComponent extends FieldComponent {

  @Input('field')
  set setField(field: Field) {
    this.field = field;

    if (!field.data || !field.data.guid || !field.data.value) {
      field.data = {
        value: {
          first_name: null,
          middle_name: null,
          last_name: null
        }
      };
    }
  }

  ngOnInit(): void {
    super.ngOnInit();

    if (!this.field.config.settings || Array.isArray(this.field.config.settings)) {
      this.field.config.settings = {
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
