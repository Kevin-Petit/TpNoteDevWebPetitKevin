import {
  ContentChild,
  Directive,
  ElementRef,
  HostListener,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[customTooltip]',
})
export class CustomTooltipDirective {
  @ContentChild('customTooltipContent')
  customTooltipContent!: ElementRef;

  pos!: DOMRect;
  x!: number;
  y!: number;

  tooltipDefaultPost: string = '';

  @HostListener('mouseenter') onMouseEnter() {
    this.render.setStyle(
      this.customTooltipContent.nativeElement,
      'background-color',
      'lightgrey'
    );
    if (this.tooltipDefaultPost != '') {
      this.render.setStyle(
        this.customTooltipContent.nativeElement,
        'position',
        this.tooltipDefaultPost
      );
    } else {
      this.render.setStyle(
        this.customTooltipContent.nativeElement,
        'position',
        ''
      );
    }
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.render.removeStyle(
      this.customTooltipContent.nativeElement,
      'background-color'
    );
    this.render.removeStyle(
      this.customTooltipContent.nativeElement,
      'position'
    );
  }

  ngAfterContentInit() {
    this.tooltipDefaultPost =
      this.customTooltipContent.nativeElement.getAttribute(
        'contentTooltipPosition'
      );
    console.log(this.tooltipDefaultPost);

    this.pos = this.el.nativeElement.getBoundingClientRect();
    this.x = this.pos.x;
    this.y = this.pos.y;
    console.log(this.x, this.y);
  }

  constructor(private el: ElementRef, private render: Renderer2) {}
}
