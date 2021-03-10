import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { FieldEditorComponent } from '../field-editor.component';
import { ToolbarSection } from '../../../interfaces';


@Component({
  selector: 'fs-field-toolbar-section',
  templateUrl: 'field-toolbar-section.component.html',
  styleUrls: [ 'field-toolbar-section.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('collapse-expand', [
      state('collapsed', style({ height: '0px' })),
      state('expanded', style({ height: '*' })),

      transition('collapsed <=> expanded', animate('100ms ease-in'))
    ]),
  ],
  host: {
    class: 'fs-field-toolbar-section'
  },
})
export class FieldToolbarSectionComponent {

  @Input()
  public sectionItem: ToolbarSection;

  @Input()
  public fieldEditor: FieldEditorComponent;

  public state = 'expanded';

  public expanded = true;

  public toggleCollapse(): void {
    this.expanded = !this.expanded;

    this.state = this.expanded
      ? 'expanded'
      : 'collapsed';
  }

}
