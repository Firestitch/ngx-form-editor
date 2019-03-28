import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FS_FIELD_EDITOR_CONFIG, FieldEditorComponent } from '@firestitch/field-editor';
import { MatDialog } from '@angular/material';
import { DialogExampleComponent } from '../dialog-example';


@Component({
  selector: 'example',
  templateUrl: 'example.component.html',
  styleUrls: ['example.component.scss']
})
export class ExampleComponent implements OnInit {

  @ViewChild('fieldEditor') fieldEditor: FieldEditorComponent;
  public config: any;

  constructor(@Inject(FS_FIELD_EDITOR_CONFIG) private defaultConfig,
              public dialog: MatDialog)  {}

  ngOnInit() {

    this.config = {
      fieldDrop: (field, toolbarItem) => {

        if (field.config.type === 'share') {
          field.config.configs.facebook = true;
          field.config.configs.google = true;

          field.config.configs.id = toolbarItem.config.id;
          field.config.configs.showRequired = false;
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
          data: {},
          config:
          {
            guid: '1',
            type: 'dropdown',
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
            configs: {
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
            }
          }
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
            guid: '333',
            type: 'address',
            label: 'Address',
            state: 'active'
          },
        },
        {
          data: {},
          config:
          {
            guid: '133',
            type: 'gender',
            label: 'Gender',
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
    this.fieldEditor.fieldChanged$.emit();
  }

  changed(e) {
    console.log('Field Changed', e);
  }

  added(e) {
    console.log('Field Added', e);
  }

  moved(e) {
    console.log('Field Moved', e);
  }

  duplicated(e) {
    console.log('Field Duplicated', e);
  }

  duplicate(e) {
    console.log('Field Duplicate', e);
  }

  add(e) {
    console.log('Field Add', e);
  }

  selected(e) {
    console.log('Field Selected', e);
  }

  unselected(e) {
    console.log('Field Unselected', e);
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
}
