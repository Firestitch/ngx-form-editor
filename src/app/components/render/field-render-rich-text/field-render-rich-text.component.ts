import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';

import { FsEditorRichTextOptions } from '@firestitch/editor';

import { FieldComponent } from '../../field/field.component';
import { FieldEditorConfig } from './../../../interfaces';

@Component({
  selector: 'fs-field-render-rich-text',
  templateUrl: 'field-render-rich-text.component.html',
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ],
})
export class FieldRenderRichTextComponent extends FieldComponent implements OnInit {

  @Input() config: FieldEditorConfig;

  public options: FsEditorRichTextOptions = {};

  ngOnInit() {
    super.ngOnInit();

    this.options = this.field.config.configs.richTextOptions || {};

    if (this.config.imageUpload) {
      this.options.image = {
        upload: (file: File) => {
          return this.config.imageUpload(this.field, file);
        }
      }
    }
  }
}
