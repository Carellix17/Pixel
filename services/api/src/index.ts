import { createServer, type IncomingMessage, type ServerResponse } from "node:http";

const DEFAULT_PORT = 8787;

function parsePort(raw: string | undefined): number {
  if (raw === undefined || raw === "") {
    return DEFAULT_PORT;
  }
  const parsed = Number.parseInt(raw, 10);
  if (!Number.isInteger(parsed) || parsed < 1 || parsed > 65535) {
    throw new Error(`Invalid PIXEL_API_PORT: ${raw}`);
  }
  return parsed;
}

function sendJson(res: ServerResponse, status: number, body: unknown): void {
  const payload = JSON.stringify(body);
  res.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "content-length": Buffer.byteLength(payload),
  });
  res.end(payload);
}

function handleRequest(req: IncomingMessage, res: ServerResponse): void {
  const url = req.url ?? "/";
  const path = url.split("?")[0] ?? "/";

  if (req.method === "GET" && (path === "/health" || path === "/")) {
    sendJson(res, 200, {
      ok: true,
      service: "pixel-api",
      version: "0.1.0",
    });
    return;
  }

  sendJson(res, 404, { ok: false, error: "not_found" });
}

const port = parsePort(process.env["PIXEL_API_PORT"]);

const server = createServer(handleRequest);

server.listen(port, "0.0.0.0", () => {
  process.stdout.write(`Pixel API listening on http://127.0.0.1:${port}\n`);
});
