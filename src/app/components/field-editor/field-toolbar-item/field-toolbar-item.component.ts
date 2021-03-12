import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { MatMenuTrigger } from '@angular/material/menu';

import { CdkDragDrop } from '@angular/cdk/drag-drop';

import { guid } from '@firestitch/common';

import { FieldEditorComponent } from '../../field-editor/field-editor.component';
import { Field, ToolbarItem } from '../../../interfaces/field.interface';
import { FieldType } from '../../../enums/field-type';
import { BACKDROP_CLASS, BACKDROP_HIDDEN_CLASS } from '../../../constants/backdrop-class';


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
  public menuTrigger: MatMenuTrigger;

  @Input()
  public fieldEditor: FieldEditorComponent;

  public field: Field = null;

  constructor() {}

  private get _backdrop(): Element {
    return document.getElementsByClassName(BACKDROP_CLASS).item(0);
  }

  public dragStarted(item: ToolbarItem): void {
    this._hideMenuBackdrop();
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

  public dragDropped(event: CdkDragDrop<any>): void {
    this._restoreMenuBackdrop();

    if (event.container !== event.previousContainer) {
      this.menuTrigger.closeMenu();
    }
  }

  private _hideMenuBackdrop(): void {
    const backdropEl = this._backdrop;

    if (backdropEl) {
      backdropEl.classList.add(BACKDROP_HIDDEN_CLASS)
    }
  }

  private _restoreMenuBackdrop(): void {
    const backdropEl = this._backdrop;

    if (backdropEl) {
      backdropEl.classList.remove(BACKDROP_HIDDEN_CLASS)
    }
  }
}
