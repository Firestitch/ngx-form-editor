import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit
} from '@angular/core';

import { FsPrompt } from '@firestitch/prompt';
import { guid } from '@firestitch/common';

import { cloneDeep } from 'lodash-es';

import { FieldComponent } from '../../field/field.component';
import { FieldEditorService } from '../../../services/field-editor.service';


@Component({
  selector: 'fs-field-header',
  templateUrl: 'field-header.component.html',
  styleUrls: ['field-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldHeaderComponent extends FieldComponent implements OnInit {

  @Input() showRequired = true;
  @Input() showDescription = true;

  constructor(
    public fieldEditor: FieldEditorService,
    private _prompt: FsPrompt,
    private _cdRef: ChangeDetectorRef,
  ) {
    super();
  }

  ngOnInit() {
    this.field.config.hasDescriptionNote = !!this.field.config.description || !!this.field.config.configs.note;
  }

  toggleRequired() {
    this.field.config.configs.required = !this.field.config.configs.required;
    this.changed.emit(this.field);
  }

  toggleDescriptionNote() {
    this.field.config.hasDescriptionNote = !this.field.config.hasDescriptionNote;
    this.changed.emit(this.field);
  }

  copy(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    const copiedField = cloneDeep(this.field);
    const idx = this.fieldEditor.config.fields.indexOf(this.field) + 1;

    copiedField.config.guid = guid();
    copiedField.data = {};
    this.fieldEditor.fieldDuplicate(copiedField);

    this.fieldEditor.config.fields.splice(idx, 0, copiedField);
    this.fieldEditor.selectField(copiedField);
    this.fieldEditor.fieldDuplicated(copiedField);
  }

  close(e) {
    e.stopPropagation();
    this.fieldEditor.unselectField();
  }

  delete(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    this._prompt.confirm({
      title: 'Confirm',
      template: 'Are you sure you would like to remove this field?',
    }).subscribe(() => {
      this.fieldEditor.config.fields.splice(this.fieldEditor.config.fields.indexOf(this.field), 1);
      this.fieldEditor.unselectField();
      this.fieldEditor.fieldRemoved({ field: this.field, event: event });
      this._cdRef.markForCheck();
    });
  }

}
