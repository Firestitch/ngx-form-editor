import { ChangeDetectionStrategy, Component, OnInit, Optional } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';

import { parse } from '@firestitch/date';

import { FieldComponent } from '../../field/field.component';
import { ngFormProviderFactory } from '../../../helpers/ng-form-provider-factory';


@Component({
  selector: 'fs-field-render-date',
  templateUrl: 'field-render-date.component.html',
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: ngFormProviderFactory,
      deps: [[new Optional(), NgForm]],
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldRenderDateComponent extends FieldComponent implements OnInit {

  public ngOnInit(): void {
    super.ngOnInit();

    this.field.data.value = parse(this.field.data.value);
  }

}
