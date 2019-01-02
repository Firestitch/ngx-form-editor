import { Component } from '@angular/core';

import { guid } from '@firestitch/common/util';

import { Field, FieldType, FieldState } from '../../interfaces';


@Component({
  selector: 'fs-form-toolbar',
  templateUrl: 'form-toolbar.component.html',
  styleUrls: [ 'form-toolbar.component.scss' ],
})
export class FormToolbarComponent {

  public field: Field = null;

  public items: { icon: string, label: string, type: FieldType, divide?: boolean}[] = [
    { icon: 'short_text', label: 'Short Text', type: FieldType.SHORT_TEXT },
    { icon: 'subject', label: 'Long Text', type: FieldType.LONG_TEXT },
    { icon: 'text_format', label: 'Rich Text', type: FieldType.RICH_TEXT, divide: true },
    { icon: 'arrow_drop_down_circle', label: 'Dropdown', type: FieldType.DROPDOWN },
    { icon: 'radio_button_checked', label: 'Choice', type: FieldType.CHOICE },
    { icon: 'check_box', label: 'Checkboxes', type: FieldType.CHECKBOXES },
    { icon: 'date_range', label: 'Date', type: FieldType.DATE },
    { icon: 'access_time', label: 'Time', type: FieldType.TIME, divide: true },
    { icon: 'person', label: 'Name', type: FieldType.NAME },
    { icon: 'phone', label: 'Phone', type: FieldType.PHONE },
    { icon: 'email', label: 'Email', type: FieldType.EMAIL, divide: true },
    { icon: 'publish', label: 'File', type: FieldType.FILE }
  ];

  constructor() {}

  createElement(item: { icon: string, label: string, type: FieldType}) {
    this.field = {
      guid: guid(),
      type: item.type,
      state: FieldState.ACTIVE,
      label: item.label,
      description: '',
      hasDescription: false,
    };
  }
}
