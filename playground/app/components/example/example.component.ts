import { Component } from '@angular/core';

@Component({
  selector: 'example',
  templateUrl: 'example.component.html'
})
export class ExampleComponent {

  public form;
  public config;

  constructor() {
    this.config = {};
    this.form = {
      fields: [
        {
          id: '1',
          type: 'dropdown',
          label: 'Dropdown Question',
          state: 'active',
          other: true,
          options: [
            {
              id: '11',
              label: 'Option A'
            },
            {
              id: '22',
              label: 'Option B'
            }
          ]
        },
        {
          id: '2',
          type: 'shorttext',
          label: 'Short Text Question',
          state: 'active',
          description: 'Description Description Description'
        },
        {
          id: '3',
          type: 'longtext',
          label: 'Long Text Question',
          state: 'active'
        },
        {
          id: '4',
          type: 'name',
          label: 'Name Question',
          state: 'active',
          other: true,
          options: [
            {
              id: '33',
              label: 'First Name'
            },
            {
              id: '44',
              label: 'Middle Name'
            },
            {
              id: '55',
              label: 'Last Name'
            }
          ]
        },
        {
          id: '5',
          type: 'choice',
          label: 'Choice Question',
          state: 'active',
          other: true,
          options: [
            {
              id: '66',
              label: 'Option A'
            },
            {
              id: '77',
              label: 'Option B'
            },
            {
              id: '88',
              label: 'Option C'
            }
          ]
        },
        {
          id: '6',
          type: 'phone',
          label: 'Phone Question',
          state: 'active'
        },
        {
          id: '7',
          type: 'email',
          label: 'Email Question',
          state: 'active'
        },
        {
          id: '8',
          type: 'time',
          label: 'Time Question',
          state: 'active'
        },
        {
          id: '9',
          type: 'date',
          label: 'Date Question',
          state: 'active'
        },
        {
          id: '10',
          type: 'checkbox',
          label: 'Checkboxes Question',
          state: 'active',
          other: true,
          options: [
            {
              id: '99',
              label: 'Option A'
            },
            {
              id: '111',
              label: 'Option B'
            },
            {
              id: '222',
              label: 'Option C'
            }
          ]
        },
      ]
    }
  }
}
