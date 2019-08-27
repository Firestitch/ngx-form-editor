import { Component } from '@angular/core';

import { FieldComponent } from '../field/field.component';
import { ControlContainer, NgForm } from '@angular/forms';


@Component({
  selector: 'fs-field-render-checkbox',
  templateUrl: 'field-render-checkbox.component.html',
  styleUrls: [ 'field-render-checkbox.component.scss' ],
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ]
})
export class FieldRenderCheckboxComponent extends FieldComponent {

  public checkboxSelected = false;
}
