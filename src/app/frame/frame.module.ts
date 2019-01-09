import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeadbarComponent } from "./headbar.component";

/**
 * A module that provides components that make up the "frame" of the landing 
 * page--namely, the header and the footer.
 */
@NgModule({
    declarations: [
        HeadbarComponent
    ],
    imports: [
        CommonModule       // provides template directives
    ],
    exports: [ HeadbarComponent ]
})
export class FrameModule {

}

