import { Component, Input } from '@angular/core';
import { FormEditorConfig } from 'src/app/interfaces';

@Component({
  selector: 'fs-form-field-options',
  templateUrl: 'field-options.component.html',
  styleUrls: [ 'field-options.component.scss' ],
})
export class FieldOptionsComponent {

  @Input() config: FormEditorConfig;
  @Input() field;

  constructor() {
  }

}
