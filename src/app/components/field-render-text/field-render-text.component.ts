import { Component, SkipSelf, forwardRef } from '@angular/core';

import { FieldComponent } from '../field/field.component';
import { ControlContainer, NgForm } from '@angular/forms';
import { FsFormCommon } from '@firestitch/form';
//import { FsFormDirective } from '@firestitch/form';


@Component({
  selector: 'fs-field-render-text',
  templateUrl: 'field-render-text.component.html',
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ],
  //providers: [{ provide: FsFormCommon, useExisting: forwardRef(() => FsFormDirective) }],
})
export class FieldRenderTextComponent extends FieldComponent {

}
