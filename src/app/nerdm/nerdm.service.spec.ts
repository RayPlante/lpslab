import * as nerdm from './nerdm';
import * as nerdsvc from './nerdm.service';
import { Observable } from 'rxjs';
import * as rxjs from 'rxjs';

describe('TransferMetadataService', function() {

    let trx : nerdm.MetadataTransfer;
    let svc : nerdsvc.MetadataService;
    let tdata : nerdm.NerdmRes = {
        "@id":  "ark:/88888/goober",
        ediid: "goober",
        title: "A Good Test"
    };

    beforeEach(() => {
        trx = new nerdm.MetadataTransfer();
        trx.set(nerdsvc.NERDM_MT_PREFIX+"goober", tdata);
        svc = new nerdsvc.TransferMetadataService(trx);
    });

    it("getMetadata", function(done) {
        let t1 = svc.getMetadata("goober");
        t1.subscribe((data) => { expect(data).toEqual(tdata); },
                     (err)  => { fail(err); });

        let t2 = svc.getMetadata("gomer");
        t2.subscribe((data) => { expect(data).toBeUndefined(); },
                     (err)  => { fail(err);  });

        rxjs.merge(t1, t2).subscribe(null, null, () => { done(); });
    });

});

class FailingMetadataService extends nerdsvc.MetadataService {
    getMetadata(id : string) : Observable<nerdm.NerdmRes> {
        throw new Error("delegate service resorted to.");
    }
};

describe('CachingMetadataService', function() {

    let trx : nerdm.MetadataTransfer;
    let svc : nerdsvc.MetadataService;
    let tdata : nerdm.NerdmRes = {
        "@id":  "ark:/88888/goober",
        ediid: "goober",
        title: "A Good Test"
    };

    beforeEach(() => {
        trx = new nerdm.MetadataTransfer();
        trx.set("goober", tdata);
        svc = new nerdsvc.CachingMetadataService(new FailingMetadataService(), trx);
    });

    it('getMetadata() via cache', function(done) {
        let t1 = svc.getMetadata("goober");
        t1.subscribe((data) => { expect(data).toEqual(tdata); },
                     (err)  => { fail(err); },
                     ()     => { done(); });
    });

    it('getMetadata() via delegate', function() {
        expect(() => { svc.getMetadata("gomer") }).toThrowError();
    });


});
