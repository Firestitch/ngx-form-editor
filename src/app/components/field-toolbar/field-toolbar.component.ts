import { Component, Input, OnInit } from '@angular/core';

import { guid } from '@firestitch/common';

import { Field, FieldType, FieldState, ToolbarItem } from '../../interfaces';
import { FieldEditorComponent } from '../field-editor';


@Component({
  selector: 'fs-field-toolbar',
  templateUrl: 'field-toolbar.component.html',
  styleUrls: [ 'field-toolbar.component.scss' ],
})
export class FieldToolbarComponent implements OnInit {

  @Input() fieldEditor: FieldEditorComponent;
  public field: Field = null;
  public expand = false;

  public items: ToolbarItem[] = [];

  ngOnInit() {

    const defaults = {};
    defaults[FieldType.ShortText] = { icon: 'short_text', label: 'Short Text'};
    defaults[FieldType.LongText] = { icon: 'subject', label: 'Long Text' };
    defaults[FieldType.RichText] = { icon: 'text_format', label: 'Rich Text'};
    defaults[FieldType.Dropdown] = { icon: 'arrow_drop_down_circle', label: 'Dropdown' };
    defaults[FieldType.Choice] = { icon: 'radio_button_checked', label: 'Choice' };
    defaults[FieldType.Checkbox] = { icon: 'check_box', label: 'Checkboxes' };
    defaults[FieldType.Date] = { icon: 'date_range', label: 'Date' };
    defaults[FieldType.Time] = { icon: 'access_time', label: 'Time' };
    defaults[FieldType.Name] = { icon: 'person', label: 'Name' };
    defaults[FieldType.Phone] = { icon: 'phone', label: 'Phone' };
    defaults[FieldType.Email] = { icon: 'email', label: 'Email' };
    defaults[FieldType.File] =  { icon: 'publish', label: 'File' };

    this.fieldEditor.config.toolbar.items.forEach(item => {

      if (!item.icon || !item.label) {
        const ditem = defaults[item.type];

        if (ditem) {
          item.icon = item.icon || ditem.icon;
          item.label = item.label || ditem.label;
        }
      }
    });

  }

  dragStarted(item: { icon: string, label: string, type: FieldType }) {
    this.fieldEditor.unselectField();
    this.field = {
      config: {
        guid: guid(),
        type: item.type,
        state: FieldState.Active,
        label: item.label,
        description: '',
        hasDescription: false,
      },
      data: {
        value: null,
        guid: guid()
      }
    };
  }
}
