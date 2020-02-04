/* eslint require-atomic-updates: off */

const AggregateError = require("aggregate-error");
const verifyApm = require("./lib/verify");
const prepareApm = require("./lib/prepare");
const publishApm = require("./lib/publish");

let verified;
let prepared;

async function verifyConditions(pluginConfig, context) {
  const errors = await verifyApm(pluginConfig, context);

  if (errors.length > 0) {
    throw new AggregateError(errors);
  }

  verified = true;
}

async function prepare(pluginConfig, context) {
  const errors = verified ? [] : await verifyApm(pluginConfig, context);

  if (errors.length > 0) {
    throw new AggregateError(errors);
  }

  await prepareApm(pluginConfig, context);

  prepared = true;
}

async function publish(pluginConfig, context) {
  const errors = verified ? [] : await verifyApm(pluginConfig, context);

  if (errors.length > 0) {
    throw new AggregateError(errors);
  }

  if (!prepared) {
    await prepareApm(pluginConfig, context);
    prepared = true;
  }

  return publishApm(pluginConfig, context);
}

module.exports = { verifyConditions, prepare, publish };
