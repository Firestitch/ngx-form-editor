import { Component, Input } from '@angular/core';

import {CdkDragDrop, moveItemInArray, copyArrayItem} from '@angular/cdk/drag-drop';

import { FormEditorConfig } from '../../interfaces';

@Component({
  selector: 'fs-form-editor',
  templateUrl: 'form-editor.component.html',
  styleUrls: [ 'form-editor.component.scss' ],
})
export class FormEditorComponent {

  @Input() config: FormEditorConfig;
  @Input() form;
  constructor() {}

  drop(event: CdkDragDrop<string[]>) {
    if (event.container === event.previousContainer) {
      moveItemInArray(this.form.fields, event.previousIndex, event.currentIndex);
    } else {
      this.form.fields.splice(event.currentIndex, 0, event.item.data);
    }
  }
}
