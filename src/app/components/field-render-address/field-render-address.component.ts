import { Component, Input } from '@angular/core';

import { FieldComponent } from '../field/field.component';
import { COUNTRIES } from './../../constants/countries';
import { filter } from 'lodash';
import { Field } from '../../interfaces';


@Component({
  selector: 'fs-field-render-address',
  styleUrls: ['field-render-address.component.scss'],
  templateUrl: 'field-render-address.component.html'
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
    const country = filter(this.countries, { code: this.field.data.country })[0];
    this.regions = country  && country.regions ? country.regions : [];
    this.updateCountryRegionLabels(country);
  }

  public changeRegion() {
    const country = filter(this.countries, { code: this.field.data.country })[0];

    if (country && country.regions) {
      const region = filter(country.regions, { code: this.field.data.region })[0];
      this.field.data.region = region.code;
    }
  }

  private updateCountryRegionLabels(country) {
    this.zipLabel = country && country.zipLabel ? country.zipLabel : this.field.config.zip.label;
    this.regionLabel = country && country.regionLabel ? country.regionLabel : this.field.config.region.label;
  }
}
