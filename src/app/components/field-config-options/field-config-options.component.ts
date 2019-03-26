import { Component, Input, ViewChild, ElementRef } from '@angular/core';

import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { FsPrompt } from '@firestitch/prompt';
import { guid } from '@firestitch/common';

import { FieldEditorComponent } from '../field-editor';
import { FieldComponent } from '../field/field.component';


@Component({
  selector: 'fs-field-config-options',
  templateUrl: 'field-config-options.component.html',
  styleUrls: [ 'field-config-options.component.scss' ],
})
export class FieldConfigOptionsComponent extends FieldComponent {

  public newOption = '';

  @ViewChild('addOptionInput')
  private _addOptionInput: ElementRef;

  @Input() fieldEditor: FieldEditorComponent;

  constructor(
    private fsPrompt: FsPrompt,
  ) {
    super();
  }

  addOption(e) {
    if (e.code !== 'Enter' && e.code !== 'Tab') {
      return;
    }

    e.preventDefault();

    if (this.newOption.length) {

      this.field.config.configs.options.push({
        value: guid(),
        name: this.newOption,
      });

      this.newOption = '';
    }

    this._addOptionInput.nativeElement.focus();
    this.changed();
  }

  otherToggle() {
    this.field.config.configs.other = !this.field.config.configs.other;
    this.changed();
  }

  removeOption(index: number) {
    this.fsPrompt.confirm({
      title: 'Confirm',
      template: 'Are you sure you would like to remove this option?',
    }).subscribe((value) => {
        this.field.config.configs.options.splice(index, 1);
        this.changed();
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.field.config.configs.options, event.previousIndex, event.currentIndex);
    this.changed();
  }
}
