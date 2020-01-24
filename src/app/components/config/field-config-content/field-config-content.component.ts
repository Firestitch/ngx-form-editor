import { Component, OnInit } from '@angular/core';

import { FieldComponent } from '../../field/field.component';
import { FsEditorRichTextOptions } from '@firestitch/editor';
import { of } from 'rxjs';


@Component({
  selector: 'fs-field-config-content',
  templateUrl: 'field-config-content.component.html',
  styleUrls: [ 'field-config-content.component.scss' ],
})
export class FieldConfigContentComponent extends FieldComponent implements OnInit {
  public options: FsEditorRichTextOptions = {};

  ngOnInit() {
    super.ngOnInit();

    if (this.fieldEditor.config.imageUpload) {
      this.options.image = {
        upload: (file: File) => {
          return this.fieldEditor.config.imageUpload(this.field, file);
        }
      }
    }
  }
}
