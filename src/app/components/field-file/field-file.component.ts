import { Component, Input } from '@angular/core';

import { FsFile, FileProcessor } from '@firestitch/file';
import { guid } from '@firestitch/common/util';

import { FieldComponent } from '../field/field.component';
import { Field } from '../../interfaces';


@Component({
  selector: 'fs-field-file',
  templateUrl: 'field-file.component.html',
  styleUrls: [ 'field-file.component.scss' ],
})
export class FieldFileComponent extends FieldComponent {

  public allowedTypes = '';
  public selectedFiles: FsFile[] = [];

  private _fileProcessor = new FileProcessor();

  @Input('field') set setField(field: Field) {

    field = this.initField(field);

    if (field.data.value && field.data.value.length) {
      field.data.value.forEach(file => this.selectedFiles.push(new FsFile(file.url, file.name)));
    } else {
      field.data.value = [];
    }

    this.field = field;
  }

  ngOnInit(): void {
    super.ngOnInit();

    if (!this.field.config.settings || Array.isArray(this.field.config.settings)) {
      this.field.config.settings = {
        max_width: 1024,
        max_height: 768,
        image_quality: 0.8,
        allowed_file_types: {
          image: true,
          video: true,
          other: true
        },
        allow_multiple: true,
      }
    }
  }

  public getAllowedTypes() {

    const allowed = [];

    if (this.field.config.settings.allowed_file_types.image) {
      allowed.push('image/*');
    }

    if (this.field.config.settings.allowed_file_types.video) {
      allowed.push('video/*');
    }

    if (this.field.config.settings.allowed_file_types.other) {
      allowed.push('application/*');
      allowed.push('audio/*');
      allowed.push('text/*');
      allowed.push('message/*');
      allowed.push('model/*');
    }

    this.allowedTypes = allowed.join(',');
  }

  public selectFile(files: any) {

    if (!this.field.config.settings.allow_multiple) {
      this.selectedFiles = [];
      this.field.data.value = [];
    }

    // this needed because fsFilePicker returns array if it in multiple mode,
    // while it returns single file in it in single file mode
    if (files instanceof FsFile) {
      files = [files];
    }

    files.forEach(file => {

      if (file.typeImage === true) {
        this._fileProcessor.process(file, {
          quality: this.field.config.settings.image_quality,
          width: this.field.config.settings.max_width,
          height: this.field.config.settings.max_height
        }).subscribe(resFile => {
          this.selectedFiles.push(resFile);
          this.field.data.value.push(resFile.file);
        });
      } else {
        this.selectedFiles.push(file);
        this.field.data.value.push(file.file);
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
}
