import {  Component,
  HostListener,
  EventEmitter,
  ElementRef,
  QueryList,
  ContentChildren,
  Output,
  AfterContentInit } from '@angular/core';

import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Field } from '../../interfaces';
import { FieldCoreComponent } from '../field-core/field-core.component';
import { FieldConfigDirective } from '../../directives/field-config/field-config.directive';
import { FieldRenderDirective } from '../../directives/field-render/field-render.directive';
import { initField } from './../../helpers/init-field';


@Component({
  selector: 'fs-field-editor',
  inputs: ['config'],
  templateUrl: 'field-editor.component.html',
  styleUrls: [ 'field-editor.component.scss' ]
})
export class FieldEditorComponent extends FieldCoreComponent implements AfterContentInit {

  public selectedField = null;
  @Output('fieldSelected') fieldSelected$ = new EventEmitter();
  @Output('fieldUnselected') fieldUnselected$ = new EventEmitter();
  @Output('fieldChanged')  fieldChanged$ = new EventEmitter();
  @Output('fieldAdded')  fieldAdded$ = new EventEmitter();
  @Output('fieldAdd')  fieldAdd$ = new EventEmitter();
  @Output('fieldMoved')  fieldMoved$ = new EventEmitter();
  @Output('fieldDuplicate')  fieldDuplicate$ = new EventEmitter();
  @Output('fieldDuplicated')  fieldDuplicated$ = new EventEmitter();
  public fieldEditor: FieldEditorComponent = this;
  public fieldConfigTemplateRefs = {};
  public fieldRenderTemplateRefs = {};

  @ContentChildren(FieldConfigDirective) queryListFieldConfig: QueryList<FieldConfigDirective>;
  @ContentChildren(FieldRenderDirective) queryListFieldRender: QueryList<FieldRenderDirective>;

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.unselectField();
  }

  constructor(private elRef: ElementRef) {
    super(null);
  }

  ngAfterContentInit() {
    this.queryListFieldConfig.forEach((directive: FieldConfigDirective) => {
      this.fieldConfigTemplateRefs[directive.type] = directive.templateRef;
      });

      this.queryListFieldRender.forEach((directive: FieldRenderDirective) => {
      this.fieldRenderTemplateRefs[directive.type] = directive.templateRef;
    });
  }

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
    this.fieldUnselected$.emit(null);
  }

  selectField(field: Field) {

    if (this.selectedField) {
      this.unselectField();
    }

    this.selectedField = field;
    this.fieldSelected$.emit(field);
  }

  drop(event: CdkDragDrop<string[]>) {

    if (event.container === event.previousContainer) {

      moveItemInArray(this.config.fields, event.previousIndex, event.currentIndex);
      this.fieldMoved$.emit({ event: event });

    } else {

      const field = initField(event.item.data.field);

      this.fieldAdd$.emit({ field: field,
                            toolbarField: event.item.data.item,
                            event: event });

      if (this.config.fieldDrop) {
        this.config.fieldDrop(field, event.item.data.item, event);
      }

      this.config.fields.splice(event.currentIndex, 0, field);

      this.fieldAdded$.emit({ field: field,
                              toolbarField: event.item.data.item,
                              event: event });
      }
  }
}

