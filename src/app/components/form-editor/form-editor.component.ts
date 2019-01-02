import { Component, Input } from '@angular/core';

import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Field } from '../../interfaces';

@Component({
  selector: 'fs-form-editor',
  templateUrl: 'form-editor.component.html',
  styleUrls: [ 'form-editor.component.scss' ],
})
export class FormEditorComponent {

  @Input() fields: Field[];
  constructor() {}

  drop(event: CdkDragDrop<string[]>) {
    if (event.container === event.previousContainer) {
      moveItemInArray(this.fields, event.previousIndex, event.currentIndex);
    } else {
      this.fields.splice(event.currentIndex, 0, event.item.data);
    }
  }
}
