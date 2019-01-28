import { Component, Input } from '@angular/core';

/**
 * a component rendering an object property composed of a name and a value
 */
@Component({
    selector: 'jv-array-entry',
    template: `
      <div [style.margin-left]="indent">
        <div class="jv-arrayindex" [style.width]="idxwd">{{index}}. </div>
        <div [ngSwitch]="vtype" 
             class="jv-prop-value" [style.margin-left]="vindent">
           <jv-aval *ngSwitchCase="'array'"  
                    [vals]="value" [indlen]="indlen"></jv-aval>
           <jv-oval *ngSwitchCase="'object'"
                    [value]="value" [indlen]="indlen"></jv-oval>
           <jv-pval *ngSwitchDefault         
                    [value]="value"></jv-pval>
        </div>
      </div>
`,
    styles: [`
.jv-arrayindex {
   font-family: Arial;
   font-style:  oblique;
   color:  #888888;
   text-align: left;
   min-width: 5ch;
   float: left;
   font-size: 90%;
}

.jv-prop-value {
  margin: 1ch;
  margin-left: 0ch;
}

`]
})
export class JVArrayEntryComponent {
    @Input() index : number = 0;
    @Input() value : any = null;
    @Input() idxlen : number = 4;

    @Input() step : number = 4;
    @Input() indlen : number = 0;

    public get indent() : string { return JSON.stringify(this.indlen)+"ch"; }
    public get vindent() : string {
        let len = 0;
        if (typeof(this.value) != "object")
            len = this.idxlen+2;
        return JSON.stringify(len)+"ch";
    }
    public get idxwd() : string { return JSON.stringify(this.idxlen+2)+"ch"; }

    /**
     * a label indicating the type of the JSON value
     */ 
    public vtype

    ngOnInit() {
        if (Array.isArray(this.value))
            this.vtype = "array";
        else
            this.vtype = typeof(this.value);
    }
}
