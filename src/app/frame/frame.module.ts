import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeadbarComponent } from "./headbar.component";

@NgModule({
    declarations: [
        HeadbarComponent
    ],
    imports: [ CommonModule ],
    exports: [ HeadbarComponent ]
})
export class FrameModule {

}

