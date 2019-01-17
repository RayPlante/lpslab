import { Component } from '@angular/core';

/**
 * The Landing Page Service root Component.
 * 
 * This component loads into the app-root element in the app's index.html.  
 */
@Component({
    selector: 'app-root',
    template: `
    <pdr-headbar></pdr-headbar>
    <router-outlet></router-outlet>
    <pdr-footbar></pdr-footbar>
    `,
    styleUrls: ['app.component.css']
})
export class AppComponent {
    title = 'PDR Resource Landing Page'
}
