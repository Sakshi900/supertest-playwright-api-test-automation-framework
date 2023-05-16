import { IHeaders } from "./posts.api";
import  request  from 'supertest';
export class CRUDHelper {

    static get(URL: string,
        endPoints:string,
        headers: IHeaders,
        parameters?: string): Promise<any> {
        return request(URL).get(endPoints).set(headers).query(parameters as string)
    }


    static post(URL: string,
        endPoints:string,
        headers: IHeaders,
        body: string): Promise<any> {
        return request(URL).post(endPoints).set(headers).send(body)
    }

    static put(URL: string,
        endPoints:string,
        headers: IHeaders,
        body: string): Promise<any> {
        return request(URL).put(endPoints).set(headers).send(body)
    }


    static delete(URL: string,
        endPoints:string,
        headers: IHeaders,
        parameters?: string): Promise<any> {
        return request(URL).get(endPoints).set(headers).query(parameters as string)
    }
}