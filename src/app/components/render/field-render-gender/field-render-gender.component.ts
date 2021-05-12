import { ChangeDetectionStrategy, Component, Optional } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';

import { FieldComponent } from '../../field/field.component';
import { ngFormProviderFactory } from '../../../helpers/ng-form-provider-factory';


@Component({
  selector: 'fs-field-render-gender',
  styleUrls: ['field-render-gender.component.scss'],
  templateUrl: 'field-render-gender.component.html',
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: ngFormProviderFactory,
      deps: [[new Optional(), NgForm]],
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldRenderGenderComponent extends FieldComponent {

}
