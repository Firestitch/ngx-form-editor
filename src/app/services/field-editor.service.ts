import { FieldEditorConfig } from '../interfaces/field.interface';
import { FS_FIELD_EDITOR_CONFIG } from '../injectors/fs-field-editor.providers';
import { Injectable, Inject } from '@angular/core';
import * as _snakecaseKeys from 'snakecase-keys';
import * as _camelcaseKeys from 'camelcase-keys';
import { isArray } from 'lodash-es';

const snakecaseKeys = _snakecaseKeys;
const camelcaseKeys = _camelcaseKeys;

@Injectable()
export class FieldEditorService {

  constructor(@Inject(FS_FIELD_EDITOR_CONFIG) private _config: FieldEditorConfig) {}

  public input(data) {
    if (isArray(data)) {
      return data.map(item => {
        return this._config.case === 'snake' ? camelcaseKeys(item, { deep: true }) : item;
      });
    } else {
      return this._config.case === 'snake' ? camelcaseKeys(data, { deep: true }) : data;
    }
  }

  public output(data) {
    if (isArray(data)) {
      return data.map(item => {
        return this._config.case === 'snake' ? snakecaseKeys(item, { deep: true }) : item;
      });
    } else if (data) {
      return this._config.case === 'snake' ? snakecaseKeys(data, { deep: true }) : data;
    }
  }
}
