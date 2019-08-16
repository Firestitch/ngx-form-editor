import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FieldCoreComponent } from '../field-core';
import { ControlContainer, NgForm } from '@angular/forms';
import { config } from 'rxjs';


@Component({
  selector: 'fs-field-renderer',
  templateUrl: 'field-renderer.component.html',
  styleUrls: [ 'field-renderer.component.scss' ],
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ]
})
export class FieldRendererComponent extends FieldCoreComponent {
  @Input() config;
}
