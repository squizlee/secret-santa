#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { Tags } from "aws-cdk-lib";
import { SecretSantaStack } from "../lib/secret-santa-stack";
import { Environment } from "../lib/types";

const ENV: Environment = (process.env.ENV as Environment) || "dev";

const app = new cdk.App();
const stack = new SecretSantaStack(app, `Secret-Santa-Stack-${ENV}`, ENV);
Tags.of(stack).add("Environment", ENV);
