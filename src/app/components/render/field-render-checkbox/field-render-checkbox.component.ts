import { Component, ViewChild } from '@angular/core';
import { ControlContainer, NgForm, NgModel } from '@angular/forms';

import { FieldComponent } from '../../field/field.component';

@Component({
  selector: 'fs-field-render-checkbox',
  templateUrl: 'field-render-checkbox.component.html',
  styleUrls: [ 'field-render-checkbox.component.scss' ],
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ]
})
export class FieldRenderCheckboxComponent extends FieldComponent {

  @ViewChild('checkboxes', { read: NgModel }) public checkboxes: NgModel;

  public otherInputClick(event: KeyboardEvent) {
    event.stopPropagation();
    this.field.data.value.other.selected = true;
    this.checkboxes.control.updateValueAndValidity();
  }
  public otherCheckboxClick(event: KeyboardEvent) {
    event.preventDefault();
    this.field.data.value.other.selected = !this.field.data.value.other.selected;
    this.checkboxes.control.updateValueAndValidity();
  }

  public validate = () => {
    if (this.field.config.configs.required === true) {
      if (!this.field.data.value.other.selected && !this.field.data.value.selected.length) {
        throw 'This field is required';
      }
    }
  }

}
