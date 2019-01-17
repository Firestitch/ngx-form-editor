import { Component, OnInit } from '@angular/core';
import { guid } from '@firestitch/common/util';

import { FieldComponent } from '../field/field.component';
import { FieldType } from '../../interfaces';


@Component({
  selector: 'fs-field-field-text',
  templateUrl: 'field-text.component.html',
  styleUrls: ['field-text.component.scss'],
})
export class FieldTextComponent extends FieldComponent implements OnInit {

  public options: any = {};

  ngOnInit(): void {

    if (!this.field.data || !this.field.data.guid) {
      this.field.data = {
        field_id: this.field.config.id || null,
        value: '',
        guid: guid(),
      }
    }

    if (this.field.config.type === FieldType.RichText) {
      this.options = {
        placeholder: this.field.config.label,
      }
    }
  }
}
