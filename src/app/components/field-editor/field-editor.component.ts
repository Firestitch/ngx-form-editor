import { Component, Input, HostListener, EventEmitter, ElementRef, ViewChild } from '@angular/core';

import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Field, FieldType } from '../../interfaces';


@Component({
  selector: 'fs-field-editor',
  templateUrl: 'field-editor.component.html',
  styleUrls: [ 'field-editor.component.scss' ],
})
export class FieldEditorComponent {

  public selectedField = null;
  public $fieldSelected = new EventEmitter();
  public fieldType = FieldType;
  public fieldEditor: FieldEditorComponent = this;

  @ViewChild('fieldsRef') fieldsRef: ElementRef;

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.unselectField();
  }

  // HACK: to support closing of opened field panel when user clicks outside of elements
  private _innerClick = true;

  @HostListener('document:click', ['$event'])
  onClick($event: MouseEvent): void {

    (<any>$event).path.forEach(element => {
      this._innerClick = this._innerClick || element.className === 'cdk-overlay-container';
    });
      if (this._innerClick) {
        this._innerClick = false;
      } else {
        this.unselectField();
      }
  }

  clickedInside() {
    this._innerClick = true;
  }
  // EOF HACK

  @Input() fields: Field[];

  constructor(private elRef: ElementRef) {}

  fieldClick(field) {
    if (this.selectedField !== field) {
      this.selectField(field);
    }
  }

  fieldDragStart() {
    this.unselectField();
  }

  unselectField() {
    this.selectedField = null;
  }

  selectField(field: Field) {
    this.selectedField = field;
    this.$fieldSelected.emit(field);
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.container === event.previousContainer) {
      moveItemInArray(this.fields, event.previousIndex, event.currentIndex);
    } else {
      this.fields.splice(event.currentIndex, 0, event.item.data);
    }
  }
}
