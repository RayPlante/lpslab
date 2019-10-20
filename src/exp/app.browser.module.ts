import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';

/**
 * The root module for the browser-side application.  
 *
 * Top-level module bits common to both server and browser are imported via the AppModule.
 */
@NgModule({
    imports: [
        BrowserModule.withServerTransition({appId: 'PDR-Experiment'}),
        AppModule
    ],
    bootstrap: [ AppComponent ]
})
export class AppBrowserModule { }

