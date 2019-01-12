import { Component, OnInit } from '@angular/core';
import { guid } from '@firestitch/common/util';

import { FieldComponent } from '../field/field.component';
import { Field, FieldType } from '../../interfaces';


@Component({
  selector: 'fs-field-field-text',
  templateUrl: 'field-text.component.html',
  styleUrls: ['field-text.component.scss'],
})
export class FieldTextComponent extends FieldComponent implements OnInit {

  ngOnInit(): void {

    if (!this.field.data || !this.field.data.guid) {
      this.field.data = {
        field_id: this.field.config.id || null,
        value: '',
        guid: guid(),
      }
    }
  }
}
