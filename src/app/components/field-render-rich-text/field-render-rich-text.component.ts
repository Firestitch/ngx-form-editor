import { Component, Input } from '@angular/core';

import { guid } from '@firestitch/common';
import { FieldComponent } from '../field/field.component';
import { FsEditorRichTextOptions } from '@firestitch/editor';
import { of } from 'rxjs';
import { FsFile } from '@firestitch/file';


@Component({
  selector: 'fs-field-render-rich-text',
  templateUrl: 'field-render-rich-text.component.html'
})
export class FieldRenderRichTextComponent extends FieldComponent {

  @Input() fileSelected: Function;

  public options: FsEditorRichTextOptions = {
    image: {
      upload: (file: Blob) => {
        if (this.fileSelected) {
          return this.fileSelected({ field: this.field, fsFile: new FsFile(file) });
        }

        return of(null);
      }
    },
  };

  public name = guid();
}
