import { Component, Input, AfterContentInit, ChangeDetectionStrategy } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';

import { FieldRenderDirective } from '../../../directives/field-render/field-render.directive';
import { initField } from '../../../helpers/init-field';
import { Field } from './../../../interfaces/field.interface';
import { FieldEditorService } from '../../../services/field-editor.service';
import { FieldType } from '../../../enums/field-type';

@Component({
  selector: 'fs-field-render',
  styleUrls: ['field-render.component.scss'],
  templateUrl: 'field-render.component.html',
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldRenderComponent implements AfterContentInit {

  public fieldRenderTemplateRefs = {};
  public field: Field = { config: {} };
  public fieldType = FieldType;

  @Input()
  public fieldRenders: FieldRenderDirective[] = [];

  constructor(public fieldEditor: FieldEditorService) {
  }

  @Input('field')
  public set setField(field) {
    this.field = initField(field);
  }

  public ngAfterContentInit(): void {
    this.fieldRenders.forEach((directive: FieldRenderDirective) => {
      this.fieldRenderTemplateRefs[directive.type] = directive.templateRef;
    });
  }
}
