import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { FieldComponent } from '../../field/field.component';
import { Field } from '../../../interfaces/field.interface';
import { NgForm, ControlContainer } from '@angular/forms';


@Component({
  selector: 'fs-field-render-name',
  templateUrl: 'field-render-name.component.html',
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldRenderNameComponent extends FieldComponent {

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

  public validate = (formControl) => {

    if (this.field.config.configs.required === true) {

      const value = formControl.value;
      if (!value.firstName) {
        throw 'First name is required';
      }

      if (!value.lastName) {
        throw 'Last name is required';
      }
    }
  }

}
