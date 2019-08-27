import { Component, Input, forwardRef } from '@angular/core';

import { FieldComponent } from '../../field/field.component';
import { ControlContainer, NgForm, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';


@Component({
  selector: 'fs-field-render-checkboxes',
  templateUrl: 'field-render-checkboxes.component.html',
  styleUrls: [ 'field-render-checkboxes.component.scss' ],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FieldRenderCheckboxesComponent),
    multi: true
  }]
})
export class FieldRenderCheckboxesComponent extends FieldComponent implements ControlValueAccessor {

  private _value = false;

  public _onChange = (value: any) => { };
  public registerOnChange(fn: (value: any) => any): void { this._onChange = fn }
  public registerOnTouched(fn: () => any): void {  }

  public writeValue(value: any): void {
    this._value = value;
  }

  otherInput(field) {
    field.data.value.other.selected = true;
    this._change();
  }

  otherCheckbox(x) {
    this._change();
  }

  otherInputClick(event: KeyboardEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  handleCheckbox($event, option) {

    if ($event.checked === true) {
      this.field.data.value.selected.push(option.value);
    } else {
      this.field.data.value.selected.splice(this.field.data.value.selected.indexOf(option.value), 1);
    }

    this._change();
  }

  private _change() {
    this._onChange(this.field.data.value.other.selected || this.field.data.value.selected.length ? true : undefined);
  }
}
