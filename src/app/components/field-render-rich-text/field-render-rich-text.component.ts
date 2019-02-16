import { Component } from '@angular/core';

import { guid } from '@firestitch/common/util';
import { FieldComponent } from '../field/field.component';


@Component({
  selector: 'fs-field-render-rich-text',
  templateUrl: 'field-render-rich-text.component.html'
})
export class FieldRenderRichTextComponent extends FieldComponent {

  public options: any = {};
  public name = guid();

  ngOnInit() {
    super.ngOnInit();
    this.options = {
      placeholder: ''
    }
  }
}
