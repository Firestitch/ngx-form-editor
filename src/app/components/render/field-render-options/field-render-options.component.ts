import { Component, ViewChild, OnInit } from '@angular/core';
import { ControlContainer, NgForm, NgModel } from '@angular/forms';

import { FieldComponent } from '../../field/field.component';

@Component({
  selector: 'fs-field-render-options',
  templateUrl: 'field-render-options.component.html',
  styleUrls: ['field-render-options.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class FieldRenderOptionsComponent extends FieldComponent implements OnInit {

  @ViewChild('radiobuttons', { read: NgModel }) public radiobuttons: NgModel;

  public selected;

  public ngOnInit(): void {
    super.ngOnInit();
    this.selected = this.field.data.value.selected;
  }

  public otherInputClick(event: KeyboardEvent) {
    this.selected = 'other';
    this.radioChange(this.selected);
  }

  public radioChange(value) {
    this.field.data.value.other.selected = value === 'other';
    this.field.data.value.selected = value === 'other' ? null : value;
  }

  public validate = () => {
    if (this.field.config.configs.required === true && !this.radiobuttons.value) {
      throw 'This field is required';
    }
  }
}
