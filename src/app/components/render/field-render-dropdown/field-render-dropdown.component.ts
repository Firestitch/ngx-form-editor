import { ChangeDetectionStrategy, Component, Optional } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';

import { ngFormProviderFactory } from '../../../helpers/ng-form-provider-factory';
import { FieldComponent } from '../../field/field.component';


@Component({
  selector: 'fs-field-render-dropdown',
  templateUrl: 'field-render-dropdown.component.html',
  styleUrls: ['field-render-dropdown.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: ngFormProviderFactory,
      deps: [[new Optional(), NgForm]],
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldRenderDropdownComponent extends FieldComponent {

}
