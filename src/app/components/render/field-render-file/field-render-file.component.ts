import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, ViewChild } from '@angular/core';

import { get } from 'lodash-es';

import { FsFile } from '@firestitch/file';

import { FieldComponent } from '../../field/field.component';
import { Field, FieldEditorConfig } from '../../../interfaces/field.interface';
import { takeUntil } from 'rxjs/operators';
import { of } from 'rxjs';
import { FileRenderFile } from '../../../classes/file-render-file';
import { GalleryLayout, FsGalleryConfig, FsGalleryComponent, mime } from '@firestitch/gallery';


@Component({
  selector: 'fs-field-render-file',
  templateUrl: 'field-render-file.component.html',
  styleUrls: [ 'field-render-file.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldRenderFileComponent extends FieldComponent implements OnInit {

  @ViewChild(FsGalleryComponent) gallery: FsGalleryComponent;

  @Input() config: FieldEditorConfig;

  @Input('field') set _field(field: Field) {

    field = this.initField(field);

    if (!field.data.value) {
      field.data.value = [];
    }

    this.field = field;
  }

  public allowedTypes = '';
  public galleryConfig: FsGalleryConfig;

  public constructor(private _cdRef: ChangeDetectorRef) {
    super();
  }

  public selectFile(files: any) {

    if (this.config.fileUpload) {

      if (!this.field.config.configs.allowMultiple) {
        this.field.data.value = [];
      }

      // this needed because fsFilePicker returns array if it in multiple mode,
      // while it returns single file in it in single file mode
      if (files instanceof FsFile) {
        files = [files];
      }

      files.forEach((file: FsFile, index) => {

        this.config.fileUpload(this.field, file.file)
        .pipe(
          takeUntil(this.$destory)
        )
        .subscribe((response: any) => {
          const file = new FileRenderFile(response.url, response.name);
          file.value = response;
          this.field.data.value.push(response);
          this.gallery.refresh();
          this._cdRef.markForCheck();
        });
      });
    }
  }

  public ngOnInit() {
    super.ngOnInit();

    const actions = [];
    if (this.config && this.config.fileDownload) {
      actions.push({
        label: 'Download',
        click: (item) => {
          this.config.fileDownload(this.field, item);
        }
      });
    }

    if (this.config && this.config.fileRemove) {
      actions.push({
        label: 'Remove',
        click: (item) => {

          this.config.fileRemove(this.field, item)
          .subscribe(() => {

            const idx = this.field.data.value.indexOf(item);

            if (idx >= 0) {
              this.field.data.value.splice(idx, 1);
              this.gallery.refresh();

              if (this.config.fileRemoved) {
                this.config.fileRemoved(this.field, item);
              }
            }
          });
        }
      });
    }

    this.galleryConfig = {
      map: (data) => {
        return {
          url: data.url,
          preview: data.url,
          name: data.name,
          mime: mime(data.name)
        }
      },
      thumbnail: {
        heightScale: 0.8,
        width: 200,
      },
      filters: [],
      layout: GalleryLayout.Flow,
      toolbar: false,
      zoom: false,
      info: {
        icon: true,
        menu: {
          actions: actions
        }
      },
      fetch: () => {
        return of(this.field.data.value);
      },
    };
  }

  public initField(field) {

    const config = get(this.field, 'config.configs.allowedFileTypes') || {};

    const types = this._getAllowedTypes(config);

    this.allowedTypes = types.length ? types.join(',') : '*';

    return super.initField(field);
  }

  private _getAllowedTypes(allowedTypes) {

    const allowed = [];

    if (!allowedTypes.other) {
      if (allowedTypes.image) {
        allowed.push('image/*');
      }

      if (allowedTypes.video) {
        allowed.push('video/*');
      }

      if (allowedTypes.pdf) {
        allowed.push('application/pdf');
      }
    }

    return allowed;
  }
}
