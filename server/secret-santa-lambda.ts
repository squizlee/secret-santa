import { APIGatewayEvent, Context, Handler } from "aws-lambda";
import { SendEmailCommand, SESClient } from "@aws-sdk/client-ses";

const region = process.env.REGION || "ap-southeast-2";

const ses_client = new SESClient({ region });

export const handler = async (
  event: APIGatewayEvent,
  context: Context,
) => {
  console.log("START request");
  console.log(event);
  console.log(context);
  if (!event.body) {
    console.error("unable to parse body, exiting out...");
    return JSON.stringify({ statusCode: 400, body: "Bad Request" });
  }
  const body = JSON.parse(event.body);

  for (const name of body.names) {
  }

  console.log("body", body);

  console.log("END Request");
  return JSON.stringify({ statusCode: 200, body: "" });
};
