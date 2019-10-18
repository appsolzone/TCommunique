import { Component, AfterViewInit, Input, ViewChild,  ElementRef, Renderer2 } from "@angular/core";
import { IonicPage } from "ionic-angular";
/**
 * Generated class for the FlightExpandableComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'flight-expandable',
  templateUrl: 'flight-expandable.html'
})
export class FlightExpandableComponent implements AfterViewInit {
  @ViewChild("expandWrapper", { read: ElementRef }) expandWrapper: ElementRef;
  @Input("expanded") expanded: boolean = false;
  @Input("expandHeight") expandHeight: string = "700px";
  text: string;

  constructor(public renderer: Renderer2) {
    console.log('Hello FlightExpandableComponent Component');
    this.text = 'Hello World';
  }
  ngAfterViewInit() {
    this.renderer.setStyle(this.expandWrapper.nativeElement, "max-height", this.expandHeight);
  }

}
