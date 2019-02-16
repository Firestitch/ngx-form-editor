import { Component, Input } from '@angular/core';

import { FsFile, FileProcessor } from '@firestitch/file';

import { FieldComponent } from '../field/field.component';
import { Field } from '../../interfaces';


@Component({
  selector: 'fs-field-render-file',
  templateUrl: 'field-render-file.component.html',
  styleUrls: [ 'field-render-file.component.scss' ],
})
export class FieldRenderFileComponent extends FieldComponent {

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

  public selectFile(files: any) {

    if (!this.field.config.allow_multiple) {
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
          quality: this.field.config.image_quality,
          width: this.field.config.max_width,
          height: this.field.config.max_height
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
