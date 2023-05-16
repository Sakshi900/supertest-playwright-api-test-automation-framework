import { config } from "./config";
import { API_END_POINTS } from "./const.api";
import { CRUDHelper } from "./crud";

export interface Post {
    title: string,
    body: string,
    userId: number,
}


export interface IHeaders {
    'Content-type': string,
    'charset': string,

}
export class Posts {

    private static URL = config.getBaseURL();
    private static endPoints = API_END_POINTS.POSTS_API_ENDPOINT;
    private static headers = {
        'Content-type': 'application/json',
        'charset': 'UTF - 8'
    }

    static createPost(body: Post) {
        return CRUDHelper.post(this.URL, this.endPoints, this.headers, JSON.stringify(body))
    }
    
    static updatePost(body: Post) {
        return CRUDHelper.put(this.URL, this.endPoints, this.headers, JSON.stringify(body))
    }


    static getPost(id: string) {
        return CRUDHelper.get(this.URL, this.endPoints + '/' + id, this.headers)
    }
    static deletePost(id: string) {
        return CRUDHelper.delete(this.URL, this.endPoints + '/' + id, this.headers)
    }
    static getAllPosts(): Promise<any> {
        return CRUDHelper.get(this.URL, this.endPoints, this.headers)
    }
    
    static getCommentsOnPosts(postId:string) {
        return CRUDHelper.get(this.URL, this.endPoints + '/' + postId +API_END_POINTS.COMMENTS_API_ENDPOINT, this.headers,postId)
    }
    


}