import { Component, SkipSelf, OnInit } from '@angular/core';
import { FieldCoreComponent } from '../field-core';
import { ControlContainer } from '@angular/forms';


@Component({
  selector: 'fs-field-renderer',
  inputs: ['config'],
  templateUrl: 'field-renderer.component.html',
  styleUrls: [ 'field-renderer.component.scss' ],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: (container: ControlContainer) => container,
      deps: [[new SkipSelf(), ControlContainer]],
    }
  ]
})
export class FieldRendererComponent extends FieldCoreComponent {
}
