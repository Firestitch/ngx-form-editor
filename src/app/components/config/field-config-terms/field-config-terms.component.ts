import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { FieldComponent } from '../../field/field.component';


@Component({
  selector: 'fs-field-config-terms',
  templateUrl: 'field-config-terms.component.html',
  styleUrls: ['field-config-terms.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldConfigTermsComponent extends FieldComponent {
}
