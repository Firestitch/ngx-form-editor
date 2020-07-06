import { Component, Input } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';

import { FieldCoreComponent } from '../field-core';
import { FieldRendererConfig } from './../../interfaces/field.interface';

@Component({
  selector: 'fs-field-renderer',
  templateUrl: 'field-renderer.component.html',
  styleUrls: [ 'field-renderer.component.scss' ],
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ],
})
export class FieldRendererComponent extends FieldCoreComponent {
  @Input() config: FieldRendererConfig;
}
