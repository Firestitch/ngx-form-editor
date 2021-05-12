import { Injectable, Inject, OnDestroy } from '@angular/core';

import { guid } from '@firestitch/common';

import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { cloneDeep } from 'lodash-es';

import {
  Field,
  FieldEditorConfig,
  FsFieldEditorCallbackParams
} from '../interfaces/field.interface';
import { FS_FIELD_EDITOR_CONFIG } from '../injectors/fs-field-editor.providers';
import { initField } from '../helpers/init-field';
import { transformInput } from '../helpers/transform-input';
import { transformOutput } from '../helpers/transform-output';


@Injectable()
export class FieldEditorService implements OnDestroy {

  public config: FieldEditorConfig = {};
  public editorId = 'fs-fields-' + guid();

  private _selectedField$ = new BehaviorSubject<Field>(null);
  private _destroy$ = new Subject<void>();

  constructor(
    @Inject(FS_FIELD_EDITOR_CONFIG) private _defaultConfig: FieldEditorConfig
  ) {}

  public get selectedField(): Field {
    return this._selectedField$.getValue();
  }

  public get selectedField$(): Observable<Field> {
    return this._selectedField$.asObservable();
  }

  public get fields(): Field[] {
    return cloneDeep(this.config.fields);
  }

  public set fields(fields: Field[]) {
    this.config.fields = fields;
  }

  public get hasFields(): boolean {
    return !!this.config?.fields;
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public selectField(field: Field) {
    if (this.selectedField) {
      this.unselectField();
    }

    this._selectedField$.next(field);
    this.fieldSelected({ field });
  }

  public unselectField() {
    this.fieldUnselected({
      field: this.selectedField
    });

    this._selectedField$.next(null);
  }

  public setConfig(config: FieldEditorConfig) {
    this.config = { ...this._defaultConfig, ...config };

    if (this.config.fields) {
      this.config.fields = transformInput(this.config.fields, this.config.case);

      this.config.fields = this.config.fields.map((field) => {
        return initField(field);
      });
    }
  }

  public fieldChanged(item: Field) {
    if (this.config.fieldChanged) {
      item = this._prepareItem(item);

      this.config.fieldChanged(item);
    }
  }

  public fieldAdd(item: FsFieldEditorCallbackParams): Observable<unknown> | void {
    if (this.config.fieldAdd) {
      item = this._prepareItem(item);

      return this.config.fieldAdd(item);
    }
  }

  public fieldAdded(item: FsFieldEditorCallbackParams) {
    if (this.config.fieldAdded) {
      item = this._prepareItem(item);

      this.config.fieldAdded(item);
    }
  }

  public fieldSelected(item: FsFieldEditorCallbackParams) {
    if (this.config.fieldSelected) {
      item = this._prepareItem(item);

      this.config.fieldSelected(item);
    }
  }

  public fieldUnselected(item: FsFieldEditorCallbackParams) {
    if (this.config.fieldUnselected) {
      item = this._prepareItem(item);

      this.config.fieldUnselected(item);
    }
  }

  public fieldMoved(item: FsFieldEditorCallbackParams) {
    if (this.config.fieldMoved) {
      item = this._prepareItem(item);

      this.config.fieldMoved(item);
    }
  }

  public fieldDuplicate(item: FsFieldEditorCallbackParams) {
    if (this.config.fieldDuplicate) {
      item = this._prepareItem(item);

      this.config.fieldDuplicate(item);
    }
  }

  public fieldDrop(item: FsFieldEditorCallbackParams) {
    if (this.config.fieldDrop) {
      item = this._prepareItem(item);

      this.config.fieldDrop(item);
    }
  }

  public fieldDuplicated(item: FsFieldEditorCallbackParams) {
    if (this.config.fieldDuplicated) {
      item = this._prepareItem(item);

      this.config.fieldDuplicated(item);
    }
  }

  public fieldRemoved(item: FsFieldEditorCallbackParams) {
    if (this.config.fieldRemoved) {
      item = this._prepareItem(item);

      this.config.fieldRemoved(item);
    }
  }

  private _prepareItem(params: Field | FsFieldEditorCallbackParams) {
    const item = {
      fields: cloneDeep(this.config.fields),
      ...params,
    };

    return transformOutput(item, this.config.case);
  }
}
