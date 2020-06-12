# 0. Install

```shell
npm install jest@24.8.0 -D
```

# 1. Jest Condiguration

To create a "jest.config.js" file in the workspace: 

```shell
npx jest --init
```
To show the testing coverage in the project:

```shell
npx jest --coverage
```

And this command will also generate a folder under "coverage" folder called "Icov-report", we can see the visualized testing report in "index.html"

# 2. Test example

Write a "helloworld.js" code
```JavaScript
// helloworld.js
function helloworld(input) {
  	return "helloworld" + String(input)
}

module.exports = {
  	helloworld
}
```

Write a "helloworld.test.js" test script
```JavaScript
// helloworld.test.js
const helloworldCode = require("./helloworld.js")
const {helloworld} = helloworldCode

test("test for helloworld, input=300", () => {
  	expect(helloworld(300)).toBe("helloworld300");
});
```

Go to package.json to modify the "scripts" property
```json
{
  	...
  	"scripts": {
      "test": "jest"
    },
  	...
}
```

# 3. Jest Matchers

### toBe()

Jest "toBe()" Matchers use "===" to test equality:

```JavaScript
test("toBe Matcher1 - primitive types", () => {
    expect("primitive types").toBe("primitive types");
}); // pass

test("toBe Matcher2 - primitive types", () => {
    expect({ number: 1 }).toBe({ number: 1 });
}); // fail
```

### toEqual()

Jest "toEqual()" Mathcers use "==" to test equality:

```JavaScript
test("toEqual Matcher1 - primitive types", () => {
    expect("primitive types").toEqual("primitive types");
}); // pass

test("toEqual Matcher1 - complex types", () => {
    expect({ number: 1 }).toEqual({ number: 1 });
}); // pass
```

### toBeNull()

Jest "toBeNull()" Mathcers check whether or not input of "expect" function is null:

```JavaScript
test("toBeNull Matcher", () => {
    const a = null;
    expect(a).toBeNull();
}); // pass
```

### toBeUndefined()

Jest "toBeUndefined()" Mathcers check whether or not input of "expect" function is undefined:

```JavaScript
test("toBeUndefined Matcher", () => {
    const a = undefined;
    expect(a).toBeUndefined();
}); // pass
```

### toBeDefined()

Jest "toBeDefined()" Mathcers check whether or not input of "expect" function is "defined":

```JavaScript
test("toBeDefined Matcher", () => {
    const a = 1; // any value that is not undefined
    expect(a).toBeDefined();
}); // pass
```

### toBeTruthy(), toBeFalsy()

Jest "toBeTruthy()", "toBeFalsy()" Mathcers check whether or not input of "expect" function is true or false respectively:

```JavaScript
test("toBeTruthy Matcher", () => {
    const a = 1;
    expect(a).toBeTruthy();
}); // pass

test("toBeFalsy Matcher", () => {
    const a = 0;
    expect(a).toBeFalsy();
}); // pass
```

### toBeGreaterThan(), toBeLessThan()

Jest "toBeGreaterThan()", "toBeLessThan()" Mathcers check whether or not input of "expect" function is greater than or less than the input of "toBeXXXThan()" respectively:

```JavaScript
test("toBeGreaterThan Matcher", () => {
    expect(10).toBeGreaterThan(9);
}); // pass

test("toBeLessThan Matcher", () => {
    expect(8).toBeLessThan(9);
}); // pass

// also
test("toBeGreaterThanOrEqual Matcher", () => {
    expect(10).toBeGreaterThanOrEqual(9);
});

test("toBeLessThanOrEqual Matcher", () => {
    expect(8).toBeLessThanOrEqual(9);
});

```

### toBeCloseTo()

Jest "toBeCloseTo()" Mathcers check whether or not input of "expect" function is "close to" to expected result:

This is usually used in float number operations, since JavaScript always suffers from the insufficient accuracy of float numbers.

```JavaScript
test("toBeEqual Matcher", () => {
    expect(0.1 + 0.2).toEqual(0.3);
}); // fail

test("toBeCloseTo Matcher", () => {
    expect(0.1 + 0.2).toBeCloseTo(0.3);
}); // pass
```

### toMatch()

Jest "toMatch()" Mathcers check whether or not input string of "expect" function contains the expected result:

```JavaScript
// for String
test("toMatch Matcher", () => {
    const str = "John, Mary, Peter";
    expect(str).toMatch("Peter");
});
```

### toContain()

Jest "toContain()" Mathcers check whether or not input array / set of "expect" function contains the expected result:

```JavaScript
// for Array
test("toContain Matcher", () => {
    const arr = ["John", "Mary", "Peter"];
    expect(arr).toContain("Peter");
});

// for Set
test("toContain Matcher", () => {
    const arr = ["John", "Mary", "Peter"];
    const data = new Set(arr);
    expect(data).toContain("Peter");
});
```
### toThrow()

Jest "toThrow()" Mathcers check whether or not input of "expect" function throws an error (with an expected error message):

```JavaScript
const throwNewErrorFunc = () => {
    throw new Error ('this is an Error')
}

// without expected error message
test("toThrow Matcher", () => {
    expect(throwNewErrorFunc).toThrow();
}); // pass

// with expected error message
test("toThrow Matcher", () => {
    expect(throwNewErrorFunc).toThrow('this is an Error');
}); // pass
```

### not

Jest "not" adds a not logic to the original matcher:

```JavaScript
const throwNewErrorFunc = () => {
    throw new Error("this is an Error");
};
test("toThrow Matcher", () => {
    expect(throwNewErrorFunc).not.toThrow("this is a Error");
}); // fail
```


# 4. Jest Automatic Testing

Go to package.json to modify the "scripts" property to be:

```json
{
  	...
  	"scripts": {
      "test": "jest --watchAll"
    },
  	...
}
```

Then, after we run:

```shell
yarn test
```

or: 

```shell
npm run test
```

The testing would be run automatically everytime we modify the script.

# 5. ES6 support setup

### Install and Configure Babel

```shell
yarn add @babel/core@7.4.5 @babel/preset-env@7.4.5 --dev
```

or: 

```shell
npm install @babel/core@7.4.5 @babel/preset-env@7.4.5 --dev
```

Create a file called ".babelrc" to add configuration for babel

```bash
// .babelrc
{
    "presets": [
        [
            "@babel/preset-env",
            {
                "targets": {
                    "node": "current"
                }
            }
        ]
    ]
}
```

Now we can use ES6 import syntax in the test scripts

```JavaScript
// helloworld.js
export function helloworld(input) {
  	return "helloworld" + String(input)
}

/* module.exports = {
  	helloworld
} */
```

```JavaScript
// helloworld.test.js
/* const helloworldCode = require("./helloworld.js")
 const {helloworld} = helloworldCode */
import {helloworld} from "./helloworld.js"

test("test for helloworld, input=300", () => {
  	expect(helloworld(300)).toBe("helloworld300");
});
```



# 6. Asynchronous Operation Test

Let's say we want to fetch some data with <strong>axios</strong>

First, we setup a simple server on localhost with python flask:

```Python
# server.py
import joblib 
import json
from flask import Flask, request, jsonify, make_response, Response
from flask_restful import Resource, Api
import traceback

app = Flask(__name__)
api = Api(app)

class Test(Resource):
  # manually bypass CORS restriction
	def get(self):
		resp = make_response(jsonify({'success': True}))
		resp.headers['Access-Control-Allow-Origin'] = 'http://localhost'
		resp.headers['Access-Control-Allow-Methods'] = 'GET'
		resp.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
		return resp

	def options(self):
		resp = Response("Test CORS")
		resp.headers['Access-Control-Allow-Origin'] = 'http://localhost'
		resp.headers['Access-Control-Allow-Methods'] = 'OPTIONS'
		resp.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
		return resp

@app.errorhandler(404)
def not_found(error):
	resp = make_response(jsonify({'error': 'Not found'}), 404)
	resp.headers['Access-Control-Allow-Origin'] = 'http://localhost'
	resp.headers['Access-Control-Allow-Methods'] = 'GET'
	resp.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
	return resp

api.add_resource(Test, '/test_api', endpoint="test_api")

if __name__ == '__main__':
	try:
		port = int(sys.argv[1]) # This is for a command-line argument
	except:
		port = 12347 # If you don't provide any port then the port will be set to 12347

	print ('Test Service Running...')

	app.run(port=port, debug=True)
```

Run the python script and it will initiate a server running at http://localhost:12347/test_api, it is an endpoint from which we can request data.

Now we can write a "fetchData.js" file which contains some asynchronous operations we would like to test.

```JavaScript
// fetchData.js
import axios from "axios";

export const fetchData = (handleResponse) => {
    axios.get("http://localhost:12347/test_api").then((response) => {
        handleResponse(response.data);
    });
};

export const fetchData2 = () => {
    return axios.get("http://localhost:12347/test_api");
};
```

```JavaScript
// fetchData.test.js
import { fetchData, fetchData2 } from "./fetchData.js";

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
```

### Test in scenarios where Promise throws error

```JavaScript
// fetchData.js
import axios from "axios";

export const fetchData3 = () => {
    return axios.get("http://localhost:12347/test_api_error");
};
```

```JavaScript
// fetchData.test.js
// test for Promise error (e.g.: 404)
test("fetchData3 Testing", () => {
   	// wrong method
    return fetchData3().catch((err) => {
        // console.log(err.toString());
        expect(err.toString().indexOf("404") > -1).toBe(true);
    });
});
```

Simply apply chain rule on Promise with .catch() is wrong, because if it doesn't throw an error, it won't execute the code. If the Promise becomes fulfilled, the test script will also pass.

The correct method is to use the <strong>assertions()</strong> API

```JavaScript
// test for Promise error (e.g.: 404)
test("fetchData3 Testing", () => {
    expect.assertions(1); // it asserts that the expect code should at least execute once, or it won't pass
    return fetchData3().catch((err) => {
        expect(err.toString().indexOf("404") > -1).toBe(true);
    });
});
```

### Test with <strong>async</strong>, <strong>await</strong> manner

```JavaScript
// fetchData.js
export const fetchData4 = () => {
    return axios.get("http://localhost:12347/test_api");
};
```

```JavaScript
// fetchData.test.js
test("fetchData4 Testing", async () => {
    await expect(fetchData4()).resolves.toMatchObject({
        data: {
            success: true,
        },
    });
});
```


or:
```JavaScript
// fetchData.test.js
test("fetchData4 Testing", async () => {
    const response = await fetchData4()
    expect(response.data).toEqual({
      	success: true,
    });
});
```

# 7. Jest Hooks - Lifecycle

There are 4 frequently used hook functions in Jest:

* beforeAll
* beforeEach
* afterAll
* afterEach

### Live example:

```JavaScript
// jesthooks.js
export default class Coursera {
    selectTeacher(number) {
        this.teacher = number === 1 ? "Andrew" : "Michael";
    }

    purchaseMachineLearning() {
        this.course = "I have purchased Machine Learning with: " + this.teacher;
    }

    purchaseNaturalLanguageProcessing() {
        this.course =
            "I have purchased Natural Language Processing with: " +
            this.teacher;
    }
}

```

```JavaScript
// jesthooks.test.js
import Coursera from "./jesthooks";
const myCourseraAccount = new Coursera();

beforeEach(() => {
    console.log("beforeEach: Review the course structure and comments");
});
beforeAll(() => {
    console.log("beforeAll: I have enough balance in my account");
});
afterEach(() => {
    console.log("afterEach: Balance reduced because of purchasing");
});
afterAll(() => {
    console.log("afterAll: start to plan curriculum");
});

test("Test Machine Learning .w/ Andrew on Coursera", () => {
    myCourseraAccount.selectTeacher(1);
    myCourseraAccount.purchaseMachineLearning();
    console.log(myCourseraAccount.course);
    expect(myCourseraAccount.course).toEqual(
        "I have purchased Machine Learning with: Andrew"
    );
});

test("Test Natural Language Processing .w/ Michael on Coursera", () => {
    myCourseraAccount.selectTeacher(2);
    myCourseraAccount.purchaseNaturalLanguageProcessing();
    console.log(myCourseraAccount.course);
    expect(myCourseraAccount.course).toEqual(
        "I have purchased Natural Language Processing with: Michael"
    );
});
```

```shell
./jesthooks.test.js
  ✓ Testing Machine Learning on Coursera (2ms)
  ✓ Testing Natural Language Processing on Coursera (1ms)

  console.log jesthooks.test.js:8
    beforeAll: I have enough balance in my account

  console.log jesthooks.test.js:5
    beforeEach: Review the course structure and comments

  console.log jesthooks.test.js:20
    I have purchased Machine Learning with: Andrew

  console.log jesthooks.test.js:11
    afterEach: Balance reduced because of purchasing

  console.log jesthooks.test.js:5
    beforeEach: Review the course structure and comments

  console.log jesthooks.test.js:29
    I have purchased Natural Language Processing with: Michael

  console.log jesthooks.test.js:11
    afterEach: Balance reduced because of purchasing

  console.log jesthooks.test.js:14
    afterAll: start to plan curriculum

Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        0.301s, estimated 1s
Ran all test suites.
```



# 8. Test Groups

In Jest, we use "describe()" API to manage all tests in groups:

```JavaScript
// jesthooks.js
export default class Coursera {
    selectTeacher(number) {
        this.teacher = number === 1 ? "Andrew" : "Michael";
    }

    purchaseMachineLearning() {
        this.course = "I have purchased Machine Learning with: " + this.teacher;
    }

    purchaseDeepLearning() {
        this.course = "I have purchased Deep Learning with: " + this.teacher;
    }
  
  	purchaseNaturalLanguageProcessing() {
        this.course =
            "I have purchased Natural Language Processing with: " +
            this.teacher;
    }

    purchaseKnowledgeGraph() {
        this.course = "I have purchased Knowledge Graph with: " + this.teacher;
    }
}
```

```JavaScript
// jesthooks.test.js
import Coursera from "./jesthooks";
const myCourseraAccount = new Coursera();

...

describe("Test course w./ Andrew", () => {
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
```

```shell
./jesthooks.test.js
  Test course w./ Andrew
    ✓ Test Machine Learning w./ Andrew on Coursera (4ms)
    ✓ Test Deep Learning w./ Andrew on Coursera (4ms)
  Test course w./ Michael
    ✓ Test Natural Language Processing w./ Michael on Coursera (3ms)
    ✓ Test Knowledge Graph w./ Michael on Coursera (2ms)

  ...
  
Test Suites: 1 passed, 1 total
Tests:       4 passed, 4 total
Snapshots:   0 total
Time:        0.422s, estimated 1s
Ran all test suites.
```



# 9. Scope of Jest Hooks

There are 3 characteristics in the scope of Jest hooks:

* Hooks defined in parent group can apply on child groups
* Hooks defined in the same level don't affect each other
* Outer hooks run first

Note: Jest script implicitly contains a test group, it's just not showing the description.

```JavaScript
describe("Test course w./ Andrew", () => {
    test("Test Machine Learning w./ Andrew on Coursera", () => {
        myCourseraAccount.selectTeacher(1);
        myCourseraAccount.purchaseMachineLearning();
        console.log(myCourseraAccount.course);
        expect(myCourseraAccount.course).toEqual(
            "I have purchased Machine Learning with: Andrew"
        );
    });
});

// is the same as:

describe("Implicit Parent Group", () => {
    describe("Test course w./ Andrew", () => {
        test("Test Machine Learning w./ Andrew on Coursera", () => {
            myCourseraAccount.selectTeacher(1);
            myCourseraAccount.purchaseMachineLearning();
            console.log(myCourseraAccount.course);
            expect(myCourseraAccount.course).toEqual(
                "I have purchased Machine Learning with: Andrew"
            );
        });
  	});
});
```

### Hooks defined in parent group can apply on child groups

In the example we used in Test Groups, hooks defined in the implicit parent group still apply on each child group test case:

```shell
console.log jesthooks.test.js:8
    beforeAll: I have enough balance in my account

console.log jesthooks.test.js:5
    beforeEach: Review the course structure and comments

console.log jesthooks.test.js:21
    I have purchased Machine Learning with: Andrew

console.log jesthooks.test.js:11
    afterEach: Balance reduced because of purchasing

console.log jesthooks.test.js:5
    beforeEach: Review the course structure and comments

console.log jesthooks.test.js:30
    I have purchased Deep Learning with: Andrew

console.log jesthooks.test.js:11
    afterEach: Balance reduced because of purchasing

console.log jesthooks.test.js:5
    beforeEach: Review the course structure and comments

console.log jesthooks.test.js:41
    I have purchased Natural Language Processing with: Michael

console.log jesthooks.test.js:11
    afterEach: Balance reduced because of purchasing

console.log jesthooks.test.js:5
    beforeEach: Review the course structure and comments

console.log jesthooks.test.js:50
    I have purchased Knowledge Graph with: Michael

console.log jesthooks.test.js:11
    afterEach: Balance reduced because of purchasing

console.log jesthooks.test.js:14
    afterAll: start to plan curriculum
```

###Hooks defined in the same level don't affect each other

```JavaScript
describe("Test course w./ Andrew", () => {
    afterEach(() => {
        console.log("afterEach: Andrew's course is free");
    });

    ...
});

describe("Test course w./ Michael", () => {
    afterEach(() => {
        console.log("afterEach: Michael's course costs $50");
    });

    ...
});
```

```shell
console.log jesthooks.test.js:25
    I have purchased Machine Learning with: Andrew

console.log jesthooks.test.js:19
    afterEach: Andrew's course is free

console.log jesthooks.test.js:34
    I have purchased Deep Learning with: Andrew

console.log jesthooks.test.js:19
    afterEach: Andrew's course is free

console.log jesthooks.test.js:49
    I have purchased Natural Language Processing with: Michael

console.log jesthooks.test.js:43
    afterEach: Michael's course costs $50

console.log jesthooks.test.js:58
    I have purchased Knowledge Graph with: Michael

console.log jesthooks.test.js:43
    afterEach: Michael's course costs $50
```

### Outer hooks run first

```JavaScript
beforeAll(() => {
    console.log(
        "beforeAll (Parent Group): I have enough balance in my account"
    );
});

describe("Test course w./ Andrew", () => {
    beforeAll(() => {
        console.log(
            "beforeAll (Child Group): Do research on Andrew's teaching skills and course work load"
        );
    });
  
  	...
});
  
describe("Test course w./ Michael", () => {
    beforeAll(() => {
        console.log(
            "beforeAll (Child Group): Do research on Michael's teaching skills and course work load"
        );
    });
    
  	...
});
```

```shell
console.log jesthooks.test.js:8
    beforeAll (Parent Group): I have enough balance in my account

console.log jesthooks.test.js:21
    beforeAll (Child Group): Do research on Andrew's teaching skills and course work load

...

console.log jesthooks.test.js:50
    beforeAll (Child Group): Do research on Michael's teaching skills and course work load

...
```

