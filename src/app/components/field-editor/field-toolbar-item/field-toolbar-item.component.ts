import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { guid } from '@firestitch/common';

import { FieldEditorComponent } from '../../field-editor/field-editor.component';
import { Field, ToolbarItem } from '../../../interfaces/field.interface';
import { FieldType } from '../../../enums/field-type';


@Component({
  selector: 'fs-field-toolbar-item',
  templateUrl: 'field-toolbar-item.component.html',
  styleUrls: [ 'field-toolbar-item.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldToolbarItemComponent {

  @Input()
  public item: ToolbarItem;

  @Input()
  public fieldEditor: FieldEditorComponent;

  public field: Field = null;

  public dragStarted(item: { icon: string, label: string, type: FieldType }) {
    this.fieldEditor.unselectField();
    this.field = {
      config: {
        guid: guid(),
        type: item.type,
        label: item.label,
        description: '',
        hasDescriptionNote: false
      },
      data: {
        value: null,
        guid: guid()
      }
    };

    if (this.field.config.type === FieldType.Content) {
      const content = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
        'Etiam vel lacus non nulla iaculis pharetra vitae vel massa. ' +
        'Aliquam hendrerit pharetra metus, ac vehicula enim dapibus vitae.';
      this.field.config.configs = { content: [{ insert: content }] };
    }
  }

}
