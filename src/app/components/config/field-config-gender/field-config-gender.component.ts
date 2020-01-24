import { Component, Input, ViewChild, ElementRef } from '@angular/core';

import { FieldComponent } from '../../field/field.component';
import { FsPrompt } from '@firestitch/prompt';
import { FieldEditorComponent } from '../../field-editor/field-editor.component';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';


@Component({
  selector: 'fs-field-config-gender',
  templateUrl: 'field-config-gender.component.html',
  styleUrls: [ 'field-config-gender.component.scss' ],
})
export class FieldConfigGenderComponent extends FieldComponent {

  public newOption = '';

  @ViewChild('addOptionInput', { static: false })
  private _addOptionInput: ElementRef;

  @Input() fieldEditor: FieldEditorComponent;

  constructor(private fsPrompt: FsPrompt) {
    super();
  }

  add() {

    this.field.config.configs.genders.push({
      value: this.newOption,
      name: this.newOption,
    });

    this.newOption = '';

    this._addOptionInput.nativeElement.focus();
    this.changed();
  }

  remove(index: number) {
    this.fsPrompt.confirm({
      title: 'Confirm',
      template: 'Are you sure you would like to remove this gender?',
    }).subscribe((value) => {
        this.field.config.configs.genders.splice(index, 1);
        this.changed();
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.field.config.configs.genders, event.previousIndex, event.currentIndex);
    this.changed();
  }
}
