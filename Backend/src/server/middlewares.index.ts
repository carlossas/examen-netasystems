import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import { json, urlencoded } from 'express';
import { environment } from '../../environments/environment';
import { ConfigCore } from '../../environments/interfaces/environment.interface';
import useragent from 'express-useragent';

const SessionConfig: ConfigCore.Session = <ConfigCore.Session>environment.Session;

export let MIDDLEWARES = [
    cors(),
    helmet(),
    json({ limit: '50mb' }),
    urlencoded({ limit: '50mb' }),
    compression(),
    cookieParser(),
    useragent.express()
];

if (SessionConfig) {
    MIDDLEWARES.push(
        session({
            secret: SessionConfig.secret,
            name: SessionConfig.name,
            cookie: {
                maxAge: new Date(Date.now() + SessionConfig.expires).getMilliseconds(),
                expires: new Date(Date.now() + SessionConfig.expires),
            }
        }))
}