import Coursera from "./jesthooks";
const myCourseraAccount = new Coursera();

// beforeEach(() => {
//     console.log("beforeEach: Review the course structure and comments");
// });
beforeAll(() => {
    console.log(
        "beforeAll (Parent Group): I have enough balance in my account"
    );
});
// afterEach(() => {
//     console.log("afterEach: Balance reduced because of purchasing");
// });
// afterAll(() => {
//     console.log("afterAll: start to plan curriculum");
// });

describe("Test course w./ Andrew", () => {
    beforeAll(() => {
        console.log(
            "beforeAll (Child Group): Do research on Andrew's teaching skills and course work load"
        );
    });
    // afterEach(() => {
    //     console.log("afterEach: Andrew's course is free");
    // });

    test("Test Machine Learning w./ Andrew on Coursera", () => {
        myCourseraAccount.selectTeacher(1);
        myCourseraAccount.purchaseMachineLearning();
        console.log(myCourseraAccount.course);
        expect(myCourseraAccount.course).toEqual(
            "I have purchased Machine Learning with: Andrew"
        );
    });

    test("Test Deep Learning w./ Andrew on Coursera", () => {
        myCourseraAccount.selectTeacher(1);
        myCourseraAccount.purchaseDeepLearning();
        console.log(myCourseraAccount.course);
        expect(myCourseraAccount.course).toEqual(
            "I have purchased Deep Learning with: Andrew"
        );
    });
});

describe("Test course w./ Michael", () => {
    beforeAll(() => {
        console.log(
            "beforeAll (Child Group): Do research on Michael's teaching skills and course work load"
        );
    });
    // afterEach(() => {
    //     console.log("afterEach: Michael's course costs $50");
    // });

    test("Test Natural Language Processing w./ Michael on Coursera", () => {
        myCourseraAccount.selectTeacher(2);
        myCourseraAccount.purchaseNaturalLanguageProcessing();
        console.log(myCourseraAccount.course);
        expect(myCourseraAccount.course).toEqual(
            "I have purchased Natural Language Processing with: Michael"
        );
    });

    test("Test Knowledge Graph w./ Michael on Coursera", () => {
        myCourseraAccount.selectTeacher(2);
        myCourseraAccount.purchaseKnowledgeGraph();
        console.log(myCourseraAccount.course);
        expect(myCourseraAccount.course).toEqual(
            "I have purchased Knowledge Graph with: Michael"
        );
    });
});
