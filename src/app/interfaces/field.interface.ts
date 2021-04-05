import { FieldType } from '../enums/field-type';
import { Observable } from 'rxjs';
import { CdkDragDrop } from '@angular/cdk/drag-drop';


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

export interface FsFieldEditorCallbackParams {
  field?: Field;
  fields?: Field[];
  event?: PointerEvent | CdkDragDrop<unknown> | Event;
  toolbarField?: ToolbarItem;
}

export type FsFieldEditorCallbackFn = (data: FsFieldEditorCallbackParams) => void

export interface FieldEditorConfig {
  fields?: Field[],
  toolbar?: Toolbar,
  fieldDrop?: Function,
  fieldChanged?: (field?: Field) => void,
  fieldAdd?: FsFieldEditorCallbackFn,
  fieldAdded?: FsFieldEditorCallbackFn,
  fieldSelected?: FsFieldEditorCallbackFn,
  fieldUnselected?: FsFieldEditorCallbackFn,
  fieldMoved?: FsFieldEditorCallbackFn,
  fieldDuplicate?: FsFieldEditorCallbackFn,
  fieldDuplicated?: FsFieldEditorCallbackFn,
  fieldRemoved?: FsFieldEditorCallbackFn,
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
  config?: Record<string, unknown>;
}

export interface ToolbarSection {
  section: string;
  items: ToolbarItem[];
}
