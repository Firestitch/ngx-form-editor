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
}

export enum FieldState {
  ACTIVE = 'active',
  DELETED = 'delete'
}

export interface Field {
  guid?: string,
  type: FieldType,
  label: string,
  description: string,
  hasDescription: boolean,
  state: FieldState,
  other?: boolean,
  options?: FieldOption[]
}

export interface FieldOption {
  guid?: string,
  label: string
}
