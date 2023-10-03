import * as cdk from "aws-cdk-lib";
import { Match, Template } from "aws-cdk-lib/assertions";
import * as SecretSanta from "../lib/secret-santa-stack";

test("", () => {
  const app = new cdk.App();
  // WHEN
  const stack = new SecretSanta.SecretSantaStack(app, "MyTestStack", "dev");
  // THEN

  const template = Template.fromStack(stack);

  template.hasResourceProperties("AWS::SQS::Queue", {
    VisibilityTimeout: 300,
  });
  template.resourceCountIs("AWS::SNS::Topic", 1);
});
