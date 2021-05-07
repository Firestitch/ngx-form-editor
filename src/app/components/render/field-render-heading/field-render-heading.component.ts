import { ChangeDetectionStrategy, Component } from '@angular/core';

import { FieldComponent } from '../../field/field.component';


@Component({
  selector: 'fs-field-render-heading',
  templateUrl: 'field-render-heading.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldRenderHeadingComponent extends FieldComponent {

}
