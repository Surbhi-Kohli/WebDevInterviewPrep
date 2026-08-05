The factory pattern is a creational design pattern where you call a function or object to create an instance, instead of constructing the object directly everywhere.

Instead of this:

```js
const paymentProvider = new StripeProvider(apiKey);
```

call:

```js
const paymentProvider = createPaymentProvider(config);
```

The factory decides what to create:

```js
function createPaymentProvider(config) {
  if (config.provider === "stripe") {
    return new StripeProvider(config.apiKey);
  }

  if (config.provider === "paypal") {
    return new PayPalProvider(config.clientId);
  }

  throw new Error("Unsupported payment provider");
}
```

The caller only depends on a common interface:

```js
paymentProvider.charge(payment);
```

It does not need to know whether the implementation is Stripe, PayPal, a mock, or another provider.

Benefits:

- Hides complex setup details.
- Centralizes which implementation to use.
- Makes switching implementations easier.
- Makes tests easier because a factory can return a fake/mock implementation.
- Avoids spreading `new SomeConcreteClass(...)` throughout the codebase.

Trade-off: it adds an extra abstraction. For very small code, direct construction is often simpler.

Interview summary:

> “A factory centralizes object creation. Callers ask for an object through a common interface instead of knowing which concrete class to instantiate. This decouples usage from construction and makes configuration changes and testing easier.”
------------------

## Factory pattern in rate limiter
Here is how your `store.js` could use a factory instead of module-level singleton state:

```js
const { SECONDS_PER_MINUTE, MS_PER_SECOND } = require("./constants");

function createStore() {
  const buckets = new Map();
  let initialized = false;

  function init(config) {
    buckets.clear();

    for (const { endpoint, burst, sustained } of config.rateLimitsPerEndpoint) {
      buckets.set(endpoint, {
        tokens: burst,
        lastRefill: Date.now(),
        burst,
        sustained,
      });
    }

    initialized = true;
  }

  function checkAndConsume(endpoint) {
    const bucket = buckets.get(endpoint);

    if (!bucket) {
      return null;
    }

    const now = Date.now();
    const elapsedSeconds = (now - bucket.lastRefill) / MS_PER_SECOND;
    const refillPerSecond = bucket.sustained / SECONDS_PER_MINUTE;

    bucket.tokens = Math.min(
      bucket.burst,
      bucket.tokens + elapsedSeconds * refillPerSecond
    );
    bucket.lastRefill = now;

    if (bucket.tokens >= 1) {
      bucket.tokens -= 1;

      return {
        accepted: true,
        remaining: Math.floor(bucket.tokens),
      };
    }

    return { accepted: false, remaining: 0 };
  }

  function isReady() {
    return initialized;
  }

  return { init, checkAndConsume, isReady };
}

module.exports = { createStore };
```

Then create one application store in `main.js`:

```js
const { createStore } = require("./store");

const store = createStore();
store.init(config);
```

Pass it into the app/router instead of importing a global singleton:

```js
const app = createApp(store);
```

For a test, make a fresh store per test:

```js
beforeEach(() => {
  store = createStore();
  store.init(testConfig);
});
```

That prevents bucket state leaking between tests.
