import { FieldOption } from './field-option.interface';

export enum FieldType {
  DROPDOWN = 'dropdown',
  SHORT_TEXT = 'shorttext',
  LONG_TEXT = 'longtext',
  NAME = 'name',
  CHOICE = 'choice',
  PHONE = 'phone',
  EMAIL = 'email',
  TIME = 'time',
  CHECKBOXES = 'checkbox',
  DATE = 'date',
  FILE = 'file'
}

export enum FieldState {
  ACTIVE = 'active',
  DELETED = 'delete'
}

export interface Field {
  id?: number,
  guid?: string,
  type: FieldType,
  label: string,
  description: string,
  hasDescription: boolean,
  state: FieldState,
  other?: boolean,
  field_options?: FieldOption[]
}
