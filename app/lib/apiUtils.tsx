export async function fetchWithRetry(
  url: string,
  options: RequestInit = {},
  retries = 1
): Promise<Response> {
  let lastError: unknown;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url, options);
      if (
        response.status === 429 ||
        response.status >= 500
      ) {
        if (attempt < retries) {
          await sleep(getDelay(attempt));
          continue;
        }
      }

      return response;
    } catch (error: any) {
      lastError = error;
      console.log(error)
      const code = error?.code;
      const causeCode = error?.cause?.code;

      const retryable =
        code === "ECONNRESET" ||
        causeCode === "ECONNRESET" ||
        code === "ETIMEDOUT" ||
        causeCode === "ETIMEDOUT" ||
        code === "ECONNREFUSED" ||
        causeCode === "ECONNREFUSED";

      if (!retryable || attempt >= retries) {
        throw error;
      }

      console.warn(
        `Request failed (${code ?? causeCode}), retrying... ` +
        `attempt ${attempt + 1}/${retries}`
      );

      await sleep(getDelay(attempt));
    }
  }

  throw lastError;
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getDelay(attempt: number) {
  return 500 * Math.pow(2, attempt);
}