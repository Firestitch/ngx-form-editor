import { Component, ContentChildren, QueryList, AfterContentInit, ChangeDetectionStrategy } from '@angular/core';
import { FieldCoreComponent } from '../field-core/field-core.component';
import { FieldViewDirective } from './../../directives/field-view/field-view.directive';

@Component({
  selector: 'fs-field-viewer',
  inputs: ['config'],
  templateUrl: 'field-viewer.component.html',
  styleUrls: ['field-viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldViewerComponent extends FieldCoreComponent implements AfterContentInit {

  @ContentChildren(FieldViewDirective)
  public fieldViews: QueryList<FieldViewDirective>;

  public fieldViewTemplateRefs = {};

  public ngAfterContentInit() {
    this.fieldViews.forEach((directive: FieldViewDirective) => {
      this.fieldViewTemplateRefs[directive.type] = directive.templateRef;
    });
  }
}
