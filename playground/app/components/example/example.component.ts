import { Component } from '@angular/core';

@Component({
  selector: 'example',
  templateUrl: 'example.component.html'
})
export class ExampleComponent {

  public fields;
  public config;

  constructor() {
    this.config = {};
    this.fields = [
      {
        guid: '1',
        type: 'dropdown',
        label: 'Dropdown Question',
        state: 'active',
        other: true,
        field_options: [
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
      {
        guid: '2',
        type: 'shorttext',
        label: 'Short Text Question',
        state: 'active',
        description: 'Description Description Description'
      },
      {
        guid: '3',
        type: 'longtext',
        label: 'Long Text Question',
        state: 'active'
      },
      {
        guid: '4',
        type: 'name',
        label: 'Name Question',
        state: 'active',
        other: true,
        field_options: [
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
      {
        guid: '5',
        type: 'choice',
        label: 'Choice Question',
        state: 'active',
        other: true,
        field_options: [
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
      {
        guid: '6',
        type: 'phone',
        label: 'Phone Question',
        state: 'active'
      },
      {
        guid: '7',
        type: 'email',
        label: 'Email Question',
        state: 'active'
      },
      {
        guid: '8',
        type: 'time',
        label: 'Time Question',
        state: 'active'
      },
      {
        guid: '9',
        type: 'date',
        label: 'Date Question',
        state: 'active'
      },
      {
        guid: '10',
        type: 'checkbox',
        label: 'Checkboxes Question',
        state: 'active',
        other: true,
        field_options: [
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
    ];
  }
}
