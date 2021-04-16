import { Component } from '@angular/core';

import { FieldComponent } from '../../field/field.component';
import { ControlContainer, NgForm } from '@angular/forms';


@Component({
  selector: 'fs-field-render-content',
  templateUrl: 'field-render-content.component.html',
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ]
})
export class FieldRenderContentComponent extends FieldComponent {

}
