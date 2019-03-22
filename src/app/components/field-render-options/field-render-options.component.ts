import { Component, ChangeDetectionStrategy, SkipSelf } from '@angular/core';

import { FieldComponent } from '../field/field.component';
import { ControlContainer, NgForm } from '@angular/forms';


@Component({
  selector: 'fs-field-render-options',
  templateUrl: 'field-render-options.component.html',
  styleUrls: [ 'field-render-options.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ]
})
export class FieldRenderOptionsComponent extends FieldComponent {

  public newOption = '';

  handleCheckbox($event, option) {

    if ($event.checked === true) {
      this.field.data.value.selected.push(option.value);
    } else {
      this.field.data.value.selected.splice(this.field.data.value.selected.indexOf(option.value), 1);
    }
  }

  otherSelected(field, value) {
    field.data.value.other.selected = value;
  }
}
