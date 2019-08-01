import {Component, forwardRef, Input} from "@angular/core";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import { FieldComponent } from "../field/field.component";

@Component({
    selector: "fs-field-render-name-model",
    templateUrl: "./field-render-name-model.component.html",
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => FieldRenderNameModelComponent),
        multi: true
    }]

})
export class FieldRenderNameModelComponent extends FieldComponent implements ControlValueAccessor {
  @Input() field;

  value;

  onChange: (_: any) => void = (_: any) => {};
  onTouched: () => void = () => {};

  change(event, name) {
    this.field.data.value[name] = event;
    this.onChange(this.field.data.value);
  }

  writeValue(value: number): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
