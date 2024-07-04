import { Directive, Input, OnChanges, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appToggleVisibility]',
  standalone: true,
})
export class ToggleVisibilityDirective<T> implements OnChanges {
  @Input() appToggleVisibility!: boolean;

  constructor(
    private template: TemplateRef<T>,
    private viewContainer: ViewContainerRef,
  ) {}

  ngOnChanges() {
    this.appToggleVisibility ? this.viewContainer.createEmbeddedView(this.template) : this.viewContainer.clear();
  }
}
