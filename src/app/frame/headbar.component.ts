import { Component, ElementRef } from '@angular/core';
// import { AppConfig } from '../config-service/config.service';

/**
 * This class represents the headbar component.
 */
@Component({
    moduleId: module.id,
    selector: 'pdr-headbar',
    templateUrl: 'headbar.component.html',
    styleUrls: ['headbar.component.css']
})
export class HeadbarComponent {

    layoutCompact: boolean = true;
    layoutMode: string = 'horizontal';
    searchLink: string = "";
    status: string = "Dev Version"

    constructor(private el: ElementRef) {
        this.searchLink = "https://data.nist.org/sdp/";
    }
  
}
