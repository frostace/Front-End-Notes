import { fetchData, fetchData2, fetchData3, fetchData4 } from "./fetchData.js";

// if the method accepts a callback function to handle the response data
test("fetchData Testing", (done) => {
    fetchData((data) => {
        expect(data).toEqual({
            success: true,
        });
        done(); // this command guarantees that the async function is finished
    });
});

// if the method returns a Promise Object directly
test("fetchData2 Testing", () => {
    return fetchData2().then((response) => {
        expect(response.data).toEqual({
            success: true,
        });
    });
});

// test for Promise error (e.g.: 404)
test("fetchData3 Testing", () => {
    // simply apply chain rule on Promise with .catch() is wrong, because if it doesn't throw an error, it won't execute the code
    expect.assertions(1);
    return fetchData3().catch((err) => {
        // console.log(err.toString());
        expect(err.toString().indexOf("404") > -1).toBe(true);
    });
});

test("fetchData4 Testing", async () => {
    await expect(fetchData4()).resolves.toMatchObject({
        data: {
            success: true,
        },
    });
});
