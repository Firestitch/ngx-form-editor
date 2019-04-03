import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FieldCoreComponent } from '../field-core';
import { ControlContainer, NgForm } from '@angular/forms';


@Component({
  selector: 'fs-field-renderer',
  inputs: ['config'],
  templateUrl: 'field-renderer.component.html',
  styleUrls: [ 'field-renderer.component.scss' ],
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ]
})
export class FieldRendererComponent extends FieldCoreComponent implements OnChanges {
  @Input() fileSelected: Function;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.setConfig && this.config.fileSelected) {
      this.fileSelected = this.config.fileSelected;
    }
  }
}
