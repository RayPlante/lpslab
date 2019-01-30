import { Component, Input, OnInit } from '@angular/core';

/**
 * a component rendering an object property composed of a name and a value
 */
@Component({
    selector: 'jv-prop',
    template: `
      <div class="jv-prop">
        <jv-prop-name [name]="name" [tip]="tip" 
                      [link]="link" [width]="namewd"></jv-prop-name>
        <div [ngSwitch]="vtype" 
             class="jv-prop-value" [style.margin-left]="vindent">
           <jv-aval *ngSwitchCase="'array'" [expanded]="(!name.startsWith('_') && name!='@context')" 
                    [vals]="value" [indlen]="indlen"></jv-aval>
           <jv-oval *ngSwitchCase="'object'"
                    [value]="value" [indlen]="indlen"></jv-oval>
           <jv-pval *ngSwitchDefault         
                    [value]="value"></jv-pval>
      </div>
`,
    styles: [`
.jv-prop {
  font-family: monospace;
  text-align: left;
}

.jv-prop-name {
  min-width: 10ch;
  float: left;
}

.jv-prop-value {
  margin: 1ch;
  transition-property: background-color;
  transition-duration: 1s;
}

.jv-prop-value:hover {
  margin: 1ch;
  background-color: #cccccc;
  border-radius: 5px;
}

`]
})
export class JVPropertyComponent {
    @Input() name   : string = null;
    @Input() link   : string = null;
    @Input() tip    : string = null;
    @Input() value  : any = null;
    @Input() namelen : number = 8;
    @Input() indlen : number = 4;

    public get indent() : string { return JSON.stringify(this.indlen)+"ch"; }
    public get vindent() : string {
        let len = 0;
        if (typeof(this.value) != "object")
            len = this.namelen+2;
        return JSON.stringify(len)+"ch";
    }
    public get namewd() : string {
        return JSON.stringify(this.namelen+3)+"ch";
    }

    /**
     * a label indicating the type of the JSON value
     */ 
    public vtype

    ngOnInit() {
        if (Array.isArray(this.value))
            this.vtype = "array";
        else
            this.vtype = typeof(this.value);

        if (this.name && this.name.length > this.namelen)
            this.namelen = this.name.length;
    }
}
