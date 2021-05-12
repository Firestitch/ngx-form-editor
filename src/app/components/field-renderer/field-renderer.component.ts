import {
  Component,
  OnInit,
  ContentChildren,
  QueryList,
  ChangeDetectionStrategy,
  Input
} from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';

import { FieldEditorConfig } from './../../interfaces/field.interface';
import { FieldRenderDirective } from './../../directives/field-render/field-render.directive';
import { FieldEditorService } from '../../services/field-editor.service';

@Component({
  selector: 'fs-field-renderer',
  templateUrl: 'field-renderer.component.html',
  styleUrls: [ 'field-renderer.component.scss' ],
  providers: [
    FieldEditorService,
  ],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldRendererComponent implements OnInit {

  @ContentChildren(FieldRenderDirective)
  public fieldRenders: QueryList<FieldRenderDirective>;

  constructor(
    public fieldEditor: FieldEditorService,
  ) {}

  @Input('config')
  set setConfig(config: FieldEditorConfig) {
    this.fieldEditor.setConfig(config);
  }

  public ngOnInit(): void {}
}
