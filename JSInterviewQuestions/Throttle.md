`setTimeout` in that throttle is **not** there to “run the function every X ms.” It’s there to **open the gate again** after X ms.

## What the whiteboard code actually does

```javascript
const throttle = (func, limit) => {
  let flag = true;
  return function () {
    if (flag) {
      func();           // run NOW (because user/event triggered this)
      flag = false;     // close the gate
      setTimeout(() => {
        flag = true;    // open the gate again after `limit` ms
      }, limit);
    }
    // if flag is false, do nothing — ignore extra calls
  };
};
```

Flow:

1. First call → `flag` is true → **`func()` runs immediately**
2. `flag = false` → further calls are ignored
3. After `limit` ms → `flag = true` → next call can run again

So `setTimeout` only resets the **flag**. It does **not** call `func`.

---

## Why not `setInterval`?

`setInterval` means: **“Run this on a fixed clock, forever.”**

Throttle means: **“When someone calls me a lot, run at most once every X ms.”**

Those are different problems.

### With `setInterval` (wrong mental model)

```javascript
setInterval(() => {
  func(); // runs every 300ms whether anyone called throttle or not
}, 300);
```

Problems:

| Issue | Why it matters |
|--------|----------------|
| Runs when idle | Wastes work even if there are zero scroll/click/key events |
| Not tied to events | Throttle should react to **bursts of calls**, not a background clock |
| Wrong timing | User clicks at t=0, t=50, t=100 — interval might fire at t=300, t=600 regardless of when they clicked |
| Hard to stop | Interval keeps going until you `clearInterval` |
| Overlap risk | If `func` is slow, interval callbacks can stack up |

Throttle is **event-driven**: calls come in → maybe run → wait → allow again.

`setInterval` is **timer-driven**: tick → run → tick → run.

---

## Side-by-side example

User scrolls and triggers the wrapper **10 times in 1 second**. Limit = 300ms.

**Flag + `setTimeout` throttle (leading):**

```text
t=0ms    call → func runs ✅
t=50ms   call → ignored
t=100ms  call → ignored
t=300ms  flag opens
t=350ms  call → func runs ✅
```

Runs **because events happened**, at most once per window.

**`setInterval` every 300ms:**

```text
t=0ms    interval → func runs (even if no scroll!)
t=300ms  interval → func runs
t=600ms  interval → func runs
```

Runs on a **schedule**, not because the user scrolled right then.

---

## “I thought we call the function after every interval”

That’s closer to **polling** or a **repeating job**, not throttle.

Throttle pattern:

```text
Event calls wrapper → maybe run func now → block for `limit` → allow again
```

Not:

```text
Every `limit` ms → always run func
```

If you want “run at most once per interval **in response to** calls,” the timer’s job is usually:

- reset a **lock/flag** (`setTimeout`), or  
- schedule **one** pending run (`setTimeout` again, trailing throttle)

—not start an endless interval loop.

---

## When would `setInterval` make sense?

When you truly want periodic execution:

```javascript
// heartbeat, polling an API every 5s, clock tick
setInterval(() => checkServer(), 5000);
```

Not for limiting rapid fire from `scroll`, `resize`, `input`, etc.

---

## One-line summary

- **`setTimeout` in throttle** → “After X ms, allow the **next** call to run `func`.”
- **`setInterval`** → “Every X ms, run `func` whether or not anyone called.”

Throttle limits **incoming calls**. `setInterval` creates **outgoing calls** on a timer. That’s why throttle uses `setTimeout`.

If you want, I can show a trailing-edge throttle (runs on the **last** call in the window) — that one uses `setTimeout` to actually **invoke** `func`, which is another common pattern.
