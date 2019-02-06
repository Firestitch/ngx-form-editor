import { Component } from '@angular/core';
import { FieldCoreComponent } from '../field-core';

@Component({
  selector: 'fs-field-viewer',
  inputs: ['config'],
  templateUrl: 'field-viewer.component.html',
  styleUrls: [ 'field-viewer.component.scss' ],
})
export class FieldViewerComponent extends FieldCoreComponent {

}
