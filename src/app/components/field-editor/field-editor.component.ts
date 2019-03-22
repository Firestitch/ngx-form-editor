import {  Component,
  HostListener,
  EventEmitter,
  ElementRef,
  QueryList,
  ContentChildren,
  Output,
  AfterContentInit,
  SkipSelf} from '@angular/core';

import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Field } from '../../interfaces';
import { FieldCoreComponent } from '../field-core/field-core.component';
import { FieldConfigDirective } from '../../directives/field-config/field-config.directive';
import { FieldRenderDirective } from '../../directives/field-render/field-render.directive';
import { initField } from './../../helpers/init-field';
import { FormGroup, ControlContainer, NgForm } from '@angular/forms';


@Component({
  selector: 'fs-field-editor',
  inputs: ['config'],
  templateUrl: 'field-editor.component.html',
  styleUrls: [ 'field-editor.component.scss' ],
  // viewProviders: [{
  //   provide: ControlContainer,
  //   useFactory: (container: ControlContainer) => container,
  //   deps: [[new SkipSelf(), ControlContainer]],
  // }]
})
export class FieldEditorComponent extends FieldCoreComponent implements AfterContentInit {

  public selectedField = null;
  @Output('fieldSelected') $fieldSelected = new EventEmitter();
  @Output('fieldChanged')  $fieldChanged = new EventEmitter();
  @Output('fieldAdded')  $fieldAdded = new EventEmitter();
  @Output('fieldMoved')  $fieldMoved = new EventEmitter();
  public fieldEditor: FieldEditorComponent = this;
  public fieldConfigTemplateRefs = {};
  public fieldRenderTemplateRefs = {};
  private formGroup: FormGroup;

  @ContentChildren(FieldConfigDirective) queryListFieldConfig: QueryList<FieldConfigDirective>;
  @ContentChildren(FieldRenderDirective) queryListFieldRender: QueryList<FieldRenderDirective>;

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.unselectField();
  }

  // HACK: to support closing of opened field panel when user clicks outside of elements
  private _innerClick = true;

  // @HostListener('document:click', ['$event'])
  // onClick($event: MouseEvent): void {

  //   if ((event.target as HTMLElement).className === 'cdk-overlay-backdrop') {
  //     this._innerClick = true;
  //   } else {
  //     (<any>$event).path.forEach(element => {
  //       if (element.className === 'mat-menu-content') {
  //         this._innerClick = true;
  //       } else if (element.className === 'cdk-global-overlay-wrapper') {
  //         this._innerClick = this._innerClick || !(element as HTMLElement).contains(this.elRef.nativeElement);
  //       }
  //     });
  //   }

  //   if (this._innerClick) {
  //     this._innerClick = false;
  //   } else {
  //     this.unselectField();
  //   }
  // }

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
    this.$fieldSelected.emit(null);
  }

  selectField(field: Field) {
    this.selectedField = field;
    this.$fieldSelected.emit(field);
  }

  drop(event: CdkDragDrop<string[]>) {

    if (event.container === event.previousContainer) {

      this.$fieldMoved.emit({ event: event });
      moveItemInArray(this.config.fields, event.previousIndex, event.currentIndex);

    } else {

      const field = initField(event.item.data.field);

      this.$fieldAdded.emit({ field: field,
                            toolbarField: event.item.data.item,
                            event: event });

      if (this.config.fieldDrop) {
        this.config.fieldDrop(field, event.item.data.item, event);
      }

      this.config.fields.splice(event.currentIndex, 0, field);
    }
  }
}

