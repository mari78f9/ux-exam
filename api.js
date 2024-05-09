// https://arturomora.com/fsa/products




























// // Asynchronous functions enable the use of the await keyword inside them to pause execution,
// // until a promise is settled (fulfilled or rejected).
// async function api() {

//     // Variable that assigns the URL of the API endpoint
//     const url = "https://arturomora.com/fsa/products";

//     // HTTP request to the specified URL. 
//     // The await keyword pauses the execution of the function until
//     // the fetch operation is complete and a response is received.
//     await fetch(url)

//     // method parses the response body as JSON
//     .then((response) => response.json())

//     // receives the parsed JSON data as an argument and logs it to the console.
//     .then((data) => {
//         console.log(data);
//     })

//     // handles any errors that occur during the fetch operation or JSON parsing. 
//     // If an error occurs, it logs the error message to the console.
//     .catch((error) => {
//         console.log(error);
//     })
// }