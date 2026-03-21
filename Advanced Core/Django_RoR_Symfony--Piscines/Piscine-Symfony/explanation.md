# Piscine Symfony — Exercise Breakdown

A plain-language summary of what every exercise asks you to do, module by module.

---

## Module 0 — Initiation

> **Theme:** HTML, CSS, JavaScript integration — no PHP yet.

### Ex 00 — First Shell Script
Write a shell script (`myawesomescript.sh`) that takes a `bitly.com` short URL as an argument and prints the real URL it redirects to. You may only use `curl`, `grep`, and `cut`.

### Ex 01 — Your Résumé in HTML
Create `cv.html` — a résumé using semantic HTML. Must include `<title>`, `<h1>`, `<table>` (visible, collapsed borders), both `<ul>` and `<ol>` lists, and use two different ways to apply CSS (inline `<style>` tag + external stylesheet).

### Ex 02 — Email Sending Form
Build `form.html` with fields: Firstname (text), Name (text), Age (number), Phone (tel), Email (email), "Student at 42?" (checkbox), Gender (radio). The submit button must call a provided `popup.js` file's `displayFormContents()` function. You **cannot** modify the JS file.

### Ex 03 — Reproduce a Webpage
Given a screenshot and a CSS file, recreate the page as closely as possible in `copy.html`. You must use the provided CSS without editing it.

### Ex 04 — Integration of JS Snippets
Create `snippets.html` that imports four provided JS files (`file1.js` – `file4.js`) in the correct order so a popup displays without weird characters. You cannot edit the JS files.

### Ex 05 — W3C Validation
Fix a provided broken `index.html` so it passes W3C validation with **zero** errors or warnings.

---

## Module 0 — Starting

> **Theme:** PHP basics — variables, arrays, file reading, data structures.

### Ex 00 — Var
Create `var.php` with four variables (`a`, `b`, `c`, `d`). Print each variable's value and its type dynamically (no hard-coding types).

### Ex 01 — CSV
Write `csv.php` that reads `ex01.txt` (comma-separated values) and prints each value on a new line.

### Ex 02 — Old Times
Write a function `array2hash` that converts an array of `[name, age]` sub-arrays into an associative array where keys are ages and values are names.

### Ex 03 — Sorted Times
Write `array2hash_sorted` — same as Ex 02, but keys are names, values are ages, and the result is sorted by name in **reverse alphabetical** order.

### Ex 04 — States & Capitals
Given `$states` and `$capitals` arrays, write `capital_city_from($state)` that returns the capital or `"Unknown"`.

### Ex 05 — Searching States or Capitals
Write `search_by_states` that takes a comma-separated string of state/capital names and returns formatted results like `"Salem is the capital of Oregon."` or `"Topeka is neither a capital nor a state."`.

### Ex 06 — Mendeleïev Table
Read `ex06.txt` containing periodic table data and generate `mendeleiev.html` — an HTML table where each element is a cell with its title in `<h4>` and attributes in a `<ul>`.

---

## Module 0 — OOB (OOP)

> **Theme:** Object-Oriented Programming in PHP — classes, inheritance, reflection, HTML generation.

### Ex 00 — HTML Parameters (TemplateEngine)
Create a `TemplateEngine` class with a method `createFile($fileName, $templateName, $parameters)`. It reads a template HTML file and replaces `{placeholders}` with values from the `$parameters` array.

### Ex 01 — Render Object (Text)
Create a `Text` class that holds an array of strings, has `append()` and `readData()` (wraps each string in `<p>` tags). Modify `TemplateEngine::createFile` to accept a `Text` object and render it into the body.

### Ex 02 — Render Object 2 (Inheritance)
Create a `HotBeverage` base class (name, price, resistence + getters). Extend it with `Coffee` and `Tea` (add description, comment). Modify `TemplateEngine` to accept a `HotBeverage`, use PHP's `ReflectionClass` to read all attributes, and generate an HTML file via a template.

### Ex 03 — Generate HTML (Elem class)
Create an `Elem` class representing an HTML tag. Supports: `meta`, `img`, `hr`, `br`, `html`, `head`, `body`, `title`, `h1`–`h6`, `p`, `span`, `div`. Has `pushElement()` to nest elements and `getHTML()` to render the tree. Modify `TemplateEngine` to accept an `Elem` and save the output.

### Ex 04 — Generate HTML 2 (Exceptions & Attributes)
Extend `Elem` to throw a custom `MyException` for invalid tags. Add support for `table`, `tr`, `th`, `td`, `ul`, `ol`, `li`. Add an optional `$attributes` array parameter to the constructor (rendered as HTML attributes like `class="text-muted"`).

### Ex 05 — Validate HTML
Add `validPage()` to `Elem` that returns `true`/`false` by checking:
- Root is `<html>` with exactly one `<head>` then one `<body>`.
- `<head>` has exactly one `<title>` and one `<meta charset>`.
- `<p>` contains only text, no nested tags.
- `<table>` contains only `<tr>`; `<tr>` contains only `<th>`/`<td>`.
- `<ul>`/`<ol>` contain only `<li>`.

---

## Module 1 — Composer

> **Theme:** PHP dependency management with Composer.

### Ex 00 — Install Composer Globally
Install Composer globally on your system from the terminal.

### Ex 01 — Specifying Versions
Install various versions of the **Monolog** package using Composer version constraints:
1. Exactly `2.3.0`
2. `>2.2.0` and `<=2.3.5`
3. Between `2.1.0` and `2.2.0`
4. `>=2.9.0` and `<2.9.2`
5. `>2.0.0` and `<2.3.5`

Each sub-task needs its own `composer.json`.

### Ex 02 — Development Requirement
Install the LTS version of **PHPUnit** as a `require-dev` dependency.

### Ex 03 — Install vs Update
Given a pre-existing `composer.json` + `composer.lock`, run `composer install` and then `composer update`. Observe and explain the difference (install respects the lock file; update resolves and rewrites it).

---

## Module 1 — Base Symfony

> **Theme:** Your first Symfony app — routing, controllers, Twig templates, forms.

### Ex 00 — First Page
Create a Symfony project. Define a route `/e00/firstpage` that returns a plain `"Hello world!"` response using `HttpFoundation\Response` — **no Twig**, just a controller.

### Ex 01 — Multiple Pages (Twig)
Build a page at `/e01` with a header, footer, and links to at least 3 article pages (`/e01/{article}`). Use Twig template inheritance (`base.html.twig` → article templates). Invalid article slugs must redirect to the main page.

### Ex 02 — First Form
At `/e02`, display a Symfony Form with a "Message" text field and a "Include timestamp" dropdown (Yes/No). On submit, write to a file on disk (filename configurable in `services.yml`). If "Yes", write message + timestamp; if "No", write only the message. Server-side validation: Message must not be blank. After submit, show the last line written.

### Ex 03 — Fifty Shades of Colors
At `/e03`, display a table of color shades for black, red, blue, green. The number of rows is configurable from `services.yml` (`e03.number_of_colors`). Each cell is 40×80px with dynamically computed background colors. Values must be generated in the controller and passed to Twig.

---

## Module 2 — SQL

> **Theme:** Full CRUD using both raw SQL and Doctrine ORM, relationships, joins, and SQL injection.

### Ex 00 — Create Table (SQL)
Create a database table via raw SQL with columns: `id`, `username` (unique), `name`, `email` (unique), `enable` (bool), `birthdate` (datetime), `address` (text). A link on the page triggers creation; show success/error. Must not fail if table already exists.

### Ex 01 — Create Table (ORM)
Same table structure as Ex 00, but create it using a Doctrine Entity and ORM commands only. No raw SQL.

### Ex 02 — Insert & Read (SQL)
Build a Symfony Form to insert data into the SQL table. Display all rows in an HTML table. Handle unique constraint violations gracefully.

### Ex 03 — Insert & Read (ORM)
Same as Ex 02 but using Doctrine ORM only. Map the form to the entity. Add form validation. ORM commands must not live in the controller.

### Ex 04 — Delete (SQL)
Add a delete endpoint (`/delete/{id}`) using raw SQL. Show all rows in a table with a delete button per row. Display success/error messages.

### Ex 05 — Delete (ORM)
Same as Ex 04 using Doctrine ORM only.

### Ex 06 — Update (SQL)
List entities in a table with an "Update" button per row. Clicking it opens a pre-filled form. Submit updates the row via raw SQL. Show success/error.

### Ex 07 — Update (ORM)
Same as Ex 06 using ORM only. Map the form to the entity.

### Ex 08 — Alter Table & Relations (SQL)
Using raw SQL: create a `persons` table (without `address`), then alter it to add `marital_status` (ENUM). Create `bank_accounts` and `addresses` tables. Set up a one-to-one relationship (person ↔ bank_account) and a one-to-many relationship (person → addresses).

### Ex 09 — Alter Table & Relations (ORM)
Same as Ex 08 using Doctrine entities and migrations. Create bidirectional relationships between `Person`, `BankAccount`, and `Address`.

### Ex 10 — Insert from File (SQL + ORM)
Read data from a file and insert it into both a raw SQL table **and** an ORM entity table. Display the results on an HTML page. Must use **both** SQL and ORM.

### Ex 11 — Join, Sort & Filter (SQL)
Display data from multiple related tables using SQL `JOIN`. Add a form with filtering (e.g. by date) and sorting (e.g. by name). Must use **join + condition + sort** — missing any one means zero points.

### Ex 12 — Join, Sort & Filter (ORM)
Same as Ex 11 using Doctrine ORM repository queries only.

### Ex 13 — Complete CRUD (ORM)
Build a full CRUD for an `Employee` entity with fields: id, firstname, lastname, email, birthdate, active, employed_since, employed_until, hours (ENUM: 8/6/4), salary, position (ENUM: manager, dev, etc.). Add a self-referencing one-to-many relationship (manager → employees). Full validation, error handling, success/error messages.

### Ex 14 — SQL Injection Demo
Create an unprotected HTML form that inserts data via raw SQL. Attach a JavaScript handler on form submit that performs a functional SQL injection. The result (data leak, modification, or deletion) must be visible on the page.

---

## Module 3 — Sessions

> **Theme:** Symfony Security — authentication, authorization, roles, sessions.

### Ex 01 — Login & Register
Set up Symfony Security with database-backed users. Create login and register forms. The homepage shows a welcome message with the user's name + logout button, or login/register links if not authenticated.

### Ex 02 — User Roles & Administration
Create an Administrator role. Admins can view a page listing all users and delete any user — but **not** themselves.

### Ex 03 — Posts
Create a `Post` entity (title, content, created, author → linked to User). Homepage lists all posts (newest first) with title, author, date. Post detail pages are restricted to logged-in users. Logged-in users can create posts.

### Ex 04 — Anonymous Users
Anonymous sessions last only 1 minute. On visit, assign a random animal name (e.g. "Anonymous Dog"). Display the name on the homepage + seconds since last request.

### Ex 05 — Votes
Logged-in users can like/dislike posts (once per post). Homepage shows like/dislike counts. Each username displays a **reputation score** (sum of likes minus dislikes across all their posts).

### Ex 06 — Post Editing
Logged-in users can edit posts. Show "Last edited by [user] at [datetime]" on the detail page if the post was edited.

### Ex 07 — User Privileges (Reputation-Based)
Privileges unlock based on reputation:
- **0 pts:** Create posts, edit own posts only.
- **3 pts:** Can like posts.
- **6 pts:** Can dislike posts.
- **9+ pts:** Can edit any post.
- **Admin:** Can do everything regardless of reputation.

Use **Doctrine Fixtures** to populate test data.

---

## Module 3 — Advanced

> **Theme:** Bundle configuration, translations, Twig extensions, dependency injection, unit testing.

### Ex 00 — Base Custom Bundle
Set up a fresh Symfony app. The default path (`/`) should return a 404. No unnecessary bundles. Empty controllers and views directories.

### Ex 01 — Bundle Configuration
Create a configuration file with root key `d07` containing `number` (required integer) and `enable` (optional boolean, default `true`). Wire it through an Extension class so the value is accessible via `getParameter()`. Create `/ex01` route that returns the value of `number`.

### Ex 02 — Translations
Enable translations for `en` and `fr`. Create `messages.en.yml` and `messages.fr.yml`. Route: `/{_locale}/ex02/{count}` (count is optional, 0–9). Display translated text using `ex02.number` and `ex02.count` keys with pluralization (`none | one | number %count%`).

### Ex 03 — Twig Extension & Dependency Injection
Create a Twig Extension at `src/D07Bundle/Twig/Ex03Extension.php` with:
- **Filter** `uppercaseWords`: capitalizes the first letter of each word.
- **Function** `countNumbers`: returns the count of digits in a string.

The logic must live in a **separate service** class (`src/Service/Ex03Service`) injected into the extension. Create `/ex03` route + template to demo both.

### Ex 04 — Unit Testing
Write PHPUnit tests for the `Ex03Service` class. At least **3 assertions** per function (`uppercaseWords` and `countNumbers`). All tests must pass.

---

## Module 3 — Final

> **Theme:** Single Page Application (SPA) with AJAX, and real-time updates via WebSockets.

### Ex 00 — Base Bundle & Entity
Set up a new Symfony app. Create a `Post` entity with fields: `id`, `title`, `content`, `created` (auto-set via Doctrine lifecycle event on creation).

### Ex 01 — Post Form & Security (AJAX)
Set up Symfony Security with simple users. Create `UserController` (`/login`) and `PostController` (`/` default path). If not logged in → show login form. If logged in → show post form (title + content). **Both forms submit via AJAX.** Failed login → browser alert. Successful post → confirmation message. Page must **never** reload.

### Ex 02 — Post List (AJAX)
Below the form, show a list of all posts (title + creation date), visible to everyone. When a new post is submitted via AJAX, the list updates dynamically (no page reload). Validate that post titles are unique — duplicates trigger a browser alert.

### Ex 03 — Post Details & Deletion (AJAX)
Clicking a post title triggers an AJAX call to `/view/{id}` and displays the post details above the form. Post details include a delete button (only for logged-in users). Delete calls `/delete/{id}` via AJAX, shows a confirmation dialog, removes the post, and updates the list — all without reloading.

### Ex 04 — WebSockets
Start a WebSocket server on port 8080 via a custom Symfony command: `bin/console websocket:server`. On the client side, connect via JavaScript WebSocket. When **any** browser window creates or deletes a post, **all** connected clients' post lists update in real time.
