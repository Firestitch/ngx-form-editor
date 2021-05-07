import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';

import { FieldComponent } from '../../field/field.component';

@Component({
  selector: 'fs-field-render-dropdown',
  templateUrl: 'field-render-dropdown.component.html',
  styleUrls: ['field-render-dropdown.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldRenderDropdownComponent extends FieldComponent {

}
