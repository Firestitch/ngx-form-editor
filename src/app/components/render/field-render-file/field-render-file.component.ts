import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, ViewChild } from '@angular/core';

import { FsFile } from '@firestitch/file';

import { takeUntil } from 'rxjs/operators';

import { get } from 'lodash-es';

import { FieldComponent } from '../../field/field.component';
import { Field } from '../../../interfaces/field.interface';
import { of } from 'rxjs';
import { FileRenderFile } from '../../../classes/file-render-file';
import { GalleryLayout, FsGalleryConfig, FsGalleryComponent, mime, ThumbnailScale } from '@firestitch/gallery';
import { FieldEditorService } from '../../../services/field-editor.service';


@Component({
  selector: 'fs-field-render-file',
  templateUrl: 'field-render-file.component.html',
  styleUrls: [ 'field-render-file.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldRenderFileComponent extends FieldComponent implements OnInit {

  @ViewChild(FsGalleryComponent) gallery: FsGalleryComponent;

  @Input('field') set _field(field: Field) {

    field = this.initField(field);

    if (!field.data.value) {
      field.data.value = [];
    }

    this.field = field;
  }

  public allowedTypes = '';
  public galleryConfig: FsGalleryConfig;

  public constructor(
    public fieldEditor: FieldEditorService,
    private _cdRef: ChangeDetectorRef,
  ) {
    super();
  }

  public selectFile(files: any) {

    if (this.fieldEditor.config.fileUpload) {

      if (!this.field.config.configs.allowMultiple) {
        this.field.data.value = [];
      }

      // this needed because fsFilePicker returns array if it in multiple mode,
      // while it returns single file in it in single file mode
      if (files instanceof FsFile) {
        files = [files];
      }

      files.forEach((file: FsFile, index) => {

        this.fieldEditor.config.fileUpload(this.field, file.file)
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
    if (this.fieldEditor.config && this.fieldEditor.config.fileDownload) {
      actions.push({
        label: 'Download',
        click: (item) => {
          this.fieldEditor.config.fileDownload(this.field, item);
        }
      });
    }

    if (this.fieldEditor.config && this.fieldEditor.config.fileRemove) {
      actions.push({
        label: 'Remove',
        click: (item) => {

          this.fieldEditor.config.fileRemove(this.field, item)
          .subscribe(() => {

            const idx = this.field.data.value.indexOf(item);

            if (idx >= 0) {
              this.field.data.value.splice(idx, 1);
              this.gallery.refresh();

              if (this.fieldEditor.config.fileRemoved) {
                this.fieldEditor.config.fileRemoved(this.field, item);
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
        width: 200,
        scale: ThumbnailScale.None,
      },
      noResults: false,
      layout: GalleryLayout.Flow,
      toolbar: false,
      zoom: false,
      info: {
        icon: true,
      },
      fetch: () => {
        return of(this.field.data.value);
      },
    };

    if (actions.length) {
      this.galleryConfig.info = {
        icon: true,
        menu: {
          actions,
        },
      };
    }
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
