import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { FsFormModule } from '@firestitch/form';
import { FsSignatureModule } from '@firestitch/signature';
import { FsLabelModule } from '@firestitch/label';
import { FsHtmlEditorModule } from '@firestitch/html-editor';
import { FsDateModule } from '@firestitch/date';
import { FsDialogModule } from '@firestitch/dialog';

import { TermsFieldConfigComponent } from './components/terms-field-config';
import { TermsFieldRenderComponent } from './components/terms-field-render';
import { TermsFieldDialogComponent } from './components/terms-field-dialog';
import { SignatureComponent, SignatureDialogComponent } from './components';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    FlexLayoutModule,

    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDialogModule,
    MatButtonModule,

    FsFormModule,
    FsLabelModule,
    FsHtmlEditorModule,
    FsDialogModule,
    FsDateModule,
    FsSignatureModule,
  ],
  declarations: [
    TermsFieldConfigComponent,
    TermsFieldRenderComponent,
    TermsFieldDialogComponent,
    SignatureDialogComponent,
    SignatureComponent,
  ],
  exports: [
    TermsFieldConfigComponent,
    TermsFieldRenderComponent,
  ],
})
export class TermsFieldModule {}
