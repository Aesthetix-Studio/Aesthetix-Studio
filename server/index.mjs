import Fastify from "fastify";
import cors from "@fastify/cors";

const app = Fastify({
  logger: true,
});

await app.register(cors, {
  origin: true,
  methods: ["GET", "POST", "OPTIONS"],
});

const submissions = {
  contact: [],
  discovery: [],
  inquiry: [],
};

app.get("/health", async () => ({
  ok: true,
  service: "aesthetix-backend",
  timestamp: new Date().toISOString(),
}));

app.post("/api/contact", async (request, reply) => {
  const body = request.body ?? {};
  const required = ["firstName", "lastName", "email", "message"];
  const missing = required.filter((key) => !String(body[key] ?? "").trim());

  if (missing.length > 0) {
    return reply.code(400).send({
      ok: false,
      error: "Missing required fields",
      missing,
    });
  }

  const record = {
    id: `c_${Date.now()}`,
    createdAt: new Date().toISOString(),
    ...body,
  };

  submissions.contact.push(record);

  request.log.info({ id: record.id }, "contact submission received");

  return {
    ok: true,
    id: record.id,
  };
});

app.post("/api/discovery-calls", async (request, reply) => {
  const body = request.body ?? {};
  const required = ["day", "time", "name", "email"];
  const missing = required.filter((key) => !String(body[key] ?? "").trim());

  if (missing.length > 0) {
    return reply.code(400).send({
      ok: false,
      error: "Missing required fields",
      missing,
    });
  }

  const record = {
    id: `d_${Date.now()}`,
    createdAt: new Date().toISOString(),
    ...body,
  };

  submissions.discovery.push(record);

  request.log.info({ id: record.id }, "discovery call request received");

  return {
    ok: true,
    id: record.id,
  };
});

app.post("/api/inquiries", async (request, reply) => {
  const body = request.body ?? {};
  const required = ["firstName", "lastName", "email", "projectSummary"];
  const missing = required.filter((key) => !String(body[key] ?? "").trim());

  if (missing.length > 0) {
    return reply.code(400).send({
      ok: false,
      error: "Missing required fields",
      missing,
    });
  }

  const record = {
    id: `i_${Date.now()}`,
    createdAt: new Date().toISOString(),
    ...body,
  };

  submissions.inquiry.push(record);

  request.log.info({ id: record.id }, "project inquiry received");

  return {
    ok: true,
    id: record.id,
  };
});

const port = Number(process.env.PORT ?? 8787);
const host = process.env.HOST ?? "0.0.0.0";

try {
  await app.listen({ port, host });
} catch (error) {
  app.log.error(error);
  process.exit(1);
}
