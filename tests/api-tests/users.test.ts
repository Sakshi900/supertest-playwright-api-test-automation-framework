
import { test, expect } from  '@playwright/test'
import { ApiHelper } from '../../src/api-helper/api.helper';
import { Users } from '../../src/api-helper/users.api'

test.describe.parallel('Users API Tests', () => {
    let responseGetAllUsers, responseData;
    let emptyArray: string[] = [];
    test.beforeEach(async () => {
        await test.step('Get All Users Response', async () => {
            responseGetAllUsers = await Users.getAllUsers();
        })
    })

    test('should get all users in the system', async () => {

        await test.step('Verify Response Status Code ==> Get All Users Response', async () => {
            expect(await responseGetAllUsers.statusCode).toEqual(200)
        })

        await test.step('Verify Response Count ==> Get All Users Count Response', async () => {
            expect(await responseGetAllUsers.body.length).toBe(10)
        })
    })

    test('should be able to validate phone number (regardless of extension)', async () => {
        await test.step('Get Response Phone numbers', async () => {
            for (let index = 0; index < responseGetAllUsers.body.length; index++) {
                responseData = responseGetAllUsers.body[index].phone
                emptyArray.push(responseData)
                expect(responseData).not.toBe(null)
            }

        })
        await test.step('Verify Response Phone number count ==> get phone numbers', async () => {
            expect(emptyArray.length).toBe(10)
        })
    })

    test('should find all users who have the same catch phrase', async () => {
        await test.step('Get Response catch phrase', async () => {
            for (let index = 0; index < responseGetAllUsers.body.length; index++) {
                responseData = responseGetAllUsers.body[index].company.catchPhrase
                emptyArray.push(responseData)
                expect(responseData).not.toBe(null)
            }
        })

        await test.step('Rsponse from Users ==> Fetching duplicate catch phrases', async () => {
            const duplicateFound = ApiHelper.findDuplicates(responseGetAllUsers.body.length, emptyArray)
            //reflect in report
            console.log("if duplicate exists??", await duplicateFound, (await duplicateFound).length)
            expect((await duplicateFound).length).toBe(0)
        })
    })
})
