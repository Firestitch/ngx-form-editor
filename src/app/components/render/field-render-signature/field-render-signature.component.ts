import {
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';

import { ControlContainer, NgForm } from '@angular/forms';

import * as SignaturePadNative from 'signature_pad';

import { FieldComponent } from '../../field/field.component';


@Component({
  selector: 'fs-field-render-signature',
  templateUrl: 'field-render-signature.component.html',
  styleUrls: [
    './field-render-signature.component.scss',
  ],
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ]
})
export class FieldRenderSignatureComponent extends FieldComponent implements OnInit, OnDestroy {

  @Output()
  public changed = new EventEmitter<string>();

  @ViewChild('canvas', { static: true })
  public canvas: ElementRef;

  public signaturePad: SignaturePadNative.default;

  constructor(
    private _el: ElementRef,
  ) {
    super();
  }

  public ngOnInit(): void {
    const canvas = this.canvas.nativeElement;
    canvas.width = 400;
    canvas.height = 120;

    this.signaturePad = new SignaturePadNative.default(canvas, {
      onEnd: () => {
        this.field.data.value = this.signaturePad.toDataURL();
        this.changed.emit();
      },
    });
  }

  public ngOnDestroy(): void {
    super.ngOnDestroy();

    this.signaturePad.off();
  }

  public clear(): void {
    this.signaturePad.clear();
  }

}
