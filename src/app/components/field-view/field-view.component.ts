import { Component, Input } from '@angular/core';
import { FieldCoreComponent } from '../field-core';


@Component({
  selector: 'fs-field-view',
  templateUrl: 'field-view.component.html',
  styleUrls: [ 'field-view.component.scss' ],
})
export class FieldViewComponent extends FieldCoreComponent {
  public field: any = { config: {} };

  @Input('field') set setField(field) {
    this.field = field;
  }
}
