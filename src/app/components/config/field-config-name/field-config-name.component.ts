import { Component, Input } from '@angular/core';

import { FieldComponent } from '../../field/field.component';
import { Field } from '../../../interfaces';


@Component({
  selector: 'fs-field-config-name',
  templateUrl: 'field-config-name.component.html',
  styleUrls: [ 'field-config-name.component.scss' ],
})
export class FieldConfigNameComponent extends FieldComponent {
}
