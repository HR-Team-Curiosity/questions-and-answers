import http from "k6/http";
import { check } from "k6";

function getRandomArbitrary(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

var questionObj = {
  body: "This is a test question, right?",
  name: "K6 testing",
  email: "mike@test.com",
};

var answerObj = {
  body: "This is a test answer",
  name: "K6 testing",
  email: "mike@test.com",
  photos: ["asdfasdf", "asdfasdf"],
};

////GET QUESTIONS
export default function () {
  const productId = getRandomArbitrary(900000, 1000011);
  const response = http.get(`http://localhost:3000/qa/${productId}`);
  check(response, {
    "is status 200": (r) => r.status === 200,
    "is id the same we asked": (r) => {
      const id = Number(r.json("product_id"));
      return id === productId;
    },
  });
}

//// GET ANSWERS
// export default function () {
//   const questionId = getRandomArbitrary(3000000, 3521637);
//   const response = http.get(`http://localhost:3000/qa/${questionId}/answers`);
//   check(response, {
//     "is status 200": (r) => r.status === 200,
//     "is id the same we asked": (r) => {
//       const id = Number(r.json("question"));
//       return id === questionId;
//     },
//   });
// }

////REPORT QUESTION
// export default function () {
//   const questionId = getRandomArbitrary(3000000, 3521637);
//   const response = http.put(
//     `http://localhost:3000/qa/question/${questionId}/report`
//   );
//   check(response, {
//     "is status 200": (r) => r.status === 200,
//   });
// }

////HELPFUL QUESTION
// export default function () {
//   const questionId = getRandomArbitrary(3000000, 3521637);
//   const response = http.put(
//     `http://localhost:3000/qa/question/${questionId}/helpful`
//   );
//   check(response, {
//     "is status 200": (r) => r.status === 200,
//   });
// }

//REPORT ANSWER
// export default function () {
//   const answerId = getRandomArbitrary(11000000, 12392953);
//   const response = http.put(
//     `http://localhost:3000/qa/answer/${answerId}/report`
//   );
//   check(response, {
//     "is status 200": (r) => r.status === 200,
//   });
// }

//HELPFUL ANSWER
// export default function () {
//   const answerId = getRandomArbitrary(11000000, 12392953);
//   const response = http.put(
//     `http://localhost:3000/qa/answer/${answerId}/helpful`
//   );
//   check(response, {
//     "is status 200": (r) => r.status === 200,
//   });
// }

// //// POST ANSWER
// export default function () {
//   const questionId = getRandomArbitrary(3000000, 3521637);
//   const response = http.post(
//     `http://localhost:3000/qa/${questionId}/answers`,
//     JSON.stringify(answerObj),
//     { headers: { "Content-Type": "application/json" } }
//   );
//   check(response, {
//     "is status 200": (r) => r.status === 200,
//   });
// }

//// POST QUESTION
// export default function () {
//   const productId = getRandomArbitrary(900000, 1000011);
//   const response = http.post(
//     `http://localhost:3000/qa/${productId}`,
//     questionObj
//   );
//   check(response, {
//     "is status 200": (r) => r.status === 200,
//   });
// }

export let options = {
  vus: 1,
  duration: "5s",
  // thresholds: {
  //   "failed requests": ["rate<0.02"],
  //   http_req_duration: ["p(95)<500"],
  //   http_reqs: ["count>6000"],
  // },
};
