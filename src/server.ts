import env from './env';
import crypto from 'node:crypto';

import { app } from './app';

app.listen({port:env.PORT}).then(()=>console.log('HTTP Server Running!'))