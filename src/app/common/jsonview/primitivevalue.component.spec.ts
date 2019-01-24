import * as jv from './primitivevalue.component';
import { JSONViewModule } from './jsonview.module';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

describe('JVPrimitiveComponent', function() {
    let cmp : jv.JVPrimitiveValueComponent;
    let fixture : ComponentFixture<jv.JVPrimitiveValueComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ JSONViewModule ],
            providers: [ ]
        }).compileComponents();

        fixture = TestBed.createComponent(jv.JVPrimitiveValueComponent);
        cmp = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('ctor', function() {
        expect(cmp.value).toBeNull();
        expect(cmp.displayColor).toBe("red");
        expect(cmp.display).toBe('"null"');
    })

    it('types', function() {
        cmp.value = 3;
        expect(cmp.value).toBe(3);
        expect(cmp.displayColor).toBe("blue");
        expect(cmp.display).toBe('3');

        cmp.value = false;
        expect(cmp.value).toBe(false);
        expect(cmp.displayColor).toBe("purple");
        expect(cmp.display).toBe('false');

        cmp.value = "hello";
        expect(cmp.value).toBe("hello");
        expect(cmp.displayColor).toBe("green");
        expect(cmp.display).toBe('"hello"');

        cmp.value = null;
        expect(cmp.value).toBeNull();
        expect(cmp.displayColor).toBe("red");
        expect(cmp.display).toBe('null');
    })

    it('override color', function() {
        cmp.booleanColor = "yellow";
        cmp.stringColor = "#531d9e";
        cmp.nullColor = "goober";
        cmp.numberColor = "white";

        cmp.value = 3;
        expect(cmp.value).toBe(3);
        expect(cmp.displayColor).toBe("white");
        expect(cmp.display).toBe('3');

        cmp.value = false;
        expect(cmp.value).toBe(false);
        expect(cmp.displayColor).toBe("yellow");
        expect(cmp.display).toBe('false');

        cmp.value = "hello";
        expect(cmp.value).toBe("hello");
        expect(cmp.displayColor).toBe("#531d9e");
        expect(cmp.display).toBe('"hello"');

        cmp.value = null;
        expect(cmp.value).toBeNull();
        expect(cmp.displayColor).toBe("goober");
        expect(cmp.display).toBe('null');
    });

    it('overrides', function() {
        cmp.color = "black";

        cmp.value = 3;
        expect(cmp.displayColor).toBe("black");
        cmp.value = false;
        expect(cmp.displayColor).toBe("black");
        cmp.value = "hello";
        expect(cmp.displayColor).toBe("black");
        cmp.value = null;
        expect(cmp.displayColor).toBe("black");
    });

});
