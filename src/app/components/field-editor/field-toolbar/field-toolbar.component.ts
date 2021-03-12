import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

import { Field, ToolbarItems } from '../../../interfaces';
import { FieldEditorComponent } from '..';
import { TOOLBAR_DEFAULTS } from '../../../helpers/toolbar-defaults';
import { BACKDROP_CLASS, TOOLBAR_MENU_CLASS } from '../../../constants/backdrop-class';


@Component({
  selector: 'fs-field-toolbar',
  templateUrl: 'field-toolbar.component.html',
  styleUrls: [ 'field-toolbar.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldToolbarComponent implements OnInit {

  @Input()
  public fieldEditor: FieldEditorComponent;

  public readonly backdropClass = BACKDROP_CLASS;
  public readonly menuClass = TOOLBAR_MENU_CLASS;

  public field: Field = null;
  public expanded = true;
  public withSections = false;

  public get items(): ToolbarItems {
    return this.fieldEditor.config.toolbar.items;
  }

  public get firstItemIsSection(): boolean {
    return this.items[0].hasOwnProperty('section');
  }

  public ngOnInit() {
    this._initItems(this.fieldEditor.config.toolbar.items);
  }

  private _initItems(items: ToolbarItems) {
    items.forEach(item => {
      if (item.section) {
        this._initItems(item.items);
        this.withSections = true;
      } else {
        if (!item.icon || !item.label) {
          const ditem = TOOLBAR_DEFAULTS[item.type];

          if (ditem) {
            item.icon = item.icon ?? ditem.icon;
            item.label = item.label ?? ditem.label;
          }
        }
      }
    });
  }
}
