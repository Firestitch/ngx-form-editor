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

    if (!field.config.options) {
      field.config.options = [];
    }

    if (!field.data || !field.data.guid) {
      field.data = {
        field_id: this.field.config.id || null,
        value: [],
        guid: guid(),
        other: '',
      };
    }
  }

  @Input() fieldEditor: FieldEditorComponent;

  constructor(
    private fsPrompt: FsPrompt,
  ) {
    super();
  }

  handleCheckbox($event, option) {

    if ($event.checked === true) {
      this.field.data.value.push(option.guid);
    } else {
      this.field.data.value.splice(this.field.data.value.indexOf(option.guid), 1);
    }
  }

  ngOnInit() {

    if (this.fieldEditor.$fieldSelected) {
      this.fieldEditor.$fieldSelected
      .pipe(takeUntil(this.$destory))
      .subscribe(field => {
        if (this.field === field) {
          setTimeout(() => {
            this._addOptionInput.nativeElement.focus();
          });
        }
      });
    }
  }

  addOption() {

    if (this.newOption.length) {

      if (!this.field.config.options) {
        this.field.config.options = [];
      }

      this.field.config.options.push({
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
        this.field.config.options.splice(index, 1);
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.field.config.options, event.previousIndex, event.currentIndex);
  }
}
