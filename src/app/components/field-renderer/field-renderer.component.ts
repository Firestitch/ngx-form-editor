import { Component, Input, OnInit, ContentChildren, QueryList, AfterViewInit } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';

import { takeUntil } from 'rxjs/operators';

import { FieldCoreComponent } from '../field-core';
import { FieldRendererConfig, Field } from './../../interfaces';
import { FieldRenderDirective } from './../../directives/field-render/field-render.directive';

@Component({
  selector: 'fs-field-renderer',
  templateUrl: 'field-renderer.component.html',
  styleUrls: [ 'field-renderer.component.scss' ],
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ],
})
export class FieldRendererComponent extends FieldCoreComponent implements OnInit {

  @Input() public config: FieldRendererConfig;

  @ContentChildren(FieldRenderDirective)
  public fieldRenders: QueryList<FieldRenderDirective>;

  public ngOnInit(): void {
    this.fieldChanged
      .pipe(
        takeUntil(this._destroy$)
      )
      .subscribe((item: Field) => {
        if (this.config.fieldChanged) {
          this.config.fieldChanged(item);
        }
      });
  }
}
