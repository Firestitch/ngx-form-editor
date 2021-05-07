import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { FieldComponent } from '../../field/field.component';

@Component({
  selector: 'fs-field-config-content',
  templateUrl: 'field-config-content.component.html',
  styleUrls: ['field-config-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldConfigContentComponent extends FieldComponent implements OnInit {

  // public options: FsEditorRichTextOptions = {};

  ngOnInit() {
    super.ngOnInit();

    this.field.config.configs = {
      ...this.field.config.configs,
      autofocus: false,
    };

    // if (this.fieldEditor.config.imageUpload) {
    //   this.options.image = {
    //     upload: (file: File) => {
    //       return this.fieldEditor.config.imageUpload(this.field, file);
    //     }
    //   }
    // }
  }

}
