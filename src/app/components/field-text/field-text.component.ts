import { Component, Input } from '@angular/core';
import { FormEditorConfig } from 'src/app/interfaces';

@Component({
  selector: 'fs-form-field-text',
  templateUrl: 'field-text.component.html',
  styleUrls: [ 'field-text.component.scss' ],
})
export class FieldTextComponent {

  @Input() config: FormEditorConfig;
  @Input() field;
  @Input() form;
  constructor() {
  }

}
