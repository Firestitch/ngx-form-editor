import { Component, Input } from '@angular/core';

import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

import { FsPrompt } from '@firestitch/prompt';
import { guid } from '@firestitch/common/util';

import { FormEditorConfig, FieldOption } from 'src/app/interfaces';


@Component({
  selector: 'fs-form-field-options',
  templateUrl: 'field-options.component.html',
  styleUrls: [ 'field-options.component.scss' ],
})
export class FieldOptionsComponent {
  public newOption = '';

  @Input() config: FormEditorConfig;
  @Input() field;
  @Input() form;

  constructor(
    private fsPrompt: FsPrompt,
  ) {}

  addOption() {

    if (this.newOption.length) {

      if (!this.field.options) {
        this.field.options = [];
      }

      this.field.options.push({
        guid: guid(),
        label: this.newOption,
      });

      this.newOption = '';
    }
  }

  removeOption(index: number) {
    this.fsPrompt.confirm({
      title: 'Confirm',
      template: 'Are you sure you would like to remove this option?',
    }).subscribe((value) => {
        this.field.options.splice(index, 1);
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.field.options, event.previousIndex, event.currentIndex);
  }
}
