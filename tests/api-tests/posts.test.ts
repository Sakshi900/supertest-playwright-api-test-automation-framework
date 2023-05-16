import { test, expect } from  '@playwright/test'
import { ApiHelper } from '../../src/api-helper/api.helper';
import { PostHelper } from '../../src/api-helper/data/posts';
import { Posts } from '../../src/api-helper/posts.api'
import { Users } from '../../src/api-helper/users.api';
let responseGetSpecificPost, responseCreatePost, responseGetAllPosts, responseData, responsePostsPerUser, responseCommentsPerPost;
let emptyArray: string[] = [];
test.describe.parallel('GET all posts tests', () => {


    test.beforeEach(async () => {
        await test.step('Get All Posts Response', async () => {
            responseGetAllPosts = await Posts.getAllPosts();
        })
    })

    test('should get all posts in the system', async () => {

        await test.step('Verify Response Status Code ==> Get All Posts Response', async () => {
            expect(await responseGetAllPosts.statusCode).toEqual(200)
        })

        await test.step('Verify Response Count ==> Get All Posts Count Response', async () => {
            expect(await responseGetAllPosts.body.length).toBe(100)
        })
    })
    //checking post on specific user
    test('should be able to check how many posts per user', async () => {

        await test.step('Verify Response userId should not be null ==> Get All UserId from Posts', async () => {
            expect(await responseGetAllPosts.body[0].userId).not.toBe(null)
        })

        await test.step('Verify Response Count ==> Get All Posts Per UserId Count', async () => {
            responsePostsPerUser = await Users.getAllPostsOnEachUser(responseGetAllPosts.body[0].userId);
            expect(await responsePostsPerUser.body.length).toBe(10)
        })

        await test.step('Verify Response Status Code ==> Get All Posts Per User Status Code', async () => {
            expect(await responsePostsPerUser.statusCode).toEqual(200)
        })
        await test.step('Verify Response body ==> Get All Posts Per User Response Body', async () => {
            expect(await responsePostsPerUser.body[0].userId).toBe(responseGetAllPosts.body[0].userId);
            expect(await responsePostsPerUser.body[0].id).toEqual(1);
            expect(await responsePostsPerUser.body[0].title).not.toBe(null);
            expect(await responsePostsPerUser.body[0].body).not.toBe(null);
        })
    })

    test('should find any posts that have the same title', async () => {
        await test.step('Get all Response Title from posts', async () => {
            for (let index = 0; index < responseGetAllPosts.body.length; index++) {
                responseData = responseGetAllPosts.body[index].title
                emptyArray.push(responseData)
                expect(responseData).not.toBe(null)
            }
        })
        await test.step('Response from POSTS ==> Fetching duplicate titles', async () => {
            const duplicateFound = ApiHelper.findDuplicates(responseGetAllPosts.body.length, emptyArray)
            console.warn("if duplicate exists??", await duplicateFound, (await duplicateFound).length)
            expect((await duplicateFound).length).toBe(0)
        })
    })
})

test.describe.parallel('GET specific post tests', () => {

    test.beforeEach(async () => {
        await test.step('should be able to POST a new post', async () => {
            //data will not be poplulated to server
            responseCreatePost = await Posts.createPost(PostHelper.getPostPayload())
            expect(await responseCreatePost.statusCode).toEqual(201)
            expect(await responseCreatePost.body.id).toEqual(101)
        })
    })

    test('should be able to get specific posts', async () => {

        await test.step('Get a post ', async () => {
            //replacing the data created by dummy data to achieve the testing
            responseCreatePost.body.id = 1;
            responseGetSpecificPost = await Posts.getPost(responseCreatePost.body.id);
        })

        await test.step('Verify Response Status Code ==> Get A Specific Post', async () => {
            expect(await responseGetSpecificPost.statusCode).toEqual(200)
        })

        await test.step('Verify Response body ==> Get A Specific Post', async () => {
            expect(await responseGetSpecificPost.body.id).toBe(responseCreatePost.body.id)
            expect(await responseGetSpecificPost.body.userId).toBe(1)
        })
    })


    test('should be able to get comments on a post', async () => {
        responseGetAllPosts = await Posts.getAllPosts();
        await test.step('Verify Response Count ==> Get All Comments Per PostId', async () => {
            responseCommentsPerPost = await Posts.getCommentsOnPosts(responseGetAllPosts.body[0].userId);
            expect(await responseCommentsPerPost.body.length).toBe(5)
        })

        await test.step('Verify Response Status Code ==> Get All Posts Per User Status Code', async () => {
            expect(await responseCommentsPerPost.statusCode).toEqual(200)
        })
        await test.step('Verify Response body ==> Get All Posts Per User Response Body', async () => {
            expect(await responseCommentsPerPost.body[0].postId).toBe(responseGetAllPosts.body[0].userId);
            expect(await responseCommentsPerPost.body[0].id).toBe(1);
            expect(await responseCommentsPerPost.body[0].name).not.toBe(null);
            expect(await responseCommentsPerPost.body[0].email).not.toBe(null);
            expect(await responseCommentsPerPost.body[0].body).not.toBe(null);
        })

    })
})