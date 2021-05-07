import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { FieldComponent } from '../../field/field.component';
import { ControlContainer, NgForm } from '@angular/forms';


@Component({
  selector: 'fs-field-render-content',
  templateUrl: 'field-render-content.component.html',
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldRenderContentComponent extends FieldComponent implements OnInit {

  public ngOnInit(): void {
    super.ngOnInit();

    this.field.config.configs = {
      ...this.field.config.configs,
      autofocus: false,
    };
  }
}
