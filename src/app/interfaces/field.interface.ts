export enum FieldType {
  DROPDOWN = 'dropdown',
  SHORT_TEXT = 'shorttext',
  LONG_TEXT = 'longtext',
  NAME = 'name',
  CHOICE = 'choice',
  PHONE = 'phone',
  EMAIL = 'email',
  TIME = 'time',
  CHECKBOXES = 'checkboxes',
}

export enum FieldState {
  ACTIVE = 'active',
  DELETED = 'delete'
}

export interface Field {
  id?: number,
  type: FieldType,
  label: string,
  description: string,
  hasDescription: boolean,
  state: FieldState,
  other?: boolean,
  options?: Array<FieldOption>
}

export interface FieldOption {
  id?: number,
  label: string
}