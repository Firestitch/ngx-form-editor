import { Component, Input, ViewChild, ElementRef } from '@angular/core';

import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { takeUntil } from 'rxjs/operators';
import { FsPrompt } from '@firestitch/prompt';
import { guid } from '@firestitch/common/util';

import { Field, FieldMode } from '../../interfaces';
import { FieldEditorComponent } from '../field-editor';
import { FieldComponent } from '../field/field.component';


@Component({
  selector: 'fs-field-options',
  templateUrl: 'field-options.component.html',
  styleUrls: [ 'field-options.component.scss' ],
})
export class FieldOptionsComponent extends FieldComponent {

  public newOption = '';

  @ViewChild('addOptionInput')
  private _addOptionInput: ElementRef;

  @Input('field') set setField(field: Field) {

    this.field = this.initField(field);
  }

  @Input() fieldEditor: FieldEditorComponent;

  constructor(
    private fsPrompt: FsPrompt,
  ) {
    super();
  }

  handleCheckbox($event, option) {
    if (!this.field.data.value) {
      this.field.data.value = [];
    }

    if ($event.checked === true) {
      this.field.data.value.push(option.value);
    } else {
      this.field.data.value.splice(this.field.data.value.indexOf(option.value), 1);
    }
  }

  ngOnInit() {
    super.ngOnInit();
    if (this.mode===FieldMode.Edit) {
      // this.fieldEditor.$fieldSelected
      // .pipe(takeUntil(this.$destory))
      // .subscribe(field => {
      //   if (this.field === field) {
      //     setTimeout(() => {
      //       this._addOptionInput.nativeElement.focus();
      //     });
      //   }
      // });
    }
  }

  addOption() {

    if (this.newOption.length) {

      this.field.config.options.push({
        value: guid(),
        name: this.newOption,
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

  otherSelected(field,value) {
    field.data.other.selected = value;
  }

}
