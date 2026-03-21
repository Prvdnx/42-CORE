# Piscine Ruby on Rails — Exercise Breakdown

A comprehensive summary of what is required for every exercise across all 9 modules of the Ruby on Rails Piscine.

---

## Module 0 — Initiation

> **Theme:** Web development fundamentals: HTTP, HTML, CSS, and basic JavaScript integration.

### Ex 00 — First Shell Script
Write a shell script (`myawesomescript.sh`) using `/bin/sh` that takes a `bit.ly` short URL as an argument and displays the real destination URL. 
- **Constraints:** Use only `curl`, `grep`, and `cut`.

### Ex 01 — Your Résumé in HTML
Create `cv.html` using semantic HTML and CSS.
- **Constraints:** Include `h1`, a `table` with visible collapsed borders, and both `ul` and `ol` lists. Use two different methods for styling: a `<style>` tag in the `<head>` and a `style` attribute directly on a tag.

### Ex 02 — Email Sending Form
Build `form.html` with fields for Firstname, Name, Age (number), Phone (tel), Email (email), a checkbox for "Student at 42?", and radio buttons for Gender. 
- **Integration:** Correcty link a provided `popup.js` (cannot be modified) so clicking the submit button triggers `displayFormContents()`.

### Ex 03 — Web Page Replicating
Recreate a provided webpage from a screenshot as faithfully as possible in `copy.html`.
- **Constraint:** Use a provided CSS file without modification.

### Ex 04 — Snippets JS Integration
Create `snippets.html` that imports four provided JS files (`file1.js` to `file4.js`) in the correct order to display a popup without encoding errors. 
- **Constraint:** No additional JavaScript or script modifications allowed.

### Ex 05 — W3C Validation
Fix a provided broken `index.html` file so it passes the W3C validator with **zero** errors and warnings.

---

## Module 0 — Starting

> **Theme:** Ruby fundamentals: variables, types, data structures (hashes, arrays), and basic scripting.

### Ex 00 — Classy Not Classy
Create `var.rb` with a function `my_var()` that declares 4 variables (Integer, String, NilClass, Float) and prints their values and types.
- **Constraint:** Do not explicitly state the types in your prints; use Ruby's introspection.

### Ex 01 — Breakfast
Write `croissant.rb` to read a file `numbers.txt` (comma-separated numbers) and print them on the standard output, one per line, in **ascending order**.

### Ex 02 — With Hash Browns
Write `H2o.rb` to convert a provided list of tuples `[name, number]` into a Hash where the number is the key and the name is the value. Print the result.

### Ex 03 — Where am I?
Write `Where.rb` which takes a state name as an argument and prints its capital city using provided hashes. Handle "Unknown state" and multiple/zero arguments.

### Ex 04 — Backward
Write `erehW.rb` (the inverse of Ex 03) which takes a capital city as an argument and prints the corresponding state.

### Ex 05 — Hal
Write `whereto.rb` that takes a comma-separated string of expressions and identifies if each is a state, a capital city, or neither. Ignore case and extra spaces.

### Ex 06 — Wait a minute
Write `CoffeeCroissant.rb` to sort a list of musicians first by age (ascending) and then alphabetically by name.

### Ex 07 — Elm (Periodic Table)
Write `elm.rb` that reads `periodic_table.txt` and generates a W3C-valid `periodic_table.html`. Represent each element in a 'box' within a table following the Mendeleïev layout.

---

## Module 0 — OOB

> **Theme:** Object-Oriented Programming (OOP) in Ruby: classes, inheritance, exceptions, and HTML tree modeling.

### Ex 00 — HTML (Builder pattern)
Create an `Html` class that builds an HTML file piece by piece (`head`, `body`, `dump` for `<p>` tags, and `finish` to close).

### Ex 01 — Raise HTML
Enhance the `Html` class with error handling. Raise exceptions if: a file already exists, `dump` is called without a `<body>`, or `finish` is called twice.

### Ex 02 — Rescue HTML
Implement two custom exception classes: `Dup_file` and `Body_closed`. They must include `show_state`, `correct`, and `explain` methods to fix the issue on the fly (e.g., appending `.new` to a filename or moving the `</body>` tag).

### Ex 03 — Elem
Create an `Elem` class to represent an HTML element as an object tree. Use an `add_content` method and overload `to_s` to render the HTML.

### Ex 04 — Dejavu
Create specific classes for common HTML tags (`Html`, `Head`, `Body`, `Img`, `Table`, etc.) that inherit from `Elem`.

### Ex 05 — Validation
Create a `Page` class that takes an `Elem` tree and implements `is_valid?` based on specific semantic rules (e.g., `Html` must contain exactly one `Head` then one `Body`).

---

## Module 1 — Gems

> **Theme:** Creating Ruby Gems, TDD, and a first look at Rails.

### Ex 00 — I Like (Deepthought)
Create your first Ruby Gem named `deepthought`. It must include a class that responds "42" to the ultimate question and "Mmmm i'm bored" otherwise. Use the `colorize` gem and write tests with `minitest`.

### Ex 01 — ft_wikipedia
Create a gem called `ft_wikipedia` that searches for the "Road to Philosophy" by following the first link in Wikipedia articles. Handle loops and dead ends with `StandardError`.

### Ex 02 — TDD
Implement a gem based on provided tests. You must make all 16 assertions pass to validate the exercise.

### Ex 03 — Rails (Hello World)
Install the Rails gem and create a project that displays "Hello World!" in an `<h1>` tag at the root URL (`http://localhost:3000/`).

---

## Module 1 — Base Rails

> **Theme:** Rails views, controllers, assets, and basic filepersistence.

### Ex 00 — CheatSheet
Replicate a provided command-line cheatsheet page using a Rails application named `CheatSheet`. Focus on the view and layout using Bootstrap.

### Ex 01 — Moar CheatSheet
Expand the app into `NewCheatSheet`. Implement a navigation bar and split the content into multiple independent pages (e.g., `convention`, `console`, `ruby-numbers`).

### Ex 02 — Quick Search
Integrate a jQuery plugin (like DataTables) to add a "Quick search" tab that combines all command tables from the other pages into one searchable table.

### Ex 03 — Diary (Log Book)
Add a "Log Book" tab with a form. Submissions should be appended to a file `entry_log.txt` at the root of the project with a timestamp and displayed on the page.

---

## Module 2 — SQL (SQLite & ActiveRecord)

> **Theme:** Database interactions using raw SQL (SQLite3 gem) and the Rails ORM (ActiveRecord).

### Ex 00 — CRUD starts here
Using raw SQL, implement `create_db`, `create_table` (for `clock_watch` and `race`), and `drop_table`. Store the database instance in a global variable `$db`.

### Ex 01 — Seeds and Migrations
Create standard Rails migrations for the previous tables and use a `seeds.rb` file to populate them.

### Ex 02 — Create and Read
Implement a "Start Race" button that inserts 4 runners into `clock_watch` and 1 race entry into `race` using raw SQL.

### Ex 03 — Active Record Associations
Establish relationships between `User`, `Cuicui` (tweets), `Comment`, and `Like` models using ActiveRecord macros (`has_many`, `belongs_to`).

### Ex 04 — Dynamic Creation
Implement a "Time" button to record lap split times for runners using raw SQL.

### Ex 05 — Validation
Add ActiveRecord validations to models: uniqueness of email, name length, banished names, and existence of associated IDs.

### Ex 06 — 3D (Deletion)
Implement `delete_last` and `delete_all` methods for the time stamp tables using raw SQL.

### Ex 07 — Model Methods
Implement custom instance methods in the `User` model: `fame` (sum of likes), `senior?`, `junior?`, `responses` (last 5 comments), and `top_cuicui`.

### Ex 08 — Select
Implement `all_by_name` and `all_by_race` to retrieve and sort data using raw SQL.

### Ex 09 — Scope
Implement a `top` scope in the `Cuicui` model to retrieve the most liked posts.

---

## Module 3 — Sessions

> **Theme:** Authentication, Authorization, Namespacing, and Reputation systems.

### Ex 00 — It's me (Authentication)
Create a custom authentication system (no external gems) with Registration, Login, and Logout. Anonymous users get a random animal name stored in a cookie.

### Ex 01 — Add me in (Admin Namespace)
Implement an admin interface at `/admin/users` using namespaced controllers and routes. Admins can edit/delete any user.

### Ex 02 — Need an account (Restricted Posts)
Create a "Life Pro Tips" post system. Only logged-in users can view full post content. Admins get an `/admin/posts` dashboard.

### Ex 03 — Peer edit
Track and display the last editor and modification time for each post.

### Ex 04 — UvDv (Votes)
Implement an Up-vote/Down-vote system. Votes must be ActiveRecord objects. Add an admin interface to manage/delete votes.

### Ex 05 — Can you? (Privileges)
Grant privileges based on a "Reputation" points system (Upvotes - Downvotes). Users unlock abilities like up-voting (2-3 pts), down-voting (4-5 pts), and editing others' posts (>5 pts).

---

## Module 3 — Advanced

> **Theme:** Production tools: PostgreSQL, Devise, Carrierwave, RailsAdmin, and CanCanCan.

### Ex 00 — PostgreSQL
Setup the project `acme` to use PostgreSQL instead of SQLite and deploy it to a hosting service.

### Ex 01 — You Sir? (Devise)
Integrate the `devise` gem to handle user authentication, including custom fields like `bio`.

### Ex 02 — Get me something to sell
Implement product and brand management. Use `carrierwave` for file uploads and `cloudinary` for remote image storage (CDN).

### Ex 03 — Cart
Build a shopping cart system using `Cart` and `CartItem` models. Use a "Concern" to manage the current cart via `session_id`.

### Ex 04 — One Panel to Rule Them All
Integrate `rails_admin` to provide a full-featured dashboard for managing all database records.

### Ex 05 — One Account to Rule Them All
Implement Role-Based Access Control (RBAC) using `cancancan` and `rolify`. Define "administrator" and "moderator" roles.

### Ex 06 — Show me what you got
Deploy the final application online with 2500+ seeded products and verify all features (upload, cart, roles) work in production.

---

## Module 3 — Final

> **Theme:** Front-end interactivity: AJAX and WebSockets (ActionCable).

### Ex 00 to 03 — Francis (AJAX CRUD)
Make a Book library application `Xnote`. Implement AJAX for:
- **Ex 00:** Adding a book without page refresh.
- **Ex 01:** Deleting a book.
- **Ex 02:** Editing a book name in-place.
- **Ex 03:** Updating a live "Total Books" counter.
- *Constraint:* A global `$refresh` counter in the layout must stay at 1.

### Ex 04 — ChatOne (WebSockets)
Create a real-time chat application named `Chat` using `ActionCable`. Authenticated users can post messages that appear instantly for everyone. Implement task buffering using `ActiveJob`.

### Ex 05 — ChatTwo (Rooms)
Add `ChatRoom` support. Messages are scoped to specific rooms. Room creators are the only ones allowed to delete them.

### Ex 06 — ChatThree (Notifications)
Implement a real-time notification system and sound alerts for new messages in all connected rooms. Notifications reflect messages from **other** users only.
