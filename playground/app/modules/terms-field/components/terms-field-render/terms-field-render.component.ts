import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  Input,
  OnDestroy,
  Optional,
} from '@angular/core';
import {
  ControlContainer,
  ControlValueAccessor,
  NgForm,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { guid } from '@firestitch/common';

import { controlContainerFactory } from '@firestitch/core';
import { Field } from '@firestitch/field-editor';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { SignatureDialogComponent } from '../signature-dialog';
import { TermsFieldDialogComponent } from '../terms-field-dialog';


@Component({
  selector: 'app-terms-field-render',
  templateUrl: './terms-field-render.component.html',
  styleUrls: ['./terms-field-render.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TermsFieldRenderComponent),
      multi: true,
    },
  ],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: controlContainerFactory,
      deps: [[new Optional(), NgForm]],
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TermsFieldRenderComponent implements ControlValueAccessor, OnDestroy {

  @Input() public agreedName;
  @Input() public disabled;

  public checked;
  public signature;
  public name;

  private _onChange: (value: unknown) => void;
  private _onTouch: (value: unknown) => void;

  private _field: Field = null;
  private _destroy$ = new Subject();

  constructor(
    private _cdRef: ChangeDetectorRef,
    private _dialog: MatDialog,
    private _sanitizer: DomSanitizer,
  ) {
    this.name = `terms-${guid()}`;
  }

  public checkboxChange(event: MatCheckboxChange): void {
    if (event.checked) {
      this.agree();
    } else {
      this.disagree();
    }
  }

  public agree(signature?: string) {
    this.field.data = {
      agreed: {
        signature,
        date: new Date(),
        name: this.agreedName,
      },
    }

    this.signature = null;
    if (signature) {
      const base64 = `data:image/svg+xml;base64,${window.btoa(signature)}`;
      this.signature = this._sanitizer.bypassSecurityTrustUrl(base64);
    }
  }

  public disagree() {
    this.signature = null;
    this.field.data = {
      agreed: null,
    }
  }

  public checkboxClick(event: UIEvent): void {
    if (!this.disabled) {
      if (this.checked) {
        this.field.data.agree = {};
      } else if (this.field.config.configs.signature) {
        event.preventDefault();

        const dialogRef = this._dialog.open(SignatureDialogComponent, {
          data: { field: this._field },
        });

        dialogRef.afterClosed()
          .pipe(
            takeUntil(this._destroy$),
          )
          .subscribe((signature) => {
            if (signature) {
              this.checked = true;
              this.agree(signature);
              this._cdRef.markForCheck();
            }
          });
      }
    }
  }

  public get field(): Field {
    return this._field;
  }

  public urlClick(event: UIEvent): void {
    event.stopPropagation();
  }

  public dialogClick(event: UIEvent): void {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();

    this._dialog.open(TermsFieldDialogComponent, {
      data: { content: this.field.config.configs.content },
      minWidth: '500px',
    });
  }

  public writeValue(field: Field): void {
    if (field && !field.data) {
      field.data = {};
    }

    this._field = field;
    this._cdRef.markForCheck();
  }

  public fieldChange(field: Field): void {
    this._field = field;
    this._onChange(field);
  }

  public registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this._onTouch = fn;
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

}
