import { ChangeDetectionStrategy, Component, OnInit, Optional } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';

import { IFsAddressConfig } from '@firestitch/address';
import { controlContainerFactory } from '@firestitch/core';

import { FieldComponent } from '../../field/field.component';



@Component({
  selector: 'fs-field-render-address',
  styleUrls: ['field-render-address.component.scss'],
  templateUrl: 'field-render-address.component.html',
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: controlContainerFactory,
      deps: [[new Optional(), NgForm]],
    },
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
        disabled: this.disabled,
      },
      address2: {
        visible: this.field.config.configs.address2.enabled,
        required: this.field.config.configs.address2.required,
        disabled: this.disabled,
      },
      city: {
        visible: this.field.config.configs.city.enabled,
        required: this.field.config.configs.city.required,
        disabled: this.disabled,
      },
      region: {
        visible: this.field.config.configs.region.enabled,
        required: this.field.config.configs.region.required,
        disabled: this.disabled,
      },
      zip: {
        visible: this.field.config.configs.zip.enabled,
        required: this.field.config.configs.zip.required,
        disabled: this.disabled,
      },
      country: {
        visible: this.field.config.configs.country.enabled,
        required: this.field.config.configs.country.required,
        disabled: this.disabled,
      }
    };
  }

}
