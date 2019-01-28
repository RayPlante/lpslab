import * as jv from './propname.component';
import { JSONViewModule } from './jsonview.module';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

fdescribe('JVPropertyNameComponent', function() {
    let cmp : jv.JVPropertyNameComponent;
    let fixture : ComponentFixture<jv.JVPropertyNameComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ JSONViewModule ],
            providers: [ ]
        }).compileComponents();

        fixture = TestBed.createComponent(jv.JVPropertyNameComponent);
        cmp = fixture.componentInstance;
        cmp.name = "description";
        cmp.width = "150px";
        fixture.detectChanges();
    });

    it('property name, no link, no tip', function() {
        let cmpel = fixture.nativeElement;
        let el = cmpel.querySelector(".jv-prop-name")
        expect(el.clientWidth).toBe(150);

        expect(el).not.toBeNull();
        el = el.querySelector("span");
        expect(el).not.toBeNull();
        
        expect(el.classList.contains("withtip")).toBe(false);
        expect(cmpel.querySelector(".tiptext")).toBeNull();
        expect(cmpel.querySelector("a")).toBeNull();
        el = el.querySelector("span");
        expect(el.textContent).toBe("description");
    });

    it('property name, with link, no tip', function() {
        let cmpel = fixture.nativeElement;
        let el = cmpel.querySelector(".jv-prop-name")
        let alink = "http://who.am.i/description";
        cmp.link = alink;
        fixture.detectChanges();
        
        expect(el).not.toBeNull();
        el = el.querySelector("span");
        expect(el).not.toBeNull();
        
        expect(el.classList.contains("withtip")).toBe(false);
        expect(cmpel.querySelector(".tiptext")).toBeNull();
        el = el.querySelector("a");
        expect(el).not.toBeNull();
        expect(el.href).toBe(alink);
        expect(el.textContent).toBe("description");
    });

    it('property name, with link, with tip', function() {
        let cmpel = fixture.nativeElement;
        let el = cmpel.querySelector(".jv-prop-name")
        let alink = "http://who.am.i/description";
        let def = "what it's about";
        cmp.tip = def;
        cmp.link = alink;
        fixture.detectChanges();

        expect(el).not.toBeNull();
        expect(el.querySelector(".withtip")).not.toBeNull();
        el = el.querySelector(".tiptext");
        expect(el).not.toBeNull();
        expect(el.textContent).toBe(def);
        el = cmpel.querySelector("a");
        expect(el).not.toBeNull();
        expect(el.href).toBe(alink);
        expect(el.textContent).toBe("description");
    });

    it('property name, with tip, no link', function() {
        let cmpel = fixture.nativeElement;
        let el = cmpel.querySelector(".jv-prop-name")
        let def = "what it's about";
        cmp.tip = def;
        fixture.detectChanges();

        el = el.querySelector(".withtip");
        expect(el).not.toBeNull();
        expect(cmpel.querySelector("a")).toBeNull();
        el = el.querySelector("span");
        expect(el.textContent).toBe("description");
        el = cmpel.querySelector(".tiptext");
        expect(el).not.toBeNull();
        expect(el.textContent).toBe(def);
    });
});

