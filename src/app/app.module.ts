import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { TransferHttpCacheModule } from '@nguniversal/common';

import { AppComponent } from './app.component';
import { FrameModule } from './frame/frame.module';
import { ConfigModule } from './config/config.module';
import { ErrorHandler } from '@angular/core'
import { ErrorsModule, AppErrorHandler } from './errors/errors.module';
import { LandingModule } from './landing/landing.module';
import { AppRoutingModule } from './app-routing.module';

/**
 * The root module for the Landing Page Service app.
 */
@NgModule({
    imports: [
        BrowserModule.withServerTransition({appId: 'my-app'}),
        BrowserTransferStateModule,
        ConfigModule,  // provider for AppConfig
        FrameModule,
        ErrorsModule,
        LandingModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent
    ],
    providers: [
        AppErrorHandler,
        { provide: ErrorHandler, useClass: AppErrorHandler }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
