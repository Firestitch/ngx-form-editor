import { Component, Input } from '@angular/core';

import { get } from 'lodash';

import { FsFile, FileProcessor } from '@firestitch/file';

import { FieldComponent } from '../field/field.component';
import { Field } from '../../interfaces';
import { Observable, from, zip, of } from 'rxjs';


@Component({
  selector: 'fs-field-render-file',
  templateUrl: 'field-render-file.component.html',
  styleUrls: [ 'field-render-file.component.scss' ],
})
export class FieldRenderFileComponent extends FieldComponent {

  @Input() fileSelected: Function;

  public allowedTypes = '';
  public selectedFiles: FsFile[] = [];

  private _fileProcessor = new FileProcessor();

  @Input('field') set _field(field: Field) {

    field = this.initField(field);

    if (field.data.value && field.data.value.length) {
      field.data.value.forEach(file => this.selectedFiles.push(new FsFile(file.url, file.name)));
    } else {
      field.data.value = [];
    }

    this.field = field;
  }

  public getAllowedTypes(allowedTypes) {

    const allowed = [];

    if (allowedTypes.image) {
      allowed.push('image/*');
    }

    if (allowedTypes.video) {
      allowed.push('video/*');
    }

    if (allowedTypes.other) {
      allowed.push('application/*');
      allowed.push('audio/*');
      allowed.push('text/*');
      allowed.push('message/*');
      allowed.push('model/*');
    }

    return allowed.join(',');
  }

  public selectFile(files: any) {

    if (!this.field.config.configs.allow_multiple) {
      this.selectedFiles = [];
      this.field.data.value = [];
    }

    // this needed because fsFilePicker returns array if it in multiple mode,
    // while it returns single file in it in single file mode
    if (files instanceof FsFile) {
      files = [files];
    }

    files.forEach((file, index) => {
      this.processFile(file)
      .subscribe(() => {
        if (this.fileSelected) {

          if (this.field.config.configs.allow_multiple) {
            this.fileSelected({ field: this.field, fsFile: file, index: index });
          } else {
            this.fileSelected({ field: this.field, fsFile: file, index: index });
          }
        }
      });
    });
  }

  private processFile(file) {
    return Observable.create(observer => {
      if (file.typeImage === true) {
        this._fileProcessor.process(file, {
          quality: this.field.config.configs.image_quality,
          width: this.field.config.configs.max_width,
          height: this.field.config.configs.max_height
        }).subscribe(resFile => {
          this.selectedFiles.push(resFile);
          this.field.data.value.push(resFile.file);
          observer.next();
        }, () => {
          observer.console.error();
        }, () => {
          observer.complete();
        });

      } else {
        this.selectedFiles.push(file);
        this.field.data.value.push(file.file);
        observer.next();
        observer.complete();
      }
    });
  }

  public remove(event) {

    let idx = null;
    if (event.file.url) {
      idx = this.field.data.value.findIndex(item => item.url === event.file.url);
    } else {
      idx = this.field.data.value.findIndex(item => item === event.file.file);
    }

    this.field.data.value.splice(idx, 1);
  }

  public initField(field) {

    const config = get(this.field, 'config.configs.allowed_file_types');

    if (config) {
      this.allowedTypes = this.getAllowedTypes(config);
    } else {
      this.allowedTypes = '*/*';
    }

    return super.initField(field);
  }
}
