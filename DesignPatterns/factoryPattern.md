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
