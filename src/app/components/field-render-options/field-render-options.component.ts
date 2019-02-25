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

    if ($event.checked === true) {
      this.field.data.value.selected.push(option.value);
    } else {
      this.field.data.value.selected.splice(this.field.data.value.selected.indexOf(option.value), 1);
    }
  }

  otherSelected(field, value) {
    setTimeout(() => {
      field.data.value.other.selected = value;
    });
  }
}
