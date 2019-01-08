import {Component} from '@angular/core';

@Component({
    selector: 'app-root',
    template: `
    <pdr-headbar></pdr-headbar>
    <!-- <router-outlet></router-outlet>
    <pdr-footbar></pdr-footbar> -->
    `,
    styleUrls: ['app.component.css']
})
export class AppComponent {
    title = 'PDR Resource Landing Page'
}
