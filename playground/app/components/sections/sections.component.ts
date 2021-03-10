import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { FS_FIELD_EDITOR_CONFIG, FieldEditorComponent, FieldEditorConfig, FieldType, Field } from '@firestitch/field-editor';
import { FsApi } from '@firestitch/api';

import { of } from 'rxjs';
import { map } from 'rxjs/operators';

import { DialogExampleComponent } from '../dialog-example';


@Component({
  selector: 'sections',
  templateUrl: 'sections.component.html',
  styleUrls: ['sections.component.scss']
})
export class SectionsComponent implements OnInit {

  @ViewChild('fieldEditor', { static: true }) fieldEditor: FieldEditorComponent;
  public config: FieldEditorConfig;
  public configured: FieldEditorConfig;
  public selectedIndex = 0;

  constructor(@Inject(FS_FIELD_EDITOR_CONFIG) private defaultConfig,
              public dialog: MatDialog,
              public fsApi: FsApi)  {}

  ngOnInit() {

    this.config = {
      fieldDrop: (field, toolbarItem) => {

        if (field.config.type === 'share') {
          field.config.configs.facebook = true;
          field.config.configs.google = true;

          // field.config.configs.id = toolbarItem.config.id;
          field.config.configs.showRequired = false;
        }
      },
      fieldChanged: (field: Field) => {
        console.log('Field Changed', field);
      },
      fieldAdd: () => {
        console.log('Field Add');
      },
      fieldAdded: () => {
        console.log('Field Added');
      },
      fieldMoved: () => {
        console.log('Field Moved');
      },
      fieldDuplicate: () => {
        console.log('Field Duplicate');
      },
      fieldDuplicated: () => {
        console.log('Field Duplicated');
      },
      fieldSelected: () => {
        console.log('Field Selected');
      },
      fieldUnselected: () => {
        console.log('Field Unselected');
      },
      fieldRemoved: () => {
        console.log('Field Removed');
      },
      imageUpload: (field, file: File) => {
        return this.fsApi.post('https://boilerplate.firestitch.com/api/dummy/upload', { file: file })
            .pipe(map((response) => response.data.url))
      },
      fileUpload: (field, file: File) => {

        console.log('File Selected', file);

        const data = {
          file: file,
          sleep: 1
        };

        return this.fsApi.post('https://boilerplate.firestitch.com/api/dummy/upload', data)
          .pipe(
            map(response => ({
              id: 99999,
              url: response.data.url,
              name: file.name
            })
          ))
      },
      fileRemove: (field, data) => {
        console.log('File Remove', field, data);
        return of(true);
      },
      fileRemoved: (field, data) => {
        console.log('File Removed', field, data);
      },
      fileDownload: (field, data) => {
        window.location = data.url;
      },
      toolbar: {
        items: [
          {
            section: 'Standart Fields',
            items: [
              {
                icon: 'share',
                label: 'Share',
                type: 'share',
                disabled: true,
              }
            ],
          },
          {
            section: 'Add Custom Fields',
            items: this.defaultConfig.toolbar.items,
          },
        ]
      },
      fields: [
        // {
        //   data: {},
        //   config:
        //   {
        //     guid: '99',
        //     type: 'share',
        //     label: 'Share',
        //     configs: {
        //       facebook: true,
        //       google: true
        //     }
        //   }
        // },

        {
          config: {
            guid: '11',
            type: FieldType.File,
            label: 'File Upload',
            configs: {
              basic: true
            }
          }
        },
        {
          data: {},
          config: {
            guid: '1',
            type: FieldType.Dropdown,
            label: 'Dropdown Question',
            configs: {
              required: true,
              options: [
                {
                  value: '11',
                  name: 'Option A'
                },
                {
                  value: '22',
                  name: 'Option B'
                }
              ]
            }
          },
        },
        {
          data: {},
          config:
          {
            guid: '2',
            type: FieldType.ShortText,
            label: 'Short Text Question',
            description: 'Description Description Description'
          },
        },
        {
          data: {

          },
          config:
          {
            guid: '4',
            type: FieldType.Name,
            label: 'Name Question',
            configs: {
              first_name: {
                display: true,
                label: 'test'
              }
            }
          }
        },
        {
          data: {},
          config:
          {
            guid: '3',
            type: FieldType.LongText,
            label: 'Long Text Question'
          },
        },
        {
          data: {},
          config:
          {
            guid: '6',
            type: FieldType.Phone,
            label: 'Phone Question'
          },
        },
        {
          data: {},
          config:
          {
            guid: '7',
            type: FieldType.Email,
            label: 'Email Question'
          },
        },
        {
          data: {},
          config:
          {
            guid: '333',
            type: FieldType.Address,
            label: 'Address'
          },
        },
        {
          data: {},
          config:
          {
            guid: '133',
            type: FieldType.Gender,
            label: 'Gender'
          },
        },
        {
          data: {},
          config:
          {
            guid: '5',
            type: FieldType.Choice,
            label: 'Choice Question',
            configs: {
              other: true,
              options: [
                {
                  value: '66',
                  name: 'Option A'
                },
                {
                  value: '77',
                  name: 'Option B'
                },
                {
                  value: '88',
                  name: 'Option C'
                }
              ]
            }
          }
        },
        {
          data: {},
          config:
        {
            guid: '8',
            type: FieldType.Time,
            label: 'Time Question'
          },
        },
        {
          data: {},
          config: {
            guid: '9',
            type: FieldType.Date,
            label: 'Date Question'
          },
        },
        {
          data: {},
          config:
          {
            guid: '10',
            type: FieldType.Checkbox,
            label: 'Checkboxes Question',
            configs: {
              other: true,
              options: [
                {
                  value: '99',
                  name: 'Option A'
                },
                {
                  value: '111',
                  name: 'Option B'
                },
                {
                  value: '222',
                  name: 'Option C'
                }
              ]
            }
          },
        },
      ]
    };
  }

  shareChange() {
    this.fieldEditor.fieldChanged.emit();
  }

  save() {
    console.log('Saved');
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogExampleComponent, {
      width: '600px',
      data: { config: this.config}
    });

    dialogRef.afterClosed().subscribe(result => {});
  }

  tabChange(event) {
    this.selectedIndex = event.index;
  }
}
