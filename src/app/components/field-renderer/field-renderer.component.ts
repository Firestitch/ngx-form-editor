import { Component } from '@angular/core';
import { FieldCoreComponent } from '../field-core';


@Component({
  selector: 'fs-field-renderer',
  inputs: ['config'],
  templateUrl: 'field-renderer.component.html',
  styleUrls: [ 'field-renderer.component.scss' ],
})
export class FieldRendererComponent extends FieldCoreComponent {


}
