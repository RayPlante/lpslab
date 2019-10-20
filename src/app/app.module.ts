import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ErrorHandler } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
// import { TransferHttpCacheModule } from '@nguniversal/common';

import { AppComponent } from './app.component';
import { FrameModule } from './frame/frame.module';
import { ConfigModule } from './config/config.module';
import { NerdmModule } from './nerdm/nerdm.module';
import { ErrorsModule, AppErrorHandler } from './errors/errors.module';
import { LandingModule } from './landing/landing.module';
import { CreateModule } from './create/create.module'; 
import { AppRoutingModule } from './app-routing.module';

/**
 * The root module for the Landing Page Service app.
 */
@NgModule({
    imports: [
        HttpClientModule,
        ConfigModule,  // provider for AppConfig
        NerdmModule,   // provider for MetadataService (which depends on AppConfig; order matters!)
        FrameModule,
        ErrorsModule,
        LandingModule,
        CreateModule,
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
