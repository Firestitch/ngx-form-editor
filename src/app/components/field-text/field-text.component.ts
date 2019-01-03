import { Component, Input } from '@angular/core';
import { Field } from '../../interfaces';
import { FieldEditorComponent } from '../field-editor';

@Component({
  selector: 'fs-field-field-text',
  templateUrl: 'field-text.component.html',
  styleUrls: [ 'field-text.component.scss' ],
})
export class FieldTextComponent {

  @Input() field: Field;
  @Input() fieldEditor: FieldEditorComponent;
  @Input() selected = false;

  constructor() {
  }

}
