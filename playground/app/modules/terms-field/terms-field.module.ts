import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { FsFormModule } from '@firestitch/form';
import { FsLabelModule } from '@firestitch/label';

import { TermsFieldConfigComponent } from './components/terms-field-config';
import { TermsFieldRenderComponent } from './components/terms-field-render';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    FlexLayoutModule,

    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,

    FsFormModule,
    FsLabelModule,
  ],
  declarations: [
    TermsFieldConfigComponent,
    TermsFieldRenderComponent,
  ],
  exports: [
    TermsFieldConfigComponent,
    TermsFieldRenderComponent,
  ],
})
export class TermsFieldModule {}
