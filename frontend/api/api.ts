export async function assess(user_input: string): Promise<Response> {
  // console.log("In assess():" + JSON.stringify(user_input));

  const response = await fetch("/assess", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({user_input: user_input})
  });

  // console.log("In assess(), response:" + response);

  return response;
}
