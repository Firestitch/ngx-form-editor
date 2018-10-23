import { Component, Input } from '@angular/core';
import { FormEditorConfig } from 'src/app/interfaces';
import { DragulaService } from 'ng2-dragula';
import { DragulaOptions } from 'dragula';

@Component({
  selector: 'fs-form-editor',
  templateUrl: 'form-editor.component.html',
  styleUrls: [ 'form-editor.component.scss' ],
})
export class FormEditorComponent {

  @Input() config: FormEditorConfig;
  @Input() form;
  constructor(private dragulaService: DragulaService) {
    const dragOptions: DragulaOptions = {
      moves: (el, container, handle) => {
        return handle.className.indexOf('field-drag-icon')>=0;
      },
      direction: 'vertical'
    };
    dragulaService.createGroup('groupFields',dragOptions);
  }

}
