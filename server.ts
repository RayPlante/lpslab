import 'zone.js/dist/zone-node';
import { enableProdMode, InjectionToken } from '@angular/core';

// Express Engine
import { ngExpressEngine } from '@nguniversal/express-engine';
// Import module map for lazy loading
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

import * as express from 'express';
import { join } from 'path';

// Load the configuration data.  This is done at start-up so that we can fail
// fast is something goes wrong.
import * as proc from 'process';
import * as fs from 'fs';
import { LPSConfig } from './src/app/config/config';
import { CFG_DATA } from './src/app/config/config.service';

let cfgprovider = []
if (proc.env['PDR_CONFIG_FILE']) {
    let cfgfile = proc.env['PDR_CONFIG_FILE'];
    if (! fs.existsSync(cfgfile))
        throw new Error(cfgfile + ": Config file not found");
    if (! fs.statSync(cfgfile).isFile())
        throw new Error(cfgfile + ": Not a file");

    console.log("Expecting to load configuration data from " + cfgfile);
    // console.log("Loading configuration data from " + cfgfile);

    // Make sure there are no errors reading file.
    let data : LPSConfig = JSON.parse(fs.readFileSync(cfgfile, 'utf8'));
    data["source"] = "server-file";
    if (! data["mode"]) data["mode"] = "prod";
    
    // This is not working at the moment:  provider is not visible to
    // to the AppModule.  We will re-read the file in the ConfigService.
    // 
    cfgprovider.push({ provide: CFG_DATA, useValue: data });
}

if (proc.env['PDR_METADATA_DIR']) {
    let mddir = proc.env['PDR_METADATA_DIR'];
    if (! fs.existsSync(mddir))
        throw new Error(mddir + ": Metadata directory not found");
    if (! fs.statSync(mddir).isDirectory())
        throw new Error(mddir + ": Not a directory");

    console.log("Expecting to load resource metadata from " + mddir);
}

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Express server
const app = express();

const PORT = process.env.PORT || 4000;
const DIST_FOLDER = join(process.cwd(), 'dist');

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./server/main');

// Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    cfgprovider,
    provideModuleMap(LAZY_MODULE_MAP)
  ]
}));

app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, 'browser'));

// Example Express Rest API endpoints
// app.get('/api/**', (req, res) => { });

// Server static files from /browser
app.get('*.*', express.static(join(DIST_FOLDER, 'browser'), {
  maxAge: '1y'
}));

// All regular routes use the Universal engine
app.get('*', (req, res) => {
  res.render('index', { req, res });
});

// Start up the Node server
app.listen(PORT, () => {
  console.log(`Node Express server listening on http://localhost:${PORT}`);
});
