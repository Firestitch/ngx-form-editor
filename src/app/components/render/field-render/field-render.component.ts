import { Component, Input, AfterContentInit, ChangeDetectionStrategy } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';

import { FieldCoreComponent } from '../../field-core/field-core.component';
import { FieldRenderDirective } from '../../../directives/field-render/field-render.directive';
import { initField } from '../../../helpers/init-field';
import { Field } from './../../../interfaces/field.interface';

@Component({
  selector: 'fs-field-render',
  styleUrls: ['field-render.component.scss'],
  templateUrl: 'field-render.component.html',
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldRenderComponent extends FieldCoreComponent implements AfterContentInit {

  public fieldRenderTemplateRefs = {};
  public field: Field = { config: {} };

  @Input('field') set setField(field) {
    this.field = initField(field);
  }

  @Input() public fieldRenders: FieldRenderDirective[] = [];

  public ngAfterContentInit(): void {
    this.fieldRenders.forEach((directive: FieldRenderDirective) => {
      this.fieldRenderTemplateRefs[directive.type] = directive.templateRef;
    });
  }
}
