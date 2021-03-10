import {  Component,
  HostListener,
  EventEmitter,
  QueryList,
  ContentChildren,
  Output,
  AfterContentInit,
  OnInit,
} from '@angular/core';

import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { guid } from '@firestitch/common';

import { takeUntil } from 'rxjs/operators';

import { Field } from '../../interfaces';
import { FieldCoreComponent } from '../field-core/field-core.component';
import { FieldConfigDirective } from '../../directives/field-config/field-config.directive';
import { FieldRenderDirective } from '../../directives/field-render/field-render.directive';
import { initField } from './../../helpers/init-field';


@Component({
  selector: 'fs-field-editor',
  templateUrl: 'field-editor.component.html',
  styleUrls: [ 'field-editor.component.scss' ],
})
export class FieldEditorComponent extends FieldCoreComponent implements AfterContentInit, OnInit {

  @Output() public fieldSelected = new EventEmitter();
  @Output() public fieldUnselected = new EventEmitter();
  @Output() public fieldAdded = new EventEmitter();
  @Output() public fieldAdd = new EventEmitter();
  @Output() public fieldMoved = new EventEmitter();
  @Output() public fieldDuplicate = new EventEmitter();
  @Output() public fieldDuplicated = new EventEmitter();
  @Output() public fieldRemoved = new EventEmitter();

  @ContentChildren(FieldConfigDirective) queryListFieldConfig: QueryList<FieldConfigDirective>;
  @ContentChildren(FieldRenderDirective) queryListFieldRender: QueryList<FieldRenderDirective>;

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.unselectField();
  }

  public selectedField = null;
  public fieldEditor: FieldEditorComponent = this;
  public fieldConfigTemplateRefs = {};
  public fieldRenderTemplateRefs = {};
  public editorId = 'fs-fields-' + guid();

  public ngAfterContentInit() {
    this.queryListFieldConfig.forEach((directive: FieldConfigDirective) => {
      this.fieldConfigTemplateRefs[directive.type] = directive.templateRef;
    });

    this.queryListFieldRender.forEach((directive: FieldRenderDirective) => {
      this.fieldRenderTemplateRefs[directive.type] = directive.templateRef;
    });
  }

  public ngOnInit(): void {
    this.fieldChanged
    .pipe(
      takeUntil(this._destroy$)
    )
    .subscribe((item: Field) => {
      if (this.config.fieldChanged) {
        this.config.fieldChanged(this.fieldEditorService.output(item));
      }
    });

    this.fieldAdd
    .pipe(
      takeUntil(this._destroy$)
    )
    .subscribe(item => {
      if (this.config.fieldAdd) {
        this.config.fieldAdd(this.fieldEditorService.output(item));
      }
    });

    this.fieldAdded
    .pipe(
      takeUntil(this._destroy$)
    )
    .subscribe(item => {
      if (this.config.fieldAdded) {
        this.config.fieldAdded(this.fieldEditorService.output(item));
      }
    });

    this.fieldSelected
    .pipe(
      takeUntil(this._destroy$)
    )
    .subscribe(item => {
      if (this.config.fieldSelected) {
        this.config.fieldSelected(this.fieldEditorService.output(item));
      }
    });

    this.fieldUnselected
    .pipe(
      takeUntil(this._destroy$)
    )
    .subscribe(item => {
      if (this.config.fieldUnselected) {
        this.config.fieldUnselected(this.fieldEditorService.output(item));
      }
    });

    this.fieldMoved
    .pipe(
      takeUntil(this._destroy$)
    )
    .subscribe(item => {
      if (this.config.fieldMoved) {
        this.config.fieldMoved(this.fieldEditorService.output(item));
      }
    });

    this.fieldDuplicate
    .pipe(
      takeUntil(this._destroy$)
    )
    .subscribe(item => {
      if (this.config.fieldDuplicate) {
        this.config.fieldDuplicate(this.fieldEditorService.output(item));
      }
    });

    this.fieldDuplicated
    .pipe(
      takeUntil(this._destroy$)
    )
    .subscribe(item => {
      if (this.config.fieldDuplicated) {
        this.config.fieldDuplicated(this.fieldEditorService.output(item));
      }
    });

    this.fieldRemoved
    .pipe(
      takeUntil(this._destroy$)
    )
    .subscribe(item => {
      if (this.config.fieldRemoved) {
        this.config.fieldRemoved(this.fieldEditorService.output(item));
      }
    });
  }

  public fieldClick(field: Field) {
    if (this.selectedField !== field) {
      this.selectField(field);
    }
  }

  public fieldDragStart() {
    this.unselectField();
  }

  public unselectField() {
    this.selectedField = null;
    this.fieldUnselected.emit(null);
  }

  public selectField(field: Field) {

    if (this.selectedField) {
      this.unselectField();
    }

    this.selectedField = field;
    this.fieldSelected.emit(field);
  }

  public drop(event: CdkDragDrop<string[]>) {

    if (event.container === event.previousContainer) {

      moveItemInArray(this.config.fields, event.previousIndex, event.currentIndex);
      this.fieldMoved.emit({ event: event });

    } else {

      const field = initField(event.item.data.field);

      this.fieldAdd.emit({
        field: field,
        toolbarField: event.item.data.item,
        event: event
      });

      if (this.config.fieldDrop) {
        this.config.fieldDrop(field, event.item.data.item, event);
      }

      this.config.fields.splice(event.currentIndex, 0, field);

      this.fieldAdded.emit({
        field: field,
        toolbarField: event.item.data.item,
        event: event
      });
    }
  }

}
