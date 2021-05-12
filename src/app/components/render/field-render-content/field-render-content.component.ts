import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';

import { FsHtmlEditorConfig } from '@firestitch/html-editor';

import { FieldComponent } from '../../field/field.component';
import { FieldEditorConfig } from '../../../interfaces/field.interface';


@Component({
  selector: 'fs-field-render-content',
  templateUrl: 'field-render-content.component.html',
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldRenderContentComponent extends FieldComponent implements OnInit {

  @Input() config: FieldEditorConfig;

  public editorConfig: FsHtmlEditorConfig;

  public ngOnInit(): void {
    super.ngOnInit();

    this.editorConfig = {
      autofocus: false,
    };

    if (this.config?.imageUpload) {
      this.editorConfig.image = {
        upload: (file: File) => {
          return this.config.imageUpload(this.field, file);
        }
      }
    }
  }
}
