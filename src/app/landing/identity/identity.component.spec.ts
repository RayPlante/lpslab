import { ElementRef } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TransferState } from '@angular/platform-browser';
import { Title }    from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { IdentityComponent } from './identity.component';
import { IdentityModule } from './identity.module';
import { AngularEnvironmentConfigService } from '../../config/config.service';
import { AppConfig } from '../../config/config'
import { MetadataTransfer, NerdmRes } from '../../nerdm/nerdm'
import { MetadataService, TransferMetadataService } from '../../nerdm/nerdm.service'
import * as mock from '../../testing/mock.services';

describe('IdentityComponent', () => {
    let component : IdentityComponent;
    let fixture : ComponentFixture<IdentityComponent>;
    let cfg : AppConfig;
    let plid : Object = "browser";
    let ts : TransferState = new TransferState();
    let nrd : NerdmRes;
    let mdt : MetadataTransfer;
    let mds : MetadataService;
    let route : ActivatedRoute;
    let title : Title;

    beforeEach(() => {
        cfg = (new AngularEnvironmentConfigService(plid, ts)).getConfig() as AppConfig;
        cfg.locations.pdrSearch = "https://goob.nist.gov/search";
        cfg.status = "Unit Testing";
        cfg.appVersion = "2.test";
        
        nrd = {
            "@type": [ "nrd:SRD", "nrdp:DataPublication", "nrdp:DataPublicResource" ],
            "@id": "goober",
            title: "All About Me!"
        }
        mdt = new MetadataTransfer();
        mdt.set("NERDm Resource:goober", nrd)
        mds = new TransferMetadataService(mdt);

        let r : unknown = new mock.MockActivatedRoute("/id/goober", {id: "goober"});
        route = r as ActivatedRoute;
        // title = new mock.Title();
    });

    let setupComponent = function(rec : NerdmRes) {
        TestBed.configureTestingModule({
            imports: [ IdentityModule ],
            providers: [
                { provide: ActivatedRoute,  useValue: route },
                { provide: ElementRef,      useValue: null },
                { provide: AppConfig,       useValue: cfg },
                { provide: MetadataService, useValue: mds }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(IdentityComponent);
        component = fixture.componentInstance;
        component.md = rec;
        fixture.detectChanges();
    }
    
    it('displays identity metadata', () => {
        setupComponent(nrd);
        expect(component).toBeDefined();
        expect(component.md.title).toBe("All About Me!");

        let cmpel = fixture.nativeElement;
        let el = cmpel.querySelector("h2"); 
        expect(el.textContent).toBe(component.md.title);
        el = cmpel.querySelector(".recordType");
        expect(el.textContent).toBe("Standard Reference Data");
    });

});
