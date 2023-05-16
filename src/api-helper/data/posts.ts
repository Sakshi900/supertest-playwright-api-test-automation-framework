import { Post } from "../posts.api";

export class PostHelper {

    static getPostPayload(): Post {
        return {
            title: "sak",
            body: "test",
            userId: 1,
        }
    }
}