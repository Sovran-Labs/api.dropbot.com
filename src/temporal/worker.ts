require('module-alias/register');

import 'dotenv/config';
import '../server/clients/mongo';
import './utils/polyfills/BigIntPolyfill';

import { NativeConnection, Worker } from '@temporalio/worker';
// import * as activities from './action_activities';
import * as activities from './activities';

async function makeConnection(attempt = 0): Promise<NativeConnection> {
  // we can get into a race condition when bringing up the server and the worker at the same time
  // this gives the server a chance to start up first
  try {
    const temporalAddress = process.env.TEMPORAL_ADDRESS || 'localhost:7233';
    // const temporalAddress = 'localhost:7233';
    console.log(`Connecting to Temporal at ${temporalAddress}`);
    const connection = await NativeConnection.connect({
      address: temporalAddress,
      // TLS and gRPC metadata configuration goes here.
    });
    console.log('Connected to Temporal');
    return connection;
  } catch (e) {
    if (attempt > 5) {
      throw e;
    }
    console.log('error connecting to temporal. Retrying...', e);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return await makeConnection(attempt + 1);
  }
}

async function run() {
  // Step 1: Establish a connection with Temporal server.
  // Worker code uses `@temporalio/worker.NativeConnection`.
  // (But in your application code it's `@temporalio/client.Connection`.)

  const connection = await makeConnection();

  // Step 2: Register Workflows and Activities with the Worker.
  const worker = await Worker.create({
    connection,
    taskQueue: 'default',
    // Workflows are registered using a path as they run in a separate JS context.
    workflowsPath: require.resolve('./workflows'),
    activities,
    // dataConverter: {
    //   payloadConverterPath: require.resolve('./payloadConverter/payload-converter'),
    // },
  });
  // Step 3: Start accepting tasks on the `hello-world` queue
  // The worker runs until it encounters an unexepected error or the process receives a shutdown signal registered on the SDK Runtime object.
  // By default, worker logs are written via the Runtime logger to STDERR at INFO level.
  // See https://typescript.temporal.io/api/classes/worker.Runtime#install to customize these defaults.
  await worker.run();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
