import { Component } from '@angular/core';

import { FieldComponent } from '../../field/field.component';
import { ControlContainer, NgForm } from '@angular/forms';


@Component({
  selector: 'fs-field-render-text',
  templateUrl: 'field-render-text.component.html',
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ]
})
export class FieldRenderTextComponent extends FieldComponent {

}
