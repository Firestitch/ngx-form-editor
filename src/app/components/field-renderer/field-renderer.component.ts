import { Component, ContentChildren, QueryList, AfterViewInit } from '@angular/core';
import { FieldCoreComponent } from '../field-core';
import { FieldCustomRenderDirective } from 'src/app/directives/field-custom-render';
import { FieldCustomEditDirective } from 'src/app/directives/field-custom-edit';


@Component({
  selector: 'fs-field-renderer',
  templateUrl: 'field-renderer.component.html',
  styleUrls: [ 'field-renderer.component.scss' ],
})
export class FieldRendererComponent extends FieldCoreComponent implements AfterViewInit{

  public fieldRenderer: FieldRendererComponent = this;
  public fieldCustomRenderTemplateRefs = {};

  @ContentChildren(FieldCustomRenderDirective) queryListFieldCustomRender: QueryList<FieldCustomEditDirective>;

  ngAfterViewInit() {

    this.queryListFieldCustomRender.forEach((directive: FieldCustomRenderDirective) => {
      this.fieldCustomRenderTemplateRefs[directive.type] = directive.templateRef;
    });
  }
}
