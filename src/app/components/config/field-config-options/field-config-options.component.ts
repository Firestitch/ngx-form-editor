import { Component, Input, ViewChild, ElementRef, ChangeDetectionStrategy } from '@angular/core';

import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { FsPrompt } from '@firestitch/prompt';
import { guid } from '@firestitch/common';

import { FieldComponent } from '../../field/field.component';
import { FieldEditorService } from '../../../services/field-editor.service';


@Component({
  selector: 'fs-field-config-options',
  templateUrl: 'field-config-options.component.html',
  styleUrls: ['field-config-options.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldConfigOptionsComponent extends FieldComponent {

  public newOption = '';

  @ViewChild('addOptionInput')
  private _addOptionInput: ElementRef;

  constructor(
    public fieldEditor: FieldEditorService,
    private fsPrompt: FsPrompt,
  ) {
    super();
  }

  public addOption(e): void {
    if (e.key !== 'Enter' && e.key !== 'Tab') {
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
    this.changed.emit(this.field);
  }

  otherToggle() {
    this.field.config.configs.other = !this.field.config.configs.other;
    this.changed.emit(this.field);
  }

  removeOption(index: number) {
    this.fsPrompt.confirm({
      title: 'Confirm',
      template: 'Are you sure you would like to remove this option?',
    }).subscribe((value) => {
        this.field.config.configs.options.splice(index, 1);
        this.changed.emit(this.field);
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.field.config.configs.options, event.previousIndex, event.currentIndex);
    this.changed.emit(this.field);
  }
}
