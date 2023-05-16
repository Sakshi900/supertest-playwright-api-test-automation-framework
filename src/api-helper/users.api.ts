import { config } from "./config";
import { API_END_POINTS } from "./const.api";
import { CRUDHelper } from "./crud";

export interface User {
    title: string,
    body: string,
    userId: number,
}
export interface IHeaders {
    'Content-type': string,
    'charset': string,

}


export class Users {

    private static URL = config.getBaseURL();
    private static endPoints = API_END_POINTS.USERS_API_ENDPOINT;
    private static headers= {
        'Content-type': 'application/json',
        'charset': 'UTF - 8'
    }

    static createUser(body: User): Promise<any> {
        return CRUDHelper.post(this.URL, this.endPoints, this.headers, JSON.stringify(body))
    }

    static updateUser(body: User): Promise<any> {
        return CRUDHelper.put(this.URL, this.endPoints, this.headers, JSON.stringify(body))
    }
    static getUser(id: string): Promise<any> {
        return CRUDHelper.get(this.URL, this.endPoints + '/' + id, this.headers)
    }
    static deleteUser(id: string): Promise<any> {
        return CRUDHelper.delete(this.URL, this.endPoints + '/' + id, this.headers)
    }

    static getAllUsers(): Promise<any> {
        return CRUDHelper.get(this.URL, this.endPoints, this.headers)
    }

    static getAllPostsOnEachUser(userID: string): Promise<any> {
        return CRUDHelper.get(this.URL, this.endPoints + '/' + userID + API_END_POINTS.POSTS_API_ENDPOINT, this.headers)
    }

}