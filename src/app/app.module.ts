import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { TransferHttpCacheModule } from '@nguniversal/common';

import { AppComponent } from './app.component';
import { FrameModule } from './frame/frame.module';
import { ConfigModule } from './config/config.module';

/**
 * The root module for the Landing Page Service app.
 */
@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule.withServerTransition({appId: 'my-app'}),
        ConfigModule,  // provider for AppConfig
        FrameModule
    ],
    providers: [
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
