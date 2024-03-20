// Temporal Client
import { Client, Connection } from '@temporalio/client';

/***
 * Temporal can take a beat to boot up, so we'll retry the connection with exponential backoff.
 */
async function retryingConnectWithBackoff(attempts?: number): Promise<Connection> {
  const temporalAddress = process.env.TEMPORAL_ADDRESS || 'localhost:7233';
  console.log(`Connecting to Temporal at ${temporalAddress}`);

  try {
    const temporalConnection = await Connection.connect({ address: temporalAddress });
    console.log('Temporal connection successful √');
    return temporalConnection;
  } catch (e) {
    // If the connection failed, retry with backoff. Max 10 attempts.
    const nextAttempt = (attempts || 0) + 1;
    const backoffSeconds = Math.min(Math.pow(2, nextAttempt), 10);

    if (nextAttempt < 10) {
      console.log(`Connection failed: ${(e as Error).message}. Retrying in ${backoffSeconds} seconds...`);
      await new Promise((resolve) => setTimeout(resolve, backoffSeconds * 1000));
      return retryingConnectWithBackoff(nextAttempt);
    }

    throw new Error('Max connection attempts reached. Unable to connect to Temporal at ' + temporalAddress);
  }
}

let client: Client | null = null;

async function getTemporalClient() {
  if (client) {
    return client;
  }

  const connection = await retryingConnectWithBackoff();

  // Create client.
  const temporalClient = new Client({
    connection,
    namespace: 'default',
  });

  client = temporalClient;

  return client;
}

getTemporalClient().catch((e) => {
  console.error('Error connecting to Temporal:', e);
});

export { getTemporalClient };
