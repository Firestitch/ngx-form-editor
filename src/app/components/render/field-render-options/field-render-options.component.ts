import { Component, ChangeDetectionStrategy, SkipSelf } from '@angular/core';

import { FieldComponent } from '../../field/field.component';
import { ControlContainer, NgForm } from '@angular/forms';


@Component({
  selector: 'fs-field-render-options',
  templateUrl: 'field-render-options.component.html',
  styleUrls: [ 'field-render-options.component.scss' ],
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ]
})
export class FieldRenderOptionsComponent extends FieldComponent {

  public newOption = '';

  otherSelected(field, value) {
    field.data.value.other.selected = value;
  }
}
