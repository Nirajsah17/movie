export async function fetchWithRetry(
  url: string,
  options: RequestInit = {},
  retries = 3
): Promise<Response> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(`Fetching ${url} - attempt ${attempt}/${retries}`);

      const response = await fetch(url, options);

      if (response.status === 429 || response.status >= 500) {
        if (attempt < retries) {
          console.warn(
            `Request returned ${response.status}, ` +
            `retrying... attempt ${attempt + 1}/${retries}`
          );

          await sleep(getDelay(attempt));
          continue;
        }
      }

      return response;
    } catch (error: any) {
      lastError = error;

      const code = error?.code;
      const causeCode = error?.cause?.code;

      const retryable =
        code === "ECONNRESET" ||
        causeCode === "ECONNRESET" ||
        code === "ETIMEDOUT" ||
        causeCode === "ETIMEDOUT" ||
        code === "ECONNREFUSED" ||
        causeCode === "ECONNREFUSED";

      console.error(
        `Request failed: ${code ?? causeCode ?? "unknown"}`
      );

      if (!retryable || attempt >= retries) {
        throw error;
      }

      console.warn(
        `Retrying... attempt ${attempt + 1}/${retries}`
      );

      await sleep(getDelay(attempt));
    }
  }

  throw lastError ?? new Error("Request failed");
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getDelay(attempt: number) {
  return 1000 * Math.pow(2, attempt - 1);
}
