import { ChangeDetectionStrategy, Component, Input, Optional } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';

import { FieldComponent } from '../../field/field.component';
import { COUNTRIES } from '../../../constants/countries';
import { filter } from 'lodash-es';
import { Field } from '../../../interfaces/field.interface';
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
export class FieldRenderAddressComponent extends FieldComponent {
  public countries = COUNTRIES;
  public regions = [];
  public regionLabel;
  public zipLabel;

  @Input('field') set _field(field: Field) {
    this.setField(field);
    this.changeCountry();
  }

  public changeCountry() {
    const country = filter(this.countries, { code: this.field.data.value.country })[0];
    this.regions = country  && country.regions ? country.regions : [];
    this.updateCountryRegionLabels(country);
    this.changed.emit(this.field);
  }

  public changeRegion() {
    const country = filter(this.countries, { code: this.field.data.value.country })[0];

    if (country && country.regions) {
      const region = filter(country.regions, { code: this.field.data.value.region })[0];
      this.field.data.value.region = region.code;
    }
  }

  private updateCountryRegionLabels(country) {
    this.zipLabel = country && country.zipLabel ? country.zipLabel : this.field.config.configs.zip.label;
    this.regionLabel = country && country.regionLabel ? country.regionLabel : this.field.config.configs.region.label;
  }
}
