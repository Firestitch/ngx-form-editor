
import { OnInit, Directive, TemplateRef, Input } from '@angular/core';


@Directive({
  selector: '[fsFieldRender]'
})
export class FieldRenderDirective implements OnInit {

  @Input() type;

  constructor(public templateRef: TemplateRef<any>) {}

  ngOnInit() {

  }
}
