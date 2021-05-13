import {
  Component,
  HostListener,
  QueryList,
  ContentChildren,
  AfterContentInit,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  ElementRef,
  Inject,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';

import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { filter, takeUntil } from 'rxjs/operators';


import {
  Field,
  FieldEditorConfig,
  FsFieldEditorCallbackParams
} from '../../interfaces/field.interface';
import { FieldConfigDirective } from '../../directives/field-config/field-config.directive';
import { FieldRenderDirective } from '../../directives/field-render/field-render.directive';
import { initField } from './../../helpers/init-field';
import { fromEvent, isObservable, of, Subject } from 'rxjs';
import { FieldEditorItemComponent } from './field-editor-item/field-editor-item.component';
import { DOCUMENT } from '@angular/common';
import { FieldEditorService } from '../../services/field-editor.service';
import { clickOutsideElement } from '../../helpers/click-outside-element';


@Component({
  selector: 'fs-field-editor',
  templateUrl: 'field-editor.component.html',
  styleUrls: ['field-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    FieldEditorService,
  ],
})
export class FieldEditorComponent implements OnInit, AfterContentInit, OnDestroy {

  @Input()
  public scrollContainer: string | HTMLElement = null;

  @ContentChildren(FieldConfigDirective)
  public queryListFieldConfig: QueryList<FieldConfigDirective>;

  @ContentChildren(FieldRenderDirective)
  public queryListFieldRender: QueryList<FieldRenderDirective>;

  @HostListener('document:keydown.escape', ['$event'])
  public onKeydownHandler(event: KeyboardEvent) {
    this.fieldEditor.unselectField();
  }

  public fieldConfigTemplateRefs = {};
  public fieldRenderTemplateRefs = {};

  private _destroy$ = new Subject<void>();

  constructor(
    @Inject(DOCUMENT) public document: any,
    public fieldEditor: FieldEditorService,
    private _cdRef: ChangeDetectorRef,
    private _elRef: ElementRef,
  ) {}

  @Input('config')
  set setConfig(config: FieldEditorConfig) {
    this.fieldEditor.setConfig(config);
  }

  public ngOnInit(): void {
    this._listenClickOutside();
  }

  public ngAfterContentInit() {
    this.queryListFieldConfig.forEach((directive: FieldConfigDirective) => {
      this.fieldConfigTemplateRefs[directive.type] = directive.templateRef;
    });

    this.queryListFieldRender.forEach((directive: FieldRenderDirective) => {
      this.fieldRenderTemplateRefs[directive.type] = directive.templateRef;
    });
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public fieldClick(field: Field) {
    if (this.fieldEditor.selectedField !== field) {
      this.fieldEditor.selectField(field);
    }
  }

  public drop(event: CdkDragDrop<string[]>) {

    if (event.container === event.previousContainer) {

      moveItemInArray(
        this.fieldEditor.config.fields,
        event.previousIndex,
        event.currentIndex,
      );

      this.fieldEditor.fieldMoved({
        event: event,
      });

    } else {
      this.fieldEditor.insertNewField(
        event.item.data.field,
        event.currentIndex,
        event
      );
    }
  }

  private _listenClickOutside(): void {
    fromEvent(this.document, 'click')
      .pipe(
        filter(() => !!this.fieldEditor.selectedField && !this.fieldEditor.inDeletionMode),
        filter((event: Event) => {
          return clickOutsideElement(event, this._elRef.nativeElement);
        }),
        takeUntil(this._destroy$),
      )
      .subscribe(() => {
        this.fieldEditor.unselectField();
        this._cdRef.markForCheck();
      });
  }

}
