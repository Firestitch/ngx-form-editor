import { Component, Input, ViewChild, ElementRef } from '@angular/core';

import { FieldComponent } from '../field/field.component';


@Component({
  selector: 'fs-field-render-options',
  templateUrl: 'field-render-options.component.html',
  styleUrls: [ 'field-render-options.component.scss' ],
})
export class FieldRenderOptionsComponent extends FieldComponent {

  public newOption = '';

  handleCheckbox($event, option) {
    if (!this.field.data.value) {
      this.field.data.value = [];
    }

    if ($event.checked === true) {
      this.field.data.value.push(option.value);
    } else {
      this.field.data.value.splice(this.field.data.value.indexOf(option.value), 1);
    }
  }

  otherSelected(field, value) {
    field.data.other.selected = value;
  }
}
