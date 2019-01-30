import { Component, OnInit, Input } from '@angular/core';

/**
 * a component rendering an JSON object.
 */
@Component({
    selector: 'jv-md',
    template: `
        <span *ngFor="let item of value | keyvalue">
          <div style="margin-left: 0ch;">
            <jv-prop [name]="item.key" [value]="item.value"
                     [namelen]="namelen" [indlen]="indlen"></jv-prop>
          </div>
        </span>
`,
    styles: []
})
export class JVMetadataComponent implements OnInit {
    @Input() value : {} = {};
    @Input() indlen : number = 4;
    public namelen : number = null;

    ngOnInit() {
        if (this.namelen == null) {
            let w = 8;
            for (let key in this.value) {
                if (w < key.length) w = key.length;
            }
            this.namelen = w;
        }
    }
}
