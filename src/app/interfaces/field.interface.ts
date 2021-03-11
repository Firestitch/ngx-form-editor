import { FieldType } from '../enums';
import { Observable } from 'rxjs';


export interface Field {
  config: {
    guid?: string,
    type?: FieldType | string,
    label?: string,
    description?: string,
    hasDescriptionNote?: boolean,
    configs?: any,
    required?: boolean,
  },
  data?: any,
}

export interface FieldEditorConfig {
  fields?: Field[],
  toolbar?: Toolbar,
  fieldDrop?: Function,
  fieldChanged?: (field?: Field) => void,
  fieldAdd?: Function,
  fieldAdded?: Function,
  fieldSelected?: Function,
  fieldUnselected?: Function,
  fieldMoved?: Function,
  fieldDuplicate?: Function,
  fieldDuplicated?: Function,
  fieldRemoved?: Function,
  case?: 'camel' | 'snake',
  imageUpload?: (field: Field, file: File) => Observable<string>,
  fileUpload?: (field: Field, file: File) => Observable<{ name: string, url: string }>,
  fileRemove?: (field: Field, data: any) => Observable<boolean>,
  fileRemoved?: (field: Field, data: any) => void,
  fileDownload?: (field: Field, data: any) => void,
}

export interface FieldRendererConfig {
  fields?: Field[],
  fieldChanged?: (field?: Field) => void,
}

export interface Toolbar {
  items: ToolbarItems;
}

export type ToolbarItems = ToolbarItem[] | ToolbarSection[];

export interface ToolbarItem {
  icon?: string;
  label?: string;
  type: FieldType | string;
  divide?: boolean;
  disabled?: boolean;
}

export interface ToolbarSection {
  section: string;
  items: ToolbarItem[];
}
