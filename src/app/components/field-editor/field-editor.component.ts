import { Component, HostListener, EventEmitter, ElementRef, QueryList, AfterViewInit, ContentChildren } from '@angular/core';

import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Field } from '../../interfaces';
import { FieldCoreComponent } from '../field-core';
import { FieldCustomEditDirective } from 'src/app/directives/field-custom-edit';
import { FieldCustomRenderDirective } from 'src/app/directives/field-custom-render';


@Component({
  selector: 'fs-field-editor',
  templateUrl: 'field-editor.component.html',
  styleUrls: [ 'field-editor.component.scss' ],
})
export class FieldEditorComponent extends FieldCoreComponent implements AfterViewInit {

  public selectedField = null;
  public $fieldSelected = new EventEmitter();
  public fieldEditor: FieldEditorComponent = this;
  public fieldCustomEditTemplateRefs = {};
  public fieldCustomRenderTemplateRefs = {};

  @ContentChildren(FieldCustomEditDirective) queryListFieldCustomEdit: QueryList<FieldCustomEditDirective>;
  @ContentChildren(FieldCustomRenderDirective) queryListFieldCustomRender: QueryList<FieldCustomEditDirective>;

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.unselectField();
  }

  // HACK: to support closing of opened field panel when user clicks outside of elements
  private _innerClick = true;

  @HostListener('document:click', ['$event'])
  onClick($event: MouseEvent): void {

    if ((event.target as HTMLElement).className === 'cdk-overlay-backdrop') {
      this._innerClick = true;
    } else {
      (<any>$event).path.forEach(element => {
        if (element.className === 'mat-menu-content') {
          this._innerClick = true;
        } else if (element.className === 'cdk-global-overlay-wrapper') {
          this._innerClick = this._innerClick || !(element as HTMLElement).contains(this.elRef.nativeElement);
        }
      });
    }

    if (this._innerClick) {
      this._innerClick = false;
    } else {
      this.unselectField();
    }
  }

  constructor(private elRef: ElementRef) {
    super(null);
  }

  ngAfterViewInit() {
    this.queryListFieldCustomEdit.forEach((directive: FieldCustomEditDirective) => {
      this.fieldCustomEditTemplateRefs[directive.type] = directive.templateRef;
    });

    this.queryListFieldCustomRender.forEach((directive: FieldCustomRenderDirective) => {
      this.fieldCustomRenderTemplateRefs[directive.type] = directive.templateRef;
    });
  }

  clickedInside() {
    this._innerClick = true;
  }
  // EOF HACK


  fieldClick(field: Field) {
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
      moveItemInArray(this.config.fields, event.previousIndex, event.currentIndex);
    } else {

      if (this.config.fieldAddStart) {
        this.config.fieldAddStart(event.item.data, event);
      }

      this.config.fields.splice(event.currentIndex, 0, event.item.data);
    }
  }
}
