import { Component, Input } from '@angular/core';

import { guid } from '@firestitch/common/util';

import { Field, FieldType, FieldState } from '../../interfaces';
import { FieldEditorComponent } from '../field-editor';


@Component({
  selector: 'fs-field-toolbar',
  templateUrl: 'field-toolbar.component.html',
  styleUrls: [ 'field-toolbar.component.scss' ],
})
export class FieldToolbarComponent {

  @Input() fieldEditor: FieldEditorComponent;
  public field: Field = null;
  public expand = false;

  public items: { icon: string, label: string, type: FieldType, divide?: boolean}[] = [
    { icon: 'short_text', label: 'Short Text', type: FieldType.ShortText },
    { icon: 'subject', label: 'Long Text', type: FieldType.LongText },
    { icon: 'text_format', label: 'Rich Text', type: FieldType.RichText, divide: true },
    { icon: 'arrow_drop_down_circle', label: 'Dropdown', type: FieldType.Dropdown },
    { icon: 'radio_button_checked', label: 'Choice', type: FieldType.Choice },
    { icon: 'check_box', label: 'Checkboxes', type: FieldType.Checkbox },
    { icon: 'date_range', label: 'Date', type: FieldType.Date },
    { icon: 'access_time', label: 'Time', type: FieldType.Time, divide: true },
    { icon: 'person', label: 'Name', type: FieldType.Name },
    { icon: 'phone', label: 'Phone', type: FieldType.Phone },
    { icon: 'email', label: 'Email', type: FieldType.Email, divide: true },
    { icon: 'publish', label: 'File', type: FieldType.File }
  ];

  constructor() {}

  dragStarted(item: { icon: string, label: string, type: FieldType }) {
    this.fieldEditor.unselectField();
    this.field = {
      guid: guid(),
      type: item.type,
      state: FieldState.Active,
      label: item.label,
      description: '',
      hasDescription: false,
    };
  }
}
