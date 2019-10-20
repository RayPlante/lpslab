import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ErrorHandler } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
// import { TransferHttpCacheModule } from '@nguniversal/common';

import { AppComponent } from './app.component';
import { SidebarModule } from 'ng-sidebar';

/**
 * The root module for the Landing Page Service app.
 */
@NgModule({
    imports: [
        HttpClientModule,
        SidebarModule.forRoot()
    ],
    declarations: [
        AppComponent
    ],
    providers: [
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
