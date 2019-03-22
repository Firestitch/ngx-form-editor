import { Component, Input } from '@angular/core';

import { FieldComponent } from '../field/field.component';
import { Field } from '../../interfaces';
import { NgForm, ControlContainer } from '@angular/forms';


@Component({
  selector: 'fs-field-render-name',
  templateUrl: 'field-render-name.component.html',
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ]
})
export class FieldRenderNameComponent extends FieldComponent {

  @Input('field')
  set _field(field: Field) {
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
}
