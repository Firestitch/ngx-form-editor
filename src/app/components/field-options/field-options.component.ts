import { Component, Input, ViewChild, ElementRef, OnInit, EventEmitter, OnDestroy } from '@angular/core';

import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { takeUntil } from 'rxjs/operators';
import { FsPrompt } from '@firestitch/prompt';
import { guid } from '@firestitch/common/util';

import { Field, FieldType } from '../../interfaces';
import { FieldEditorComponent } from '../field-editor';
import { FieldComponent } from '../field/field.component';


@Component({
  selector: 'fs-field-field-options',
  templateUrl: 'field-options.component.html',
  styleUrls: [ 'field-options.component.scss' ],
})
export class FieldOptionsComponent extends FieldComponent implements OnInit {

  public newOption = '';
  public fieldType = FieldType;

  @ViewChild('addOptionInput')
  private _addOptionInput: ElementRef;

  @Input('field') set setField(field: Field) {

    this.field = field;

    if (!field.field_options) {
      field.field_options = [];
    }
  }

  @Input() fieldEditor: FieldEditorComponent;

  constructor(
    private fsPrompt: FsPrompt,
  ) {
    super();
  }

  ngOnInit() {
    this.fieldEditor.$fieldSelected
      .pipe(takeUntil(this.$destory))
      .subscribe(field => {
        if (this.field === field && !this.field.hasDescription) {
          setTimeout(() => {
            this._addOptionInput.nativeElement.focus();
          });
        }
      });
  }

  addOption() {

    if (this.newOption.length) {

      if (!this.field.field_options) {
        this.field.field_options = [];
      }

      this.field.field_options.push({
        guid: guid(),
        label: this.newOption,
      });

      this.newOption = '';
    }

    this._addOptionInput.nativeElement.focus();
  }

  removeOption(index: number) {
    this.fsPrompt.confirm({
      title: 'Confirm',
      template: 'Are you sure you would like to remove this option?',
    }).subscribe((value) => {
        this.field.field_options.splice(index, 1);
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.field.field_options, event.previousIndex, event.currentIndex);
  }
}
