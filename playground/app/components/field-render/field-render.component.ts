import { Component } from '@angular/core';

@Component({
  selector: 'field-render',
  templateUrl: 'field-render.component.html',
  styleUrls: ['field-render.component.scss']
})
export class FieldRenderComponent {

  public field = {
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
