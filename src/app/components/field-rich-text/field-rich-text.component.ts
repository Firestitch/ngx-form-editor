import { Component } from '@angular/core';

import { guid } from '@firestitch/common';
import { FieldComponent } from '../field/field.component';


@Component({
  selector: 'fs-field-rich-text',
  templateUrl: 'field-rich-text.component.html',
  styleUrls: ['field-rich-text.component.scss'],
})
export class FieldRichTextComponent extends FieldComponent {

  public options: any = {};
  public name = guid();

  ngOnInit() {
    super.ngOnInit();
    this.options = {
      placeholder: ''
    }
  }
}
