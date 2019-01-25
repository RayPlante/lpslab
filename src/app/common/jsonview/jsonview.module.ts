import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';

import { JVPrimitiveValueComponent } from './primitivevalue.component'; 
import { JVPropertyComponent } from './property.component'; 

/**
 * a module of components for displaying JSON data.
 */
@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        JVPrimitiveValueComponent,
        JVPropertyComponent
    ],
    providers: [ ],
    exports: [
        JVPrimitiveValueComponent,
        JVPropertyComponent
    ]
})
export class JSONViewModule { }

export { JSON_primitive } from './primitivevalue.component';
