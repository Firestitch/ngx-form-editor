import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FsHtmlEditorConfig } from '@firestitch/html-editor';

import { FieldComponent } from '../../field/field.component';

@Component({
  selector: 'fs-field-config-content',
  templateUrl: 'field-config-content.component.html',
  styleUrls: ['field-config-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldConfigContentComponent extends FieldComponent implements OnInit {

  public config: FsHtmlEditorConfig = {};

  ngOnInit() {
    super.ngOnInit();

    this.config = {
      ...this.field.config.configs,
      autofocus: false,
    };

    if (this.fieldEditor.config.imageUpload) {
      this.config.image = {
        upload: (file: File) => {
          return this.fieldEditor.config.imageUpload(this.field, file);
        }
      }
    }
  }

}
