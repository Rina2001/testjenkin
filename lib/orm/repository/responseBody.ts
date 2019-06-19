import { Repository } from 'typeorm';
import { Status } from 'controller/base.controller';
import { Response } from 'express';

/**
 * Scripter : Rina Chen :>
 */
export class ResponseBody<T>{
    body:T[]
    status : String
}