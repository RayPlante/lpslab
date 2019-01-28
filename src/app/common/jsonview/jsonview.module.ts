import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';

import { JVPrimitiveValueComponent } from './primitivevalue.component'; 
import { JVArrayValueComponent } from './arrayvalue.component'; 
import { JVArrayEntryComponent } from './arrayentry.component'; 
import { JVObjectValueComponent } from './objectvalue.component'; 
import { JVPrimitivePropertyComponent } from './primproperty.component'; 
import { JVArrayPropertyComponent } from './arrayprop.component'; 
import { JVObjectPropertyComponent } from './objectproperty.component'; 
import { JVPropertyComponent } from './property.component'; 
import { JVPropertyNameComponent } from './propname.component'; 

/**
 * a module of components for displaying JSON data.
 */
@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        JVPrimitiveValueComponent,
        JVArrayValueComponent,
        JVArrayEntryComponent,
        JVObjectValueComponent,
        JVPropertyNameComponent,
        JVPrimitivePropertyComponent,
        JVArrayPropertyComponent,
        JVObjectPropertyComponent,
        JVPropertyComponent
    ],
    providers: [ ],
    exports: [
        JVPrimitiveValueComponent,
        JVArrayValueComponent,
        JVArrayEntryComponent,
        JVObjectValueComponent,
        JVPropertyNameComponent,
        JVPrimitivePropertyComponent,
        JVArrayPropertyComponent,
        JVObjectPropertyComponent,
        JVPropertyComponent
    ]
})
export class JSONViewModule { }

export { JSON_primitive } from './primitivevalue.component';
export { JVPrimitiveValueComponent, JVArrayValueComponent,
         JVObjectValueComponent,
         JVPropertyNameComponent, JVPropertyComponent, JVObjectPropertyComponent,
         JVPrimitivePropertyComponent, JVArrayPropertyComponent }
