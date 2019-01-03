import { FieldOption } from './field-option.interface';

export enum FieldType {
  Dropdown = 'dropdown',
  ShortText = 'shorttext',
  LongText = 'longtext',
  Name = 'name',
  Choice = 'choice',
  Phone = 'phone',
  Email = 'email',
  Time = 'time',
  Checkbox = 'checkbox',
  Date = 'date',
  File = 'file',
  RichText = 'richtext'
}

export enum FieldState {
  Active = 'active',
  Deleted = 'delete'
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
  field_options?: FieldOption[],
  configs?: any
}
