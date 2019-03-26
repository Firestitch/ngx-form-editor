import { Component, Input, AfterViewInit, QueryList, ContentChildren, SkipSelf } from '@angular/core';
import { FieldCoreComponent } from '../field-core/field-core.component';
import { FieldRenderDirective } from '../../directives/field-render/field-render.directive';
import { ControlContainer, NgForm } from '@angular/forms';
import { initField } from '../../helpers/init-field';

@Component({
  selector: 'fs-field-render',
  styleUrls: ['field-render.component.scss'],
  templateUrl: 'field-render.component.html',
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm} ]
})
export class FieldRenderComponent extends FieldCoreComponent implements AfterViewInit {

  public fieldRenderTemplateRefs = {};
  public field: any = { config: {} };

  @Input('field') set setField(field) {
    this.field = initField(field);
  }

  @ContentChildren(FieldRenderDirective) queryListFieldRender: QueryList<FieldRenderDirective>;

  ngAfterViewInit() {

    this.queryListFieldRender.forEach((directive: FieldRenderDirective) => {
      this.fieldRenderTemplateRefs[directive.type] = directive.templateRef;
    });
  }
}
