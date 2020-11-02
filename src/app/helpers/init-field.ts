import { guid } from '@firestitch/common';
import { FieldType } from '../enums';
import { isObject } from 'lodash-es';


export function initField(field) {

    if (!field) {
      field = {};
    }

    if (!field.data) {
      field.data = { value: '' };
    }

    if (!field.config) {
      field.config = {};
    }

    if (!field.config.configs) {
      field.config.configs = {};
    }

    if (field.config.type === FieldType.Checkbox ||
        field.config.type === FieldType.Choice ||
        field.config.type === FieldType.Dropdown) {

      if (!field.config.configs.options) {
        field.config.configs.options = [];
      }

      if (field.config.type === FieldType.Checkbox ||
          field.config.type === FieldType.Choice) {

        const selected = field.config.type === FieldType.Checkbox ? [] : null;

        if (!isObject(field.data.value)) {
          field.data.value = { selected: selected };
        }
      }
    }

  if (field.config.type === FieldType.Name) {

      if (!field.config.configs.firstName) {
        field.config.configs.firstName = { display: true, label: 'First Name' };
      }

      if (!field.config.configs.lastName) {
        field.config.configs.lastName = { display: true, label: 'Last Name' };
      }
    }

    if (field.config.type === FieldType.File) {
      if (field.config.configs.maxWidth === undefined ) {
        field.config.configs.maxWidth = 1024;
      }

      if (field.config.configs.maxHeight === undefined ) {
        field.config.configs.maxHeight = 768;
      }

      if (field.config.configs.imageQuality === undefined ) {
        field.config.configs.imageQuality = .8;
      }

      if (field.config.configs.allowedFileTypes === undefined ) {
        field.config.configs.allowedFileTypes = {
          image: true,
          video: true,
          other: true
        };
      }

      if (field.config.configs.allowMultiple === undefined ) {
        field.config.configs.allowMultiple = true;
      }
    }

    if (field.config.type === FieldType.Gender) {
      if (!field.config.configs.genders) {
        field.config.configs.genders = [
          { name: 'Male', value: 'male' },
          { name: 'Female', value: 'female' },
          { name: 'Other', value: 'other' },
        ];
      }
    }

    if (field.config.type === FieldType.Address) {

      if (!isObject(field.data.value)) {
        field.data.value = {};
      }

      if (!field.config.configs.street) {
        field.config.configs.street = { enabled: true, label: 'Street' };
      }

      if (!field.config.configs.address2) {
        field.config.configs.address2 = { enabled: false, label: 'Address 2' };
      }

      if (!field.config.configs.city) {
        field.config.configs.city = { enabled: true, label: 'City' };
      }

      if (!field.config.configs.region) {
        field.config.configs.region = { enabled: true, label: 'State/Province' };
      }

      if (!field.config.configs.zip) {
        field.config.configs.zip = { enabled: true, label: 'Zip/Postal Code' };
      }

      if (!field.config.configs.country) {
        field.config.configs.country = { enabled: true, label: 'Country' };
      }
    }

    if (!field.data.guid) {
      field.data.guid = guid();
    }

    if (field.config.type === FieldType.Heading && !field.config.configs.type) {
      field.config.configs.type = 1;
    }

    return field;
  }
