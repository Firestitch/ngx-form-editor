import { Component, Input } from '@angular/core';

import { FieldComponent } from '../../field/field.component';
import { Field } from '../../../interfaces/field.interface';
import { NgForm, ControlContainer } from '@angular/forms';


@Component({
  selector: 'fs-field-render-terms',
  templateUrl: 'field-render-terms.component.html',
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ]
})
export class FieldRenderTermsComponent extends FieldComponent {

  @Input('field')
  set _field(field: Field) {
    this.field = field;

    if (!field.data || !field.data.guid || !field.data.value) {
      field.data = {
        value: {
          firstName: null,
          middleName: null,
          lastName: null
        }
      };
    }
  }
}
