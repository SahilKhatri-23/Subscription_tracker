import arcjet, { shield, detectBot, tokenBucket } from "@arcjet/node";
import { ARCJET_KEY } from "./env.js";

const isDryRun = process.env.ARCJET_MODE === "DRY_RUN";
const mode = isDryRun ? "DRY_RUN" : "LIVE";

const aj = ARCJET_KEY
  ? arcjet({
      // Get your site key from https://app.arcjet.com and set it as an environment
      // variable rather than hard coding.
      key: ARCJET_KEY,
      characteristics: ["ip.src"],
      rules: [
        // Shield protects your app from common attacks e.g. SQL injection
        shield({ mode }),
        // Create a bot detection rule
        detectBot({
          mode,
          // Block all bots except the following
          allow: [
            "CATEGORY:SEARCH_ENGINE", // Google, Bing, etc
            // Uncomment to allow these other common bot categories
            // See the full list at https://arcjet.com/bot-list
            //"CATEGORY:MONITOR", // Uptime monitoring services
            //"CATEGORY:PREVIEW", // Link previews e.g. Slack, Discord
          ],
        }),
        // Create a token bucket rate limit. Other algorithms are supported.
        tokenBucket({
          mode,
          refillRate: 5, // Refill 5 tokens per interval
          interval: 10, // Refill every 10 seconds
          capacity: 10, // Bucket capacity of 10 tokens
        }),
      ],
    })
  : null;

export default aj;
