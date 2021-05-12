import { ChangeDetectionStrategy, Component, OnInit, Optional } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';

import { IFsAddressConfig } from '@firestitch/address';

import { FieldComponent } from '../../field/field.component';
import { ngFormProviderFactory } from '../../../helpers/ng-form-provider-factory';


@Component({
  selector: 'fs-field-render-address',
  styleUrls: ['field-render-address.component.scss'],
  templateUrl: 'field-render-address.component.html',
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: ngFormProviderFactory,
      deps: [[new Optional(), NgForm]],
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldRenderAddressComponent extends FieldComponent implements OnInit {

  public config: IFsAddressConfig;

  public ngOnInit(): void {
    super.ngOnInit();

    this.config = {

      name: {
        visible: false,
      },
      street: {
        visible: this.field.config.configs.street.enabled,
        required: this.field.config.configs.street.required,
      },
      address2: {
        visible: this.field.config.configs.address2.enabled,
        required: this.field.config.configs.address2.required,
      },
      city: {
        visible: this.field.config.configs.city.enabled,
        required: this.field.config.configs.city.required,
      },
      region: {
        visible: this.field.config.configs.region.enabled,
        required: this.field.config.configs.region.required,
      },
      zip: {
        visible: this.field.config.configs.zip.enabled,
        required: this.field.config.configs.zip.required,
      },
      country: {
        visible: this.field.config.configs.country.enabled,
        required: this.field.config.configs.country.required,
      }
    };
  }

}
