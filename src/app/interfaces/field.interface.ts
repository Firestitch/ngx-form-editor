import { FieldType } from './field-type.interface';
import { Observable } from 'rxjs';

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
    type: FieldType | 'string',
    label?: string,
    description?: string,
    hasDescriptionNote?: boolean,
    configs?: any,
    required?: boolean
  },
  data?: any
}

export interface FieldEditorConfig {
  fields?: Field[],
  toolbar?: Toolbar,
  fieldDrop?: Function,
  fieldChanged?: Function,
  fieldAdd?: Function,
  fieldAdded?: Function,
  fieldSelected?: Function,
  fieldUnselected?: Function,
  fieldMoved?: Function,
  fieldDuplicate?: Function,
  fieldDuplicated?: Function,
  fieldRemoved?: Function,
  imageUpload?: (field: Field, file: File) => Observable<string>,
  fileUpload?: (field: Field, file: File) => Observable<{ name: string, url: string }>
  fileRemove?: (field: Field, data: any) => Observable<boolean>
  fileDownload?: (field: Field, data: any) => void
}

export interface Toolbar {
  items: ToolbarItem[];
}

export interface ToolbarItem {
  icon?: string;
  label?: string
  type: FieldType | string,
  divide?: boolean
}


