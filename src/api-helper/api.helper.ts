export class ApiHelper {


    static findDuplicates(length: number, array: string[] = []): Promise<string[]> {

        let resultToReturn = false;
        let duplicate
        for (let i = 0; i < length; i++) {
            for (let j = 0; j < length; j++) {
                if (i !== j) {
                    if (array[i] === array[j]) {
                        resultToReturn = true;
                        duplicate = [] = array[i]
                        break;
                    }
                }
            }
            if (resultToReturn) {
                break;
            }
        }
        if (resultToReturn) {
            return duplicate
        }
        else {
            duplicate = [];
            return duplicate;
        }

    }
}