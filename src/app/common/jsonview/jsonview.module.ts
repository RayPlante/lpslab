import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';

import { JVPrimitiveValueComponent } from './primitivevalue.component';

/**
 * a module of components for displaying JSON data.
 */
@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        JVPrimitiveValueComponent
    ],
    providers: [ ],
    exports: [
        JVPrimitiveValueComponent
    ]
})
export class JSONViewModule { }

