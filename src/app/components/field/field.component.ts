import { Component, Input, EventEmitter, OnDestroy, OnInit } from '@angular/core';

import { guid } from '@firestitch/common/util';
import { Field, FieldMode, FieldType } from '../../interfaces';
import { FieldEditorComponent } from '../field-editor';


@Component({
  template: ''
})
export class FieldComponent implements OnDestroy, OnInit {

  public fieldMode = FieldMode;
  public fieldType = FieldType;
  public field: Field;
  protected $destory = new EventEmitter();

  public changed(event?) {
    this.fieldEditor.$fieldChanged.emit({ field: this.field, event: event });
  }

  @Input('field') set _field(field: Field) {
    this.setField(field);
  }

  public setField(field) {
    this.field = this.initField(field);
  }

  @Input() fieldEditor: FieldEditorComponent;

  ngOnDestroy() {
    this.$destory.complete();
  }

  ngOnInit(): void {
    this.field = this.initField(this.field);
  }

  initField(field) {
    if (!field) {
      field = {};
    }

    if (!field.data) {
      field.data = { value: '' };
    }

    if (field.config.type === FieldType.Checkbox ||
        field.config.type === FieldType.Choice ||
        field.config.type === FieldType.Dropdown) {

      if (!field.config.options) {
        field.config.options = [];
      }

      if (!field.data.other && (field.config.type === FieldType.Checkbox || field.config.type === FieldType.Choice)) {
        field.data.other = { selected: false, value: '' };
      }
    }

    if (field.config.type === FieldType.Name) {
      if (!field.config.first_name) {
        field.config.first_name = { display: true, label: 'First Name' };
      }

      if (!field.config.last_name) {
        field.config.last_name = { display: true, label: 'Last Name' };
      }
    }

    if (field.config.type === FieldType.File) {
      if (field.config.max_width === undefined ) {
        field.config.max_width = 1024;
      }

      if (field.config.max_height === undefined ) {
        field.config.max_height = 768;
      }

      if (field.config.image_quality === undefined ) {
        field.config.image_quality = .8;
      }

      if (field.config.allowed_file_types === undefined ) {
        field.config.allowed_file_types = {
          image: true,
          video: true,
          other: true
        };
      }

      if (field.config.allow_multiple === undefined ) {
        field.config.allow_multiple = true;
      }
    }

    if (field.config.type === FieldType.Gender) {
      if (!field.config.genders) {
        field.config.genders = [
          { name: 'Male', value: 'male' },
          { name: 'Female', value: 'female' },
          { name: 'Transgender', value: 'transgender' },
          { name: 'Prefer not to say', value: 'not_specified' }
        ];
      }
    }

    if (field.config.type === FieldType.Address) {
      if (!field.config.street) {
        field.config.street = { enabled: true, label: 'Street' };
      }

      if (!field.config.address2) {
        field.config.address2 = { enabled: false, label: 'Address 2' };
      }

      if (!field.config.city) {
        field.config.city = { enabled: true, label: 'City' };
      }

      if (!field.config.region) {
        field.config.region = { enabled: true, label: 'State/Province' };
      }

      if (!field.config.zip) {
        field.config.zip = { enabled: true, label: 'Zip/Postal Code' };
      }

      if (!field.config.country) {
        field.config.country = { enabled: true, label: 'Country' };
      }
    }

    if (!field.data.guid) {
      field.data.guid = guid();
    }

    return field;
  }
}
