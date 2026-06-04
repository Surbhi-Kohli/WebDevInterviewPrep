# Updated Notes: npm, `package.json`, Version Ranges, `package-lock.json`, and `npm ci`

## 1. Starting an npm project

To start a Node/npm project, you usually run:

```bash
npm init
```

or:

```bash
npm init -y
```

This creates a `package.json` file. `npm init` asks questions and creates the file with your answers, while `npm init -y` creates a default `package.json` quickly. npm’s docs say `package.json` lists packages your project depends on and specifies package versions using semantic versioning rules. ([npm Docs][1])

---

# 2. What is `package.json`?

`package.json` is the **manifest** of your project.

A **manifest** means:

```txt
A file that describes important information about a project.
```

In npm, `package.json` stores things like:

```json
{
  "name": "my-app",
  "version": "1.0.0",
  "scripts": {
    "start": "vite",
    "build": "vite build"
  },
  "dependencies": {
    "axios": "^1.6.0"
  },
  "devDependencies": {
    "vite": "^5.0.0"
  }
}
```

Simple meaning:

```txt
package.json = project info + scripts + dependency requirements
```

---

# 3. Installing dependencies

To install a package:

```bash
npm install axios
```

or:

```bash
npm i axios
```

This downloads the package into `node_modules` and adds it to `package.json`.

Example:

```json
{
  "dependencies": {
    "axios": "^1.6.0"
  }
}
```

By default, `npm install <package>` uses the `latest` tag unless you specify a version or tag, and if a `package.json` exists, npm installs a version satisfying the semver rule declared there. ([npm Docs][2])

---

# 4. `dependencies` vs `devDependencies`

## `dependencies`

Packages needed when the app runs.

Examples:

```txt
react
axios
express
mongoose
```

Install:

```bash
npm install axios
```

Saved as:

```json
{
  "dependencies": {
    "axios": "^1.6.0"
  }
}
```

---

## `devDependencies`

Packages needed only during development, testing, linting, or building.

Examples:

```txt
vite
jest
eslint
prettier
typescript
```

Install:

```bash
npm install vite -D
```

or:

```bash
npm install vite --save-dev
```

Saved as:

```json
{
  "devDependencies": {
    "vite": "^5.0.0"
  }
}
```

---

# 5. Semantic versioning

npm package versions usually follow:

```txt
MAJOR.MINOR.PATCH
```

Example:

```txt
1.6.3
```

Meaning:

```txt
1 = major
6 = minor
3 = patch
```

Basic idea:

```txt
MAJOR = breaking changes
MINOR = new backward-compatible features
PATCH = backward-compatible bug fixes
```

Example:

```txt
1.6.3 -> 1.6.4  = patch update
1.6.3 -> 1.7.0  = minor update
1.6.3 -> 2.0.0  = major update
```

---

# 6. Meaning of `^`, `~`, `*`, and exact versions

In `package.json`, dependency versions can be ranges, not just exact versions.

Example:

```json
{
  "dependencies": {
    "axios": "^1.6.0"
  }
}
```

npm uses semver ranges to decide which versions are acceptable.

---

## 6.1 Exact version

```json
"axios": "1.6.0"
```

Means:

```txt
Install exactly 1.6.0
```

Allowed:

```txt
1.6.0
```

Not allowed:

```txt
1.6.1
1.7.0
2.0.0
```

Memory:

```txt
No symbol = locked version
```

---

## 6.2 Tilde `~`

```json
"axios": "~1.6.0"
```

Means:

```txt
Allow patch updates only.
```

So:

```txt
~1.6.0 = >=1.6.0 <1.7.0
```

Allowed:

```txt
1.6.0
1.6.1
1.6.9
```

Not allowed:

```txt
1.7.0
2.0.0
```

The npm semver parser docs say `~1.2.3` expands to `>=1.2.3 <1.3.0-0`, meaning patch-level changes are allowed when the minor version is specified. ([GitHub][3])

Memory:

```txt
~ = tiny update = patch only
```

---

## 6.3 Caret `^`

```json
"axios": "^1.6.0"
```

Means:

```txt
Allow minor and patch updates, but not major updates.
```

So:

```txt
^1.6.0 = >=1.6.0 <2.0.0
```

Allowed:

```txt
1.6.1
1.7.0
1.9.9
```

Not allowed:

```txt
2.0.0
```

The npm semver parser docs say `^1.2.3` expands to `>=1.2.3 <2.0.0-0`, and caret allows patch and minor updates for versions `1.0.0` and above. ([GitHub][3])

Memory:

```txt
^ = climb up, but do not cross the next major version
```

---

## 6.4 Star `*`

```json
"axios": "*"
```

Means:

```txt
Allow any version.
```

The semver docs define `*` as `>=0.0.0`, meaning any non-prerelease version satisfies it unless prerelease handling is explicitly enabled. ([GitHub][3])

Usually avoid this in real projects because it gives npm too much freedom.

Memory:

```txt
* = anything goes
```

---

# 7. Quick memory table

| Version    | Meaning               | Example          |
| ---------- | --------------------- | ---------------- |
| `"1.2.3"`  | Exact version only    | only `1.2.3`     |
| `"~1.2.3"` | Patch updates         | `>=1.2.3 <1.3.0` |
| `"^1.2.3"` | Minor + patch updates | `>=1.2.3 <2.0.0` |
| `"*"`      | Any version           | any version      |

Memory line:

```txt
Exact = locked
~     = tiny patch updates
^     = safe bigger updates
*     = anything
```

---

# 8. Does npm add `^`, `~`, or `*` automatically?

Usually, npm saves dependencies with `^` by default.

Example:

```bash
npm install axios
```

May save:

```json
"axios": "^1.6.0"
```

If you want exact version:

```bash
npm install axios@1.6.0 --save-exact
```

or:

```bash
npm install axios@1.6.0 -E
```

Saved as:

```json
"axios": "1.6.0"
```

If you want tilde:

```bash
npm install axios@~1.6.0
```

Saved as:

```json
"axios": "~1.6.0"
```

---

# 9. `package.json` does not always store exact installed versions

This:

```json
"axios": "^1.6.0"
```

does not mean:

```txt
axios must always be exactly 1.6.0
```

It means:

```txt
npm may install any compatible version from 1.6.0 up to before 2.0.0.
```

So:

```txt
package.json stores allowed version ranges.
```

That is why we need `package-lock.json`.

---

# 10. What is `package-lock.json`?

`package-lock.json` is automatically generated by npm. It records the **exact dependency tree** npm generated, so future installs can reproduce the same tree even if newer dependency versions are published later. npm docs call it a “manifestation of the manifest” and say it is generated when npm modifies `node_modules` or `package.json`. ([npm Docs][4])

Simple meaning:

```txt
package.json       = what versions are allowed
package-lock.json  = what versions were actually installed
```

Example:

```json
// package.json
{
  "dependencies": {
    "axios": "^1.6.0"
  }
}
```

This says:

```txt
Allow compatible axios versions.
```

But `package-lock.json` may record:

```json
{
  "node_modules/axios": {
    "version": "1.6.8",
    "resolved": "https://registry.npmjs.org/axios/-/axios-1.6.8.tgz",
    "integrity": "sha512-..."
  }
}
```

This says:

```txt
Actually installed axios 1.6.8 from this exact package tarball.
```

---

# 11. Why is `package-lock.json` important?

## 11.1 Same installs for everyone

Without a lock file, two developers may install at different times and get different compatible versions.

Example:

```json
"some-lib": "^1.2.0"
```

Developer A installs today:

```txt
some-lib@1.2.3
```

Developer B installs later:

```txt
some-lib@1.3.0
```

Both may satisfy `^1.2.0`, but they are not the same exact version.

`package-lock.json` prevents this by locking the exact generated dependency tree. npm docs say it is intended to be committed and helps teammates, deployments, and CI install the same dependencies. ([npm Docs][4])

---

## 11.2 Locks transitive dependencies

You directly install:

```bash
npm install axios
```

But `axios` itself depends on other packages.

Those are called **transitive dependencies**.

Example:

```txt
your app
└── axios
    ├── dependency-a
    └── dependency-b
```

`package.json` usually lists your direct dependencies.

`package-lock.json` records the full dependency tree, including transitive dependencies.

---

## 11.3 Tracks exact source and integrity

`package-lock.json` records fields like:

```json
{
  "version": "1.2.3",
  "resolved": "https://registry.npmjs.org/package-name/-/package-name-1.2.3.tgz",
  "integrity": "sha512-..."
}
```

Meaning:

```txt
version   = exact installed version
resolved  = where npm downloaded it from
integrity = fingerprint/hash of the downloaded package
```

The npm docs say `integrity` is a `sha512` or `sha1` Standard Subresource Integrity string for the package artifact. ([npm Docs][4])

---

# 12. Why does `package-lock.json` have an integrity hash?

The `integrity` hash is like a fingerprint.

It helps npm verify:

```txt
Did I download the exact package content expected by the lock file?
```

If the downloaded package matches the integrity hash:

```txt
npm accepts it.
```

If it does not match:

```txt
npm rejects it with an integrity error.
```

It helps protect against:

```txt
corrupted downloads
broken npm cache
unexpected package tarball changes
tampered package contents
```

Important:

```txt
integrity hash = verifies package content consistency
```

It does **not** mean:

```txt
the package is safe or non-malicious
```

If a malicious package was already published and locked, its integrity hash can still match.

Memory:

```txt
integrity = package fingerprint
```

---

# 13. `package.json` vs `package-lock.json`

| Feature                   | `package.json`                           | `package-lock.json`             |
| ------------------------- | ---------------------------------------- | ------------------------------- |
| Role                      | Project manifest                         | Exact dependency snapshot       |
| Created by                | `npm init` or manually                   | npm automatically               |
| Stores                    | Project info, scripts, dependency ranges | Exact installed dependency tree |
| Versions                  | Ranges like `^1.2.3`, `~1.2.3`, exact    | Exact resolved versions         |
| Transitive dependencies   | Usually no                               | Yes                             |
| Should you manually edit? | Sometimes yes                            | Usually no                      |
| Should you commit?        | Yes                                      | Yes for apps/projects           |
| Main purpose              | Define requirements                      | Reproduce exact installs        |

Best summary:

```txt
package.json       = requirements
package-lock.json  = exact resolved result
```

---

# 14. What is `npm install`?

`npm install` is the normal development command.

You use it to:

```txt
install dependencies
add new packages
update package-lock.json when needed
create node_modules
```

Examples:

```bash
npm install
npm install axios
npm install vite -D
```

When you run `npm install` without arguments, npm compares `package.json` and `package-lock.json`. If the lockfile’s resolved versions satisfy the ranges in `package.json`, npm uses the exact versions from the lockfile. If they do not satisfy those ranges, npm resolves new versions and updates `package-lock.json`. npm’s docs summarize this as: `package.json` is the source of truth for acceptable version ranges; when the lockfile satisfies those ranges, the lockfile wins, and when they conflict, `package.json` wins. ([npm Docs][5])

---

# 15. Why does `npm install` update `package-lock.json`?

The point of `package-lock.json` is not:

```txt
Always install this even if package.json changes.
```

The real point is:

```txt
Install exactly this locked tree as long as it still satisfies package.json.
```

Example 1: lockfile still valid.

```json
// package.json
{
  "dependencies": {
    "axios": "^1.6.0"
  }
}
```

Lock file has:

```txt
axios 1.6.0
```

This is valid because:

```txt
1.6.0 satisfies ^1.6.0
```

So:

```bash
npm install
```

can use the locked version.

---

Example 2: lockfile no longer valid.

```json
// package.json
{
  "dependencies": {
    "axios": "^1.7.0"
  }
}
```

Lock file still has:

```txt
axios 1.6.0
```

Now:

```txt
1.6.0 does NOT satisfy ^1.7.0
```

So `npm install` cannot follow the old lock file. It resolves a new version that satisfies `^1.7.0` and updates `package-lock.json`.

Memory:

```txt
package.json = requirement
package-lock.json = exact result for that requirement
```

If the requirement changes, the result may need to change.

---

# 16. What is `npm ci`?

`npm ci` means:

```txt
clean install
```

It is mainly used in:

```txt
CI/CD
testing
deployment
production build pipelines
```

It installs dependencies **strictly from `package-lock.json`**.

The npm docs say `npm ci` requires an existing `package-lock.json` or `npm-shrinkwrap.json`, removes existing `node_modules`, never writes to `package.json` or lock files, and fails if the lock file does not match `package.json`. ([npm Docs][6])

---

# 17. What exactly does `npm ci` do?

When you run:

```bash
npm ci
```

npm does this:

```txt
1. Requires package-lock.json.
2. Deletes existing node_modules.
3. Installs exact versions from package-lock.json.
4. Does not update package.json.
5. Does not update package-lock.json.
6. Fails if package.json and package-lock.json disagree.
```

So:

```txt
npm install = flexible development install
npm ci      = strict clean lockfile install
```

---

# 18. `npm install` vs `npm ci`

| Feature                             | `npm install`                        | `npm ci`                   |
| ----------------------------------- | ------------------------------------ | -------------------------- |
| Main use                            | Development                          | CI/CD, clean installs      |
| Needs `package-lock.json`?          | No, can create/update it             | Yes                        |
| Removes `node_modules` first?       | No                                   | Yes                        |
| Updates `package-lock.json`?        | Can update it                        | Never                      |
| Updates `package.json`?             | Can when adding package              | Never                      |
| Installs exact lockfile tree?       | If lockfile satisfies `package.json` | Yes, strictly              |
| Fails if lock and package mismatch? | Usually updates lock                 | Yes                        |
| Can install one package?            | Yes, `npm install axios`             | No, installs whole project |

---

# 19. What if `package.json` and `package-lock.json` do not match?

Example:

```json
// package.json
{
  "dependencies": {
    "axios": "^1.7.0"
  }
}
```

But `package-lock.json` still has:

```txt
axios 1.6.0
```

Now:

```txt
1.6.0 does not satisfy ^1.7.0
```

If you run:

```bash
npm install
```

npm may update the lock file.

If you run:

```bash
npm ci
```

npm fails.

Why?

Because `npm ci` means:

```txt
Install exactly from the lock file.
Do not modify the lock file.
Stop if files are out of sync.
```

So `npm ci` is strict by design.

---

# 20. Why does `npm ci` fail instead of updating lockfile?

Because `npm ci` is for reproducible environments.

In CI/CD, you do not want the pipeline silently changing dependencies.

You want it to say:

```txt
The committed files are inconsistent.
Fix package-lock.json locally and commit the updated lock file.
```

Correct fix:

```bash
npm install
git add package.json package-lock.json
git commit
```

Then CI can run:

```bash
npm ci
```

successfully.

---

# 21. Simple analogy

```txt
package.json       = shopping list
package-lock.json  = exact receipt from last shopping trip
npm install        = shop and update receipt if shopping list changed
npm ci             = use the receipt exactly; fail if receipt and list disagree
```

Example:

Shopping list:

```txt
Buy milk, bread, eggs
```

Receipt:

```txt
milk, bread, eggs
```

Works.

But if you change the shopping list:

```txt
Buy milk, bread, eggs, coffee
```

the old receipt is no longer valid.

So:

```txt
npm install updates the receipt.
npm ci refuses because the receipt does not match the list.
```

---

# 22. Full workflow

## Step 1: Create project

```bash
mkdir my-app
cd my-app
npm init -y
```

Creates:

```txt
package.json
```

---

## Step 2: Install dependency

```bash
npm install axios
```

Creates/updates:

```txt
package.json
package-lock.json
node_modules
```

---

## Step 3: Install dev dependency

```bash
npm install vite -D
```

Updates:

```txt
package.json
package-lock.json
node_modules
```

---

## Step 4: Commit files

Commit:

```txt
package.json
package-lock.json
```

Do not usually commit:

```txt
node_modules
```

Because dependencies can be recreated from:

```txt
package.json + package-lock.json
```

---

## Step 5: Another developer installs

They clone the repo and run:

```bash
npm install
```

or for a clean strict install:

```bash
npm ci
```

---

## Step 6: CI/CD pipeline

Typical CI flow:

```bash
npm ci
npm test
npm run build
```

Meaning:

```txt
Install exact locked dependencies.
Run tests.
Build project.
```

---

# 23. Final memory map

```txt
npm init
  -> creates package.json

package.json
  -> manifest
  -> project info
  -> scripts
  -> dependency ranges

npm install package
  -> downloads package
  -> updates package.json
  -> updates package-lock.json
  -> creates/updates node_modules

^
  -> minor + patch updates

~
  -> patch updates only

*
  -> any version

package-lock.json
  -> exact dependency tree
  -> exact versions
  -> transitive dependencies
  -> resolved URLs
  -> integrity hashes

integrity hash
  -> fingerprint to verify downloaded package content

npm install
  -> flexible
  -> can update package-lock.json
  -> lockfile is followed only if it satisfies package.json

npm ci
  -> clean + strict
  -> requires package-lock.json
  -> deletes node_modules
  -> never updates package.json or package-lock.json
  -> fails if package.json and package-lock.json disagree
```

Best final summary:

```txt
package.json says what your project wants.
package-lock.json records exactly what npm installed.
npm install can update the lock file when requirements change.
npm ci installs exactly from the lock file and fails if the files are out of sync.
```

[1]: https://docs.npmjs.com/creating-a-package-json-file/?utm_source=chatgpt.com "Creating a package.json file - npm Docs"
[2]: https://docs.npmjs.com/downloading-and-installing-packages-locally/?utm_source=chatgpt.com "Downloading and installing packages locally - npm Docs"
[3]: https://github.com/npm/node-semver "GitHub - npm/node-semver: The semver parser for node (the one npm uses) · GitHub"
[4]: https://docs.npmjs.com/cli/v10/configuring-npm/package-lock-json/?v=true&utm_source=chatgpt.com "package-lock.json | npm Docs"
[5]: https://docs.npmjs.com/cli/v11/commands/npm-install/?utm_source=chatgpt.com "npm-install - npm Docs"
[6]: https://docs.npmjs.com/cli/v10/commands/npm-ci/?v=true&utm_source=chatgpt.com "npm-ci | npm Docs"
