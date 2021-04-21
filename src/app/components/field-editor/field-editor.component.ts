import {
  Component,
  HostListener,
  EventEmitter,
  QueryList,
  ContentChildren,
  Output,
  AfterContentInit,
  OnInit,
  Input,
  ElementRef,
} from '@angular/core';

import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { guid } from '@firestitch/common';

import { map, takeUntil } from 'rxjs/operators';

import { cloneDeep } from 'lodash-es';

import { Field, FsFieldEditorCallbackParams } from '../../interfaces/field.interface';
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

  @Input()
  public scrollContainer: string | ElementRef = null;

  @Output() public fieldSelected = new EventEmitter<FsFieldEditorCallbackParams>();
  @Output() public fieldUnselected = new EventEmitter<FsFieldEditorCallbackParams>();
  @Output() public fieldAdded = new EventEmitter<FsFieldEditorCallbackParams>();
  @Output() public fieldAdd = new EventEmitter<FsFieldEditorCallbackParams>();
  @Output() public fieldMoved = new EventEmitter<FsFieldEditorCallbackParams>();
  @Output() public fieldDuplicate = new EventEmitter<FsFieldEditorCallbackParams>();
  @Output() public fieldDuplicated = new EventEmitter<FsFieldEditorCallbackParams>();
  @Output() public fieldRemoved = new EventEmitter<FsFieldEditorCallbackParams>();

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
      map((item) => {
        return {
          fields: cloneDeep(this.config.fields),
          ...item,
        };
      }),
      takeUntil(this._destroy$)
    )
    .subscribe((item: Field) => {
      if (this.config.fieldChanged) {
        this.config.fieldChanged(this.fieldEditorService.output(item));
      }
    });

    this.fieldAdd
    .pipe(
      map((item) => {
        return {
          fields: cloneDeep(this.config.fields),
          ...item,
        };
      }),
      takeUntil(this._destroy$)
    )
    .subscribe(item => {
      if (this.config.fieldAdd) {
        this.config.fieldAdd(this.fieldEditorService.output(item));
      }
    });

    this.fieldAdded
    .pipe(
      map((item) => {
        return {
          fields: cloneDeep(this.config.fields),
          ...item,
        };
      }),
      takeUntil(this._destroy$)
    )
    .subscribe(item => {
      if (this.config.fieldAdded) {
        this.config.fieldAdded(this.fieldEditorService.output(item));
      }
    });

    this.fieldSelected
    .pipe(
      map((item) => {
        return {
          fields: cloneDeep(this.config.fields),
          ...item,
        };
      }),
      takeUntil(this._destroy$)
    )
    .subscribe(item => {
      if (this.config.fieldSelected) {
        this.config.fieldSelected(this.fieldEditorService.output(item));
      }
    });

    this.fieldUnselected
    .pipe(
      map((item) => {
        return {
          fields: cloneDeep(this.config.fields),
          ...item,
        };
      }),
      takeUntil(this._destroy$)
    )
    .subscribe(item => {
      if (this.config.fieldUnselected) {
        this.config.fieldUnselected(this.fieldEditorService.output(item));
      }
    });

    this.fieldMoved
    .pipe(
      map((item) => {
        return {
          fields: cloneDeep(this.config.fields),
          ...item,
        };
      }),
      takeUntil(this._destroy$)
    )
    .subscribe(item => {
      if (this.config.fieldMoved) {
        this.config.fieldMoved(this.fieldEditorService.output(item));
      }
    });

    this.fieldDuplicate
    .pipe(
      map((item) => {
        return {
          fields: cloneDeep(this.config.fields),
          ...item,
        };
      }),
      takeUntil(this._destroy$)
    )
    .subscribe(item => {
      if (this.config.fieldDuplicate) {
        this.config.fieldDuplicate(this.fieldEditorService.output(item));
      }
    });

    this.fieldDuplicated
    .pipe(
      map((item) => {
        return {
          fields: cloneDeep(this.config.fields),
          ...item,
        };
      }),
      takeUntil(this._destroy$)
    )
    .subscribe(item => {
      if (this.config.fieldDuplicated) {
        this.config.fieldDuplicated(this.fieldEditorService.output(item));
      }
    });

    this.fieldRemoved
    .pipe(
      map((item) => {
        return {
          fields: cloneDeep(this.config.fields),
          ...item,
        };
      }),
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
    this.fieldUnselected.emit({
      field: this.selectedField,
    });
    this.selectedField = null;
  }

  public selectField(field: Field) {

    if (this.selectedField) {
      this.unselectField();
    }

    this.selectedField = field;
    this.fieldSelected.emit({ field });
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
