import { ChangeDetectionStrategy, Component, Injector, Input, Optional } from '@angular/core';
import { FieldEditorConfig } from '../../interfaces/field.interface';
import { FieldEditorService } from '../../services/field-editor.service';
import { FS_FIELD_EDITOR_CONFIG } from '../../injectors/fs-field-editor.providers';
import { FieldType } from '../../enums/field-type';


@Component({
  selector: 'fs-field-view',
  templateUrl: 'field-view.component.html',
  styleUrls: ['field-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldViewComponent {
  public field: any = { config: {} };

  public fieldType = FieldType;

  @Input('field') set setField(field) {
    this.field = field;
  }

  @Input('config')
  set setConfig(config: FieldEditorConfig) {
    this.fieldEditor.setConfig(config);
  }

  constructor(
    @Optional() public fieldEditor: FieldEditorService,
  ) {
    if (!this.fieldEditor) {
      const injector = Injector.create({
        providers: [
          {
            provide: FieldEditorService,
            deps: [FS_FIELD_EDITOR_CONFIG],
          },
        ],
      });

      this.fieldEditor = injector.get(FieldEditorService);
    }
  }
}
