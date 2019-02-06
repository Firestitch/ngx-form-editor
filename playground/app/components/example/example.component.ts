import { Component, OnInit, Inject } from '@angular/core';
import { FS_FIELD_EDITOR_CONFIG } from 'fs-package';
import { MatDialog } from '@angular/material';
import { DialogExampleComponent } from '../dialog-example';


@Component({
  selector: 'example',
  templateUrl: 'example.component.html',
  styleUrls: ['example.component.scss']
})
export class ExampleComponent implements OnInit {

  public config: any;

  constructor(@Inject(FS_FIELD_EDITOR_CONFIG) private defaultConfig,
              public dialog: MatDialog)  {}

  ngOnInit() {

    this.config = {
      fieldDrop: (field, toolbarItem) => {

        if (field.config.type==='share') {
          field.config.facebook = true;
          field.config.google = true;

          field.config.id = toolbarItem.config.id;
        }
      },
      toolbar: {
        items: [{ icon: 'share',
                  label: 'Share',
                  type: 'share',
                  config: { id: 99 }
                }]
                .concat(this.defaultConfig.toolbar.items)
      },
      fields: [
        {
          data: {},
          config:
          {
            guid: '99',
            type: 'share',
            label: 'Share',
            state: 'active',
            facebook: true,
            google: true
          },
        },
        {
          data: {},
          config:
          {
            guid: '1',
            type: 'dropdown',
            label: 'Dropdown Question',
            state: 'active',
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
          },
        },
        {
          data: {},
          config:
          {
            guid: '2',
            type: 'shorttext',
            label: 'Short Text Question',
            state: 'active',
            description: 'Description Description Description'
          },
        },
        {
          data: {},
          config:
          {
            guid: '4',
            type: 'name',
            label: 'Name Question',
            state: 'active',
            other: true,
            options: [
              {
                value: '33',
                name: 'First Name'
              },
              {
                value: '44',
                name: 'Middle Name'
              },
              {
                value: '55',
                name: 'Last Name'
              }
            ]
          },
        },
        {
          data: {},
          config:
          {
            guid: '3',
            type: 'longtext',
            label: 'Long Text Question',
            state: 'active'
          },
        },
        {
          data: {},
          config:
          {
            guid: '6',
            type: 'phone',
            label: 'Phone Question',
            state: 'active'
          },
        },
        {
          data: {},
          config:
          {
            guid: '7',
            type: 'email',
            label: 'Email Question',
            state: 'active'
          },
        },
        {
          data: {},
          config:
          {
            guid: '5',
            type: 'choice',
            label: 'Choice Question',
            state: 'active',
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
          },
        },
        {
          data: {},
          config:
        {
            guid: '8',
            type: 'time',
            label: 'Time Question',
            state: 'active'
          },
        },
        {
          data: {},
          config: {
            guid: '9',
            type: 'date',
            label: 'Date Question',
            state: 'active'
          },
        },
        {
          data: {},
          config:
          {
            guid: '10',
            type: 'checkbox',
            label: 'Checkboxes Question',
            state: 'active',
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
          },
        },
      ]
    };

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogExampleComponent, {
      width: '600px',
      data: { config: this.config}
    });

    dialogRef.afterClosed().subscribe(result => {});
  }
}
