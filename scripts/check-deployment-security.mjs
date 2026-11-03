import assert from "node:assert/strict";
import { pathToFileURL } from "node:url";

const minimumHstsMaxAge = 15_552_000;

export const deploymentSecurityChecks = [
  {
    name: "HTTP redirects permanently to HTTPS",
    run: async ({ fetchResponse, target }) => {
      const httpTarget = new URL(target);
      httpTarget.protocol = "http:";
      const response = await fetchResponse(httpTarget, { redirect: "manual" });
      assert.ok(
        response.status === 301 || response.status === 308,
        `expected 301 or 308, received ${response.status}`,
      );
      const location = response.headers.get("location");
      assert.ok(location, "redirect has no Location header");
      assert.equal(new URL(location, httpTarget).protocol, "https:");
    },
  },
  {
    name: "Production security headers are present",
    run: async ({ fetchResponse, target }) => {
      const response = await fetchResponse(target);
      assert.ok(response.ok, `homepage returned ${response.status}`);

      const csp = response.headers.get("content-security-policy") || "";
      assert.match(csp, /default-src\s+'self'/);
      assert.match(csp, /object-src\s+'none'/);
      assert.match(csp, /frame-ancestors\s+'none'/);

      const hsts = response.headers.get("strict-transport-security") || "";
      const maxAge = Number(hsts.match(/max-age=(\d+)/i)?.[1] || 0);
      assert.ok(
        maxAge >= minimumHstsMaxAge,
        "HSTS max-age is shorter than 180 days",
      );

      assert.equal(response.headers.get("x-content-type-options"), "nosniff");
      assert.ok(
        response.headers.get("referrer-policy"),
        "missing Referrer-Policy",
      );
      assert.ok(
        response.headers.get("permissions-policy"),
        "missing Permissions-Policy",
      );
      assert.equal(
        response.headers.get("x-powered-by"),
        null,
        "X-Powered-By exposes the framework",
      );
    },
  },
  {
    name: "Common secret files are not exposed",
    run: async ({ fetchResponse, target }) => {
      for (const path of ["/.env", "/.git/config"]) {
        const response = await fetchResponse(new URL(path, target), {
          redirect: "manual",
        });
        assert.notEqual(response.status, 200, `${path} is publicly accessible`);
      }
    },
  },
  {
    name: "Public write APIs reject an untrusted origin",
    run: async ({ fetchResponse, target }) => {
      for (const path of [
        "/api/contact",
        "/api/career-agent",
        "/api/vacancy-match",
      ]) {
        const response = await fetchResponse(new URL(path, target), {
          method: "POST",
          headers: {
            "content-type": "application/json",
            origin: "https://security-check.invalid",
          },
          body: "{}",
        });
        assert.equal(
          response.status,
          403,
          `${path} returned ${response.status}`,
        );
        assert.notEqual(
          response.headers.get("access-control-allow-origin"),
          "*",
          `${path} allows every origin`,
        );
      }
    },
  },
];

export const parseDeploymentTarget = (rawTarget) => {
  if (!rawTarget) {
    throw new Error(
      "Pass the deployment URL as an argument or set DEPLOYMENT_URL.",
    );
  }

  const target = new URL(rawTarget);
  if (target.protocol !== "https:") {
    throw new Error("The deployment URL must use HTTPS.");
  }
  return target;
};

export const runDeploymentSecurityChecks = async ({
  rawTarget,
  fetchImplementation = fetch,
  logger = console,
}) => {
  const target = parseDeploymentTarget(rawTarget);
  const results = [];
  const fetchResponse = (url, options = {}) =>
    fetchImplementation(url, {
      ...options,
      signal: AbortSignal.timeout(15_000),
    });

  for (const check of deploymentSecurityChecks) {
    try {
      await check.run({ fetchResponse, target });
      results.push({ name: check.name, status: "pass" });
      logger.log(`PASS ${check.name}`);
    } catch (error) {
      results.push({ name: check.name, status: "fail", error });
      logger.error(`FAIL ${check.name}: ${error.message}`);
    }
  }

  return {
    results,
    failures: results.filter(({ status }) => status === "fail"),
  };
};

const isDirectExecution =
  process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;

if (isDirectExecution) {
  const rawTarget = process.argv[2] || process.env.DEPLOYMENT_URL;
  const { failures, results } = await runDeploymentSecurityChecks({
    rawTarget,
  });

  if (failures.length > 0) {
    process.exitCode = 1;
  } else {
    console.log(`All ${results.length} deployment security checks passed.`);
  }
}
