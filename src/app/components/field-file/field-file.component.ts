import { Component, Input, OnInit } from '@angular/core';

import { FieldComponent } from '../field/field.component';


@Component({
  selector: 'fs-field-field-file',
  templateUrl: 'field-file.component.html',
  styleUrls: [ 'field-file.component.scss' ],
})
export class FieldFileComponent extends FieldComponent implements OnInit {

  ngOnInit(): void {
    if (!this.field.configs || Array.isArray(this.field.configs)) {
      this.field.configs = {
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
}
