import { ChangeDetectionStrategy, Component } from '@angular/core';

import { FieldComponent } from '../../field/field.component';
import { ControlContainer, NgForm } from '@angular/forms';


@Component({
  selector: 'fs-field-render-text',
  templateUrl: 'field-render-text.component.html',
  styleUrls: ['field-render-text.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldRenderTextComponent extends FieldComponent {

}
