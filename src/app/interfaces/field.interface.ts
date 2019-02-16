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
    state: FieldState,
    other?: boolean,
    options?: FieldOption[],
    image_quality?: number,
    max_width?: number,
    max_height?: number,
    allow_multiple?: boolean,
    allowed_file_types?: any,
    first_name?: any,
    last_name?: any,
    genders?: any[],
    street?: any,
    address2?: any,
    city?: any,
    region?: any,
    zip?: any,
    country?: any
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