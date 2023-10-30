import { APIGatewayEvent, Context, Handler } from "aws-lambda";
import { SendEmailCommand, SESClient } from "@aws-sdk/client-ses";

const region = process.env.REGION || "ap-southeast-2";

const ses_client = new SESClient({ region });

interface Names {
  name: string;
  email: string;
  gifting?: string;
}

function shuffle_array_order(array: []) {
  for (let i = array.length - 1; i > -1; --i) {
    let random_index = Math.floor(Math.random() * array.length);

    if (random_index == i) {
      random_index = (i + 1) % array.length;
    }

    [array[i], array[random_index]] = [array[random_index], array[i]];
  }
}

function create_secret_santa_chain(names: Names[]) {
  shuffle_array_order(names as []);

  for (let i = 0; i < names.length - 1; ++i) {
    names[i].gifting = names[i + 1].name;
  }

  names[names.length - 1].gifting = names[0].name;
}

export const handler = async (
  event: APIGatewayEvent,
  context: Context,
) => {
  console.log("START request");
  console.log(event);
  console.log(context);

  if (!event.body) {
    console.error("unable to parse body, exiting out...");
    return JSON.stringify({
      statusCode: 400,
      body: "Bad Request: body not parsable",
    });
  }

  const body = JSON.parse(event.body);
  const names = body.names;
  const when = body.when;
  const where = body.where;

  if (!names) {
    console.error("unable to retrieve names from body, exiting out...");
    return JSON.stringify({
      statusCode: 400,
      body: "Bad Request: names not found",
    });
  }

  if (names.length < 3) {
    return JSON.stringify({
      statusCode: 400,
      body: "Bad Request: not enough participants",
    });
  }

  // Generate gifters
  create_secret_santa_chain(names);

  // TODO: Send out emails
  return JSON.stringify({ statusCode: 200, body: "Success!" });
};
