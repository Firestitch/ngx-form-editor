import { FieldOption } from './field-option.interface';
import { FieldType } from './field-type.interface';

export enum FieldMode {
  Edit = 'edit',
  Render = 'render',
  View = 'view'
}

export enum FieldState {
  Active = 'active',
  Deleted = 'delete'
}

export interface Field {
  config: {
    guid?: string,
    type: FieldType,
    label: string,
    description: string,
    hasDescription: boolean,
    configs?: any,
    required?: boolean
  },
  data?: any
}

export interface FieldEditorConfig {
  fields?: Field[],
  toolbar?: Toolbar,
  fieldDrop?: Function
}

export interface Toolbar {
  items: ToolbarItem[];
}

export interface ToolbarItem {
  icon: string;
  label?: string
  type: FieldType,
  divide?: boolean
}