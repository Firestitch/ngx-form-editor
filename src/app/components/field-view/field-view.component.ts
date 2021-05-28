import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  Input,
  OnInit,
  Optional
} from '@angular/core';

import { FsGalleryConfig, GalleryLayout, mime, ThumbnailScale } from '@firestitch/gallery';

import { of } from 'rxjs';

import { FieldEditorConfig } from '../../interfaces/field.interface';
import { FieldEditorService } from '../../services/field-editor.service';
import { FS_FIELD_EDITOR_CONFIG } from '../../injectors/fs-field-editor.providers';
import { FieldType } from '../../enums/field-type';


@Component({
  selector: 'fs-field-view',
  templateUrl: 'field-view.component.html',
  styleUrls: ['field-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldViewComponent implements OnInit {
  public field: any = { config: {} };

  public fieldType = FieldType;
  public galleryConfig: FsGalleryConfig;

  constructor(
    @Optional() public fieldEditor: FieldEditorService,
  ) {
    if (!this.fieldEditor) {
      const injector = Injector.create({
        providers: [
          {
            provide: FieldEditorService,
            deps: [FS_FIELD_EDITOR_CONFIG],
          },
        ],
      });

      this.fieldEditor = injector.get(FieldEditorService);
    }
  }

  @Input('field')
  public set setField(field) {
    this.field = field;
  }

  @Input('config')
  public set setConfig(config: FieldEditorConfig) {
    this.fieldEditor.setConfig(config);
  }

  public ngOnInit() {
    if (this.field.config.type === FieldType.File) {
      this._initGalleryConfig();
    }
  }

  private _initGalleryConfig(): void {
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
    }
  }
}
