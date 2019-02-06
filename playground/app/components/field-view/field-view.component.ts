import { Component } from '@angular/core';

@Component({
  selector: 'field-view',
  templateUrl: 'field-view.component.html',
  styleUrls: ['field-view.component.scss']
})
export class FieldViewComponent {

  public field = {
      data: {
        value: 'A'
      },
      config: {
          type: 'dropdown',
          label: 'Custom Dropdown',
          options: [
            {
              value: 'A',
              name: 'Option A'
            },
            {
              value: 'B',
              name: 'Option B'
            }
          ]
      }
    }
}
