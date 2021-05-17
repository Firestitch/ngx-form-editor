import { Component, ChangeDetectionStrategy, OnInit, ViewChild } from '@angular/core';

import { GalleryLayout, FsGalleryConfig, FsGalleryComponent, mime, ThumbnailScale } from '@firestitch/gallery';

import { of } from 'rxjs';

import { FieldComponent } from '../../field/field.component';
import { FieldEditorService } from '../../../services/field-editor.service';


@Component({
  selector: 'fs-field-render-file',
  templateUrl: 'field-render-file.component.html',
  styleUrls: ['field-render-file.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldRenderFileComponent extends FieldComponent implements OnInit {

  @ViewChild(FsGalleryComponent)
  public gallery: FsGalleryComponent;

  public galleryConfig: FsGalleryConfig;

  public constructor(
    public fieldEditor: FieldEditorService,
  ) {
    super();
  }

  public change(files: any) {
    this.field.data.value = files;
    this.gallery.refresh();
  }

  public ngOnInit() {
    super.ngOnInit();

    if (!this.field?.data?.value) {
      this.field.data.value = [];
    }

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

}
