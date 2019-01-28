import { Component } from '@angular/core';

import { cloneDeep } from 'lodash';
import { MatDialog } from '@angular/material';
import { DialogExampleComponent } from '../dialog-example';

@Component({
  selector: 'example',
  templateUrl: 'example.component.html'
})
export class ExampleComponent {

  public fields = [];
  public valueFields = [];

  constructor(public dialog: MatDialog) {
    const fields2 = [
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
              guid: '11',
              label: 'Option A'
            },
            {
              guid: '22',
              label: 'Option B'
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
              guid: '33',
              label: 'First Name'
            },
            {
              guid: '44',
              label: 'Middle Name'
            },
            {
              guid: '55',
              label: 'Last Name'
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
              guid: '66',
              label: 'Option A'
            },
            {
              guid: '77',
              label: 'Option B'
            },
            {
              guid: '88',
              label: 'Option C'
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
              guid: '99',
              label: 'Option A'
            },
            {
              guid: '111',
              label: 'Option B'
            },
            {
              guid: '222',
              label: 'Option C'
            }
          ]
        },
      },
    ];

    this.valueFields = cloneDeep(this.fields);
  }

  public save(event) {
    if (event.index === 1) {
      this.valueFields = cloneDeep(this.fields);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogExampleComponent, {
      width: '600px',
      data: {fields: this.fields}
    });

    dialogRef.afterClosed().subscribe(result => {});
  }
}
