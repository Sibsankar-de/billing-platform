import amqp, { Channel, Connection } from "amqplib";
import { env } from "../configs/env";
import { createModuleLogger } from "../utils/logger";

const log = createModuleLogger(import.meta.url);

let connection: any;
let channel: Channel;

export async function getChannel(): Promise<Channel> {
  if (channel) return channel;

  connection = await amqp.connect(env.RABBITMQ_CONNECTION_URI);

  connection.on("error", (err: Error) => {
    log.error("RabbitMQ error: " + err);
  });

  connection.on("close", () => {
    log.warn("RabbitMQ connection closed");
    channel = undefined as any;
  });

  channel = await connection.createChannel();

  await channel.assertQueue(env.RABBITMQ_EMAIL_QUEUE, {
    durable: true,
  });

  return channel;
}
