import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { Field } from '@firestitch/field-editor';


@Component({
  selector: 'app-signature',
  templateUrl: './signature.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SignatureComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignatureComponent implements ControlValueAccessor {

  private _onChange: (value: unknown) => void;
  private _onTouch: (value: unknown) => void;

  constructor(
    private _cdRef: ChangeDetectorRef,
  ) {
  }

  public writeValue(obj: Field | undefined): void {
    this._cdRef.markForCheck();
  }

  public registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this._onTouch = fn;
  }

  public changed(signature): void {
    this._onChange(signature);
  }

}
