import { Component, Input, OnInit } from '@angular/core';

import { FieldComponent } from '../field/field.component';
import { FsEditorRichTextOptions } from '@firestitch/editor';
import { ControlContainer, NgForm } from '@angular/forms';

@Component({
  selector: 'fs-field-render-rich-text',
  templateUrl: 'field-render-rich-text.component.html',
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ]
})
export class FieldRenderRichTextComponent extends FieldComponent implements OnInit {

  @Input() config;

  public options: FsEditorRichTextOptions = {};

  ngOnInit() {
    super.ngOnInit();
    if (this.config.imageUpload) {
      this.options.image = {
        upload: (file: File) => {
          return this.config.imageUpload(this.field, file);
        }
      }
    }
  }
}
