import { Component } from '@angular/core';

import { FieldComponent } from '../field/field.component';
import { FsEditorRichTextOptions } from '@firestitch/editor';


@Component({
  selector: 'fs-field-config-content',
  templateUrl: 'field-config-content.component.html',
  styleUrls: [ 'field-config-content.component.scss' ],
})
export class FieldConfigContentComponent extends FieldComponent {
  public options: FsEditorRichTextOptions = {};
}
