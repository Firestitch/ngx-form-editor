import { Component, Input, AfterViewInit, QueryList, ContentChildren } from '@angular/core';
import { FieldCoreComponent } from '../field-core/field-core.component';
import { FieldRenderDirective } from '../../directives/field-render/field-render.directive';

@Component({
  selector: 'fs-field-render',
  styleUrls: ['field-render.component.scss'],
  templateUrl: 'field-render.component.html'
})
export class FieldRenderComponent extends FieldCoreComponent implements AfterViewInit {

    public fieldRenderTemplateRefs = {};
    public field: any = { config: {} };

    @Input('field') set setField(field) {
      this.field = field;
    }

    @ContentChildren(FieldRenderDirective) queryListFieldRender: QueryList<FieldRenderDirective>;

    ngAfterViewInit() {

      this.queryListFieldRender.forEach((directive: FieldRenderDirective) => {
        this.fieldRenderTemplateRefs[directive.type] = directive.templateRef;
      });
    }
  }
