import "dotenv/config";
import { Duration, Stack, StackProps } from "aws-cdk-lib";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as iam from "aws-cdk-lib/aws-iam";
import * as ses from "aws-cdk-lib/aws-ses";
import { Construct } from "constructs";
import path from "node:path";
import { Environment } from "./types";

export class SecretSantaStack extends Stack {
  constructor(
    scope: Construct,
    id: string,
    StackEnv: Environment,
    props?: StackProps,
  ) {
    super(scope, id, props);

    const secret_santa_execution_role = new iam.Role(
      this,
      "secret-santa-execution-role",
      {
        assumedBy: new iam.ServicePrincipal("lambda.amazonaws.com"),
        description: "execution role for secret santa lambda function",
      },
    );
    secret_santa_execution_role.addToPolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: ["ses:SendEmail"],
        resources: ["*"],
      }),
    );

    secret_santa_execution_role.addManagedPolicy(
      iam.ManagedPolicy.fromAwsManagedPolicyName(
        "service-role/AWSLambdaBasicExecutionRole",
      ),
    );

    const secret_santa_function = new lambda.Function(
      this,
      "secret-santa-lambda-function",
      {
        runtime: lambda.Runtime.NODEJS_18_X,
        handler: "secret-santa-lambda.handler",
        code: lambda.Code.fromAsset(
          path.join(__dirname, "..", "server/"),
        ),
        timeout: Duration.minutes(2),
        architecture: lambda.Architecture.ARM_64, // cheaper than x86
      },
    );

    secret_santa_function.addFunctionUrl({
      cors: {
        allowedOrigins: StackEnv === "dev"
          ? ["http://localhost:5173", "https://dev.ezsecretsanta.day"]
          : ["https://ezsecretsanta.day"],
        allowedHeaders: ["Content-Type"],
      },
      authType: lambda.FunctionUrlAuthType.NONE,
    });
  }
}
