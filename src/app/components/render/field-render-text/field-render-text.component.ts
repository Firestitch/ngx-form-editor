import { ChangeDetectionStrategy, Component, Optional } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';

import { FieldComponent } from '../../field/field.component';
import { ngFormProviderFactory } from '../../../helpers/ng-form-provider-factory';


@Component({
  selector: 'fs-field-render-text',
  templateUrl: 'field-render-text.component.html',
  styleUrls: ['field-render-text.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: ngFormProviderFactory,
      deps: [[new Optional(), NgForm]],
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldRenderTextComponent extends FieldComponent {

}
