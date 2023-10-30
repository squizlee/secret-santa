import { handler } from "./secret-santa-lambda";

describe("secret santa handler", () => {
  it("parses payload", async () => {
    const event: any = {
      body: JSON.stringify({
        names: [
          {
            name: "Michael Jerry",
            email: "michael.jerry@example.com",
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
