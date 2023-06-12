export default function handler(request, response) {
  // Get data submitted in request's body.
  const body = request.body;

  // Optional logging to see the responses
  // in the command line where next.js app is running.
  console.log("body: ", body);

  // Guard clause checks for first and last name,
  // and returns early if they are not found
  if (!body.firstName || !body.lastName) {
    // Sends a HTTP bad request error code
    return response.status(400).json({ data: "First or last name not found" });
  }

  // Found the name.
  // Sends a HTTP success code
  response.status(200).json({ data: `${body.first} ${body.last}` });
}
