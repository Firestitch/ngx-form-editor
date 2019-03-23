import { Component } from '@angular/core';

import { FieldComponent } from '../field/field.component';
import { NgForm, ControlContainer } from '@angular/forms';


@Component({
  selector: 'fs-field-render-gender',
  styleUrls: ['field-render-gender.component.scss'],
  templateUrl: 'field-render-gender.component.html',
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ]
})
export class FieldRenderGenderComponent extends FieldComponent {

}
