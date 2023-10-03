import { handler } from "./secret-santa-lambda";
import { APIGatewayEvent } from "aws-lambda";

describe("secret santa handler", () => {
  it("parses payload", async () => {
    const event: any = {
      body: JSON.stringify({
        names: [
          {
            name: "Michael Wilson",
            email: "michael.wilson@example.com",
          },
          {
            name: "Porky Pig",
            email: "porky_pig@looney.tunes.com",
          },
          {
            name: "George Costanza",
            email: "george.costanza@yankees.com",
          },
        ],
      }),
    };

    await handler(event, {} as any);
  });
});
