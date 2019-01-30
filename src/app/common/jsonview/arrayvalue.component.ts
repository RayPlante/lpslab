import { Component, OnInit, Input } from '@angular/core';

export type JSON_primitive = string|number|boolean|null;

/**
 * a component rendering a primitive (string, number, boolean, or null) JSON value.
 */
@Component({
    selector: 'jv-aval',
    template: `
      <span *ngIf="expanded; else jv_closedarray">
        [ <span style="cursor: pointer;" (click)="collapseView()">-</span>
        <span class="jv-placeholder">&nbsp; list of values:</span>
        <span *ngFor="let value of vals; let i = index">
          <jv-array-entry [index]="i" [value]="value" 
                          [indlen]="indlen" [idxlen]="idxlen"></jv-array-entry>
        </span>
        ]
      </span>
      <ng-template #jv_closedarray>
        [ <span style="cursor: pointer;" (click)="expandView()">+</span>
          <span>&nbsp;</span>
          <span class="jv-placeholder">list of values</span> ]
      </ng-template>
`,
    styles: [`
.jv-arrayindex, .jv-placeholder {
   font-family: Arial;
   font-style:  oblique;
   color:  #888888;
   text-align: left;
   font-size:  90%;
   min-width: 5ch;
}
.jv-arrayindex {
   margin-left: 4ch;
   float: left;
}
`]
})
export class JVArrayValueComponent implements OnInit {
    @Input() vals : any[] = [];
    @Input() expanded : boolean = true;
    @Input() indlen : number = 4;
    public idxlen : number = null;

    log10(x) { return Math.log(x) * Math.LOG10E; }

    ngOnInit() {
        if (this.idxlen == null) {
            let w : number = Math.floor(this.log10(this.vals.length))+1;
            if (w < 4) w = 4;
            this.idxlen = w;
        }
    }

    collapseView() { this.expanded = false; }
    expandView()   { this.expanded = true;  }
}
