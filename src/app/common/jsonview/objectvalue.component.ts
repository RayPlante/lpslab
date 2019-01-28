import { Component, OnInit, Input } from '@angular/core';

/**
 * a component rendering an JSON object.
 */
@Component({
    selector: 'jv-oval',
    template: `
      <span *ngIf="expanded; else jv_closedobject">
        {{'{'}} <span style="cursor: pointer;" (click)="collapseView()">-</span>
        <span *ngFor="let item of value | keyvalue">
          <div [style.margin-left]="indent">
            <jv-prop [name]="item.key" [value]="item.value"
                     [namelen]="namelen" [indlen]="indlen"></jv-prop>
          </div>
        </span>
        {{'}'}}
      </span>
      <ng-template #jv_closedobject>
        {{'{'}}
          <span style="cursor: pointer;" (click)="expandView()">+</span>
          <span>&nbsp;</span>
          <span class="jv-placeholder">set of sub-properties</span>
        {{'}'}}
      </ng-template>
`,
    styles: [`
.jv-placeholder {
   font-family: Arial;
   font-style:  oblique;
   font-size:  90%;
   color:  #888888;
   text-align: left;
   min-width: 10ch;
}
`]
})
export class JVObjectValueComponent implements OnInit {
    @Input() value : {} = {};
    @Input() expanded : boolean = true;
    @Input() step : number = 4;
    @Input() indlen : number = 0;
    public namelen : number = null;

    public get indent() : string { return JSON.stringify(this.indlen)+"ch"; }

    ngOnInit() {
        if (this.namelen == null) {
            let w = 8;
            for (let key in this.value) {
                if (w < key.length) w = key.length;
            }
            this.namelen = w;
        }
    }

    collapseView() { this.expanded = false; }
    expandView()   { this.expanded = true;  }
}
