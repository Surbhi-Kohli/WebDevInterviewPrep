A large part of React is this idea of having components control and manage their own state. What happens when we throw native HTML 
form elements (input, select, textarea, etc) into the mix? Should we have
React be the “single source of truth” like we’re used to doing with React or should we allow that form data to live in the DOM like we’re 
used to typically doing with HTML form elements? These two questions are at the heart of controlled vs. uncontrolled components.

A controlled component is a component where React is in control and is the single source of truth for the form data. As you can see below, '
username doesn’t live in the DOM but instead lives in our component state. Whenever we want to update username, we call setState as we’re used to.*/
```
class ControlledForm extends Component {
  state = {
    username: ''
  }
  updateUsername = (e) => {
    this.setState({
      username: e.target.value,
    })
  }
  handleSubmit = () => {}
  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type='text'
          value={this.state.username}
          onChange={this.updateUsername} />
        <button type='submit'>Submit</button>
      </form>
    )
  }
}
```
An uncontrolled component is where your form data is handled by the DOM, instead of inside your React component.

You use refs to accomplish this.
```
class UnControlledForm extends Component {
  input = React.createRef()
  handleSubmit = () => {
    console.log("Input Value: ", this.input.current.value)
  }
  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type='text'
          ref={} />
        <button type='submit'>Submit</button>
      </form>
    )
  }
}
```
Though uncontrolled components are typically easier to implement since you just grab the value from the DOM using refs, 
it’s typically recommended that you favor controlled components over uncontrolled components. The main reasons for this are that 
controlled components support instant field validation, allow you to conditionally disable/enable buttons, 
enforce input formats, and are more “the React way”.

# When uncontrolled is the better choice

**Controlled** = parent owns `value` and updates on every keystroke.  
**Uncontrolled** = DOM holds the value; you read it when you need it (`ref`, `FormData`, submit).

Use uncontrolled when the **parent doesn’t need the value on every change** — only on submit, blur, or a specific action.

---

## Example 1: Login form (only need values on submit)

Here you don’t need Redux/state updated on every keypress. Controlled adds re-renders and boilerplate for no benefit.

### Uncontrolled (better here)

```jsx
function LoginForm({ onSubmit }) {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input ref={emailRef} type="email" name="email" defaultValue="" />
      <input ref={passwordRef} type="password" name="password" />
      <button type="submit">Log in</button>
    </form>
  );
}
```

Or with native `FormData` (even cleaner):

```jsx
function handleSubmit(e) {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target));
  onSubmit(data); // { email, password }
}
```

### Controlled (unnecessary overhead)

```jsx
function LoginForm({ onSubmit }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Re-renders on EVERY keystroke — but parent never uses email/password until submit
  return (
    <form onSubmit={() => onSubmit({ email, password })}>
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <input value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Log in</button>
    </form>
  );
}
```

**Why uncontrolled wins:** no state, no re-render per keystroke, same UX. You only read values once on submit.

---

## Example 2: File input (controlled is basically impossible)

React cannot set `input type="file"` via `value` for security reasons. It must be uncontrolled.

```jsx
function AvatarUpload({ onUpload }) {
  const fileRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    const file = fileRef.current?.files?.[0];
    if (file) onUpload(file);
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* value={...} does NOT work for file inputs */}
      <input ref={fileRef} type="file" accept="image/*" />
      <button type="submit">Upload</button>
    </form>
  );
}
```

**Why uncontrolled wins:** the browser owns file selection; you read `files` when the user submits.

---

## Example 3: Search box — value needed only on Enter

If the parent doesn’t filter live as you type (e.g. you search on Enter or button click), uncontrolled avoids syncing state on every key.

```jsx
function SearchBar({ onSearch }) {
  const inputRef = useRef(null);

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      onSearch(inputRef.current.value);
    }
  }

  return (
    <input
      ref={inputRef}
      type="search"
      defaultValue=""
      placeholder="Search..."
      onKeyDown={handleKeyDown}
    />
  );
}

// Parent only updates when user commits the search
function Page() {
  const [query, setQuery] = useState('');

  return (
    <>
      <SearchBar onSearch={setQuery} />
      <Results query={query} />
    </>
  );
}
```

### When controlled would be better (contrast)

If you **debounce live search** or show character count as they type, you need controlled (or a hook that tracks value):

```jsx
// Controlled makes sense here — UI depends on every keystroke
const [value, setValue] = useState('');
const debounced = useDebouncedValue(value, 300);
useEffect(() => { fetchResults(debounced); }, [debounced]);
```

---

## Example 4: Uncontrolled + `key` reset (edit modal)

For “edit item” modals, uncontrolled with `defaultValue` + `key` resets the form when the item changes without managing every field in state.

```jsx
function EditUserModal({ user, open, onSave, onClose }) {
  const nameRef = useRef(null);

  if (!open) return null;

  return (
    <dialog open>
      {/* key resets inputs when user changes */}
      <form
        key={user.id}
        onSubmit={(e) => {
          e.preventDefault();
          onSave({ ...user, name: nameRef.current.value });
        }}
      >
        <input ref={nameRef} defaultValue={user.name} />
        <button type="submit">Save</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </dialog>
  );
}
```

**Why uncontrolled wins:** opening the modal for a different `user.id` remounts the form via `key`; `defaultValue` is set once. No `useEffect` syncing `user.name` → `useState`.

Controlled equivalent needs extra sync logic:

```jsx
const [name, setName] = useState(user.name);
useEffect(() => setName(user.name), [user.id, user.name]); // easy to get wrong
```

---

## Quick decision guide

| Situation | Prefer |
|-----------|--------|
| Submit-only forms (login, contact) | **Uncontrolled** |
| File inputs | **Uncontrolled** (required) |
| Live validation, character count, masked input | **Controlled** |
| Value synced to Redux/URL on every change | **Controlled** |
| Dependent fields (country → city dropdown) | **Controlled** |
| Simple filter, commit on Enter | **Uncontrolled** |
| Reset form when entity id changes | **Uncontrolled** + `key` |

---

## Interview one-liner

> “I use uncontrolled when I only need the value on submit or blur and nothing in the tree depends on each keystroke — it cuts re-renders and boilerplate. I use controlled when the UI or global state must react to every change, or when I need to validate/transform input as the user types.”

If you want, we can add a small login or search example to your `hello-redux` app so you can compare controlled vs uncontrolled side by side.
