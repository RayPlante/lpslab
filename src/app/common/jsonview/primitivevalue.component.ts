import { Component, OnInit, Input } from '@angular/core';

export type JSON_primitive = string|number|boolean|null;

/**
 * a component rendering a primitive (string, number, boolean, or null) JSON value.
 */
@Component({
    selector: 'jv-pval',
    template: `<span *ngIf="display" class="jv-pval" [style.color]="displayColor">{{display}}</span>`
})
export class JVPrimitiveValueComponent {
    @Input() nullColor : string = "red";
    @Input() numberColor : string = "blue";
    @Input() stringColor : string = "green";
    @Input() booleanColor : string = "purple";
    @Input() otherColor : string = "black";

    private _v : any = null;
    display : string = '"null"';
    displayColor : string = this.nullColor;
    @Input() color : string = null;

    @Input() set value(v : JSON_primitive) {
        this._v = v
        this.display = JSON.stringify(this._v)
        
        if (this.color)
            this.displayColor = this.color;
        else if (v === null)
            this.displayColor = this.nullColor;
        else {
            let tp = typeof(v);
            if (tp == "number")
                this.displayColor = this.numberColor;
            else if (tp == "boolean")
                this.displayColor = this.booleanColor;
            else if (tp == "string")
                this.displayColor = this.stringColor;
            else
                this.displayColor = this.otherColor;
        }
    }

    get value() : JSON_primitive { return this._v; }

}
