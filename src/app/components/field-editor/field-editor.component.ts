import { Component, Input, HostListener } from '@angular/core';

import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Field } from '../../interfaces';

@Component({
  selector: 'fs-field-editor',
  templateUrl: 'field-editor.component.html',
  styleUrls: [ 'field-editor.component.scss' ],
})
export class FieldEditorComponent {

  public selectedField = null;
  public fieldEditor: FieldEditorComponent = this;

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.clearSelectedField();
  }

  @Input() fields: Field[];

  constructor() {}

  fieldClick(field) {
    this.selectField(field);
  }

  fieldDragStart() {
    this.clearSelectedField();
  }

  clearSelectedField() {
    this.selectedField = null;
  }

  selectField(field: Field) {
    this.selectedField = field;
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.container === event.previousContainer) {
      moveItemInArray(this.fields, event.previousIndex, event.currentIndex);
    } else {
      this.fields.splice(event.currentIndex, 0, event.item.data);
    }
  }
}
