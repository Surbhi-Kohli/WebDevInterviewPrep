```
function Modal({ open, titleId, onClose, children }) {
  const closeBtnRef = useRef(null);

  useEffect(() => {
    if (open) {
      closeBtnRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(e) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <h2 id={titleId}>Confirm delete</h2>
      {children}
      <button ref={closeBtnRef} type="button" onClick={onClose}>
        Close
      </button>
    </div>
  );
}```

Return focus on close
```
function useReturnFocus(isOpen) {
  const triggerRef = useRef(null);
  useEffect(() => {
    if (!isOpen && triggerRef.current) {
      triggerRef.current.focus();
    }
  }, [isOpen]);
  return triggerRef;
}
```
# How focus return works (and what that `ref` points to)

The hook **does not** know which element to focus by itself. **You** tell it by attaching the returned `triggerRef` to the button (or link) that opened the modal.

```text
useReturnFocus() creates a ref object  →  you attach it to the Open button
                                              ↓
                                    triggerRef.current = that <button> in the DOM
                                              ↓
                                    on close, .focus() runs on that same button
```

---

## The missing piece: you wire the ref to the trigger

Earlier snippet was only half the pattern. Full usage:

```jsx
function ConfirmModal({ open, onClose }) {
  const triggerRef = useReturnFocus(open);

  return (
    <>
      {/* THIS button gets the ref — that's what triggerRef "references" */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
      >
        Delete item
      </button>

      {open && (
        <Modal onClose={onClose}>
          <p>Are you sure?</p>
          <button type="button" onClick={onClose}>Cancel</button>
        </Modal>
      )}
    </>
  );
}
```

Flow:

1. React mounts the **Delete item** button with `ref={triggerRef}`.
2. React sets `triggerRef.current` = that real DOM `<button>`.
3. User opens modal → focus moves into the modal (separate logic).
4. User closes modal → `open` becomes `false`.
5. `useEffect` runs → `triggerRef.current.focus()` → focus back on **Delete item**.

The ref doesn’t reference a “component.” It references the **DOM node** of whichever element you put `ref={triggerRef}` on.

---

## Why `useRef(null)` inside the hook still works

```jsx
function useReturnFocus(isOpen) {
  const triggerRef = useRef(null);  // same object for the life of the component
  // ...
  return triggerRef;  // parent attaches this to <button ref={triggerRef}>
}
```

- `useRef` returns **one stable object** `{ current: null }` per component instance.
- The hook **returns that object** to the parent.
- Parent passes it to `<button ref={triggerRef}>`.
- React fills in `.current` with the button element.

Same ref object in the hook and on the button — that’s the link.

```text
┌─────────────────────────────────────────┐
│  ConfirmModal (one component instance)   │
│                                          │
│  triggerRef = { current: <button DOM> }  │
│       ↑                    ↑             │
│   from hook          set by React when   │
│                      ref={triggerRef}     │
└─────────────────────────────────────────┘
```

---

## Step-by-step timeline

| Step | `isOpen` | `triggerRef.current` | Focus location |
|------|----------|----------------------|----------------|
| 1. Page loads | `false` | Delete button DOM | Delete button (or elsewhere) |
| 2. User clicks Delete | `true` | still Delete button | moves to modal (e.g. Cancel) |
| 3. User closes modal | `false` | still Delete button | `useEffect` → back to Delete button |

`triggerRef.current` still points at the trigger the whole time; only **focus** moved.

---

## The `useEffect` logic

```jsx
useEffect(() => {
  if (!isOpen && triggerRef.current) {
    triggerRef.current.focus();
  }
}, [isOpen]);
```

- Runs when `isOpen` changes.
- When modal **closes** (`!isOpen`) and the trigger still exists → call `.focus()` on it.
- When modal **opens** (`isOpen === true`), this branch doesn’t run — something else focuses the modal.

**Caveat:** this also runs on **first mount** when `isOpen` is `false`, which can steal focus on page load. Production code often tracks “was open before”:

```jsx
function useReturnFocus(isOpen) {
  const triggerRef = useRef(null);
  const wasOpenRef = useRef(false);

  useEffect(() => {
    if (isOpen) {
      wasOpenRef.current = true;
      return;
    }
    if (wasOpenRef.current && triggerRef.current) {
      triggerRef.current.focus();
      wasOpenRef.current = false;
    }
  }, [isOpen]);

  return triggerRef;
}
```

Only return focus after a real close, not on initial render.

---

## Alternative: remember whatever had focus

When the trigger isn’t a single ref (e.g. opened from keyboard shortcut):

```jsx
function useFocusReturn(isOpen) {
  const previouslyFocused = useRef(null);

  useEffect(() => {
    if (isOpen) {
      previouslyFocused.current = document.activeElement;
      return;
    }
    if (previouslyFocused.current instanceof HTMLElement) {
      previouslyFocused.current.focus();
      previouslyFocused.current = null;
    }
  }, [isOpen]);
}
```

Before open: save `document.activeElement`. On close: focus that element again.

---

## What Radix / Headless UI do

Same idea, built in:

```jsx
<Dialog.Root>
  <Dialog.Trigger>Open</Dialog.Trigger>  {/* library remembers this */}
  <Dialog.Content>...</Dialog.Content>   {/* on close, focus → Trigger */}
</Dialog.Root>
```

You don’t see `triggerRef` — the library stores the trigger and restores focus on unmount/close.

---

## Interview answer (short)

> Focus return works by keeping a ref to the element that opened the overlay. The hook returns that ref; I attach it to the trigger button. When the modal closes, I call `triggerRef.current.focus()`. The ref doesn’t point to a React component — it points to the DOM node React assigned when I used `ref={triggerRef}` on the trigger.

---

## Mental model

```text
Open:   Trigger ref ──► remembers <button id="delete-btn">
        Focus travels ──► into modal

Close:  Modal unmounts / isOpen = false
        useEffect reads trigger ref ──► focus back to <button id="delete-btn">
```

If you want, next step is a **complete minimal modal** (open → trap focus → Esc close → return focus) in one file you can run locally.
