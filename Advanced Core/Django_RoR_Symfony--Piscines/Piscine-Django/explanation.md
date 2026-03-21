# Piscine Django — Exercise Breakdown

A comprehensive summary of what is required for every exercise across all 9 modules of the Python-Django Piscine.

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

> **Theme:** Python fundamentals: variables, types, data structures (lists, dicts), and file I/O.

### Ex 00 — My First Variables
Create `var.py` with a function `my_var()` that declares 9 variables of different types (int, str, float, bool, list, dict, tuple, set) and prints their values along with their types using `type()`.

### Ex 01 — Numbers
Write `numbers.py` to read a file `numbers.txt` (comma-separated numbers from 1 to 100) and print each number on a new line without commas.

### Ex 02 — My First Dictionary
Write `var_to_dict.py` to convert a provided list of tuples `(musician_name, birth_year)` into a dictionary where the year is the key and the musician name(s) are the values. Print the dictionary in a clear format.

### Ex 03 — Key Search
Write `capital_city.py` which takes a state name as a command-line argument and prints its capital city using provided dictionaries. Handle "Unknown state" cases.

### Ex 04 — Search by Value
Write `state.py` (the inverse of Ex 03) which takes a capital city as an argument and prints the corresponding state. Handle "Unknown capital city" cases.

### Ex 05 — Search by Key or Value
Write `all_in.py` that takes a comma-separated string of expressions and, for each, identifies if it is a state, a capital city, or neither. Ignore case and multiple spaces.

### Ex 06 — Dictionary Sorting
Write `my_sort.py` to sort musicians from a provided dictionary first by birth year (ascending) and then alphabetically by name for those born in the same year. Print only the names.

### Ex 07 — Periodic Table
Write `periodic_table.py` that reads `periodic_table.txt` and generates a W3C-valid `periodic_table.html`.
- **Constraint:** The HTML must feature a table where each element is in its own "box" with its title (`h4`), atomic number, symbol, and mass. It must respect the actual Mendeleïev Table layout (empty boxes where necessary).

---

## Module 0 — OOB

> **Theme:** Object-Oriented Programming (OOP) in Python: inheritance, classes, exceptions, and HTML tree modeling.

### Ex 00 — Conquering Silicon Valley (Template Engine)
Build `render.py`, a script that takes a `.template` file as an argument, replaces placeholders (e.g., `{name}`) with values from `settings.py`, and writes the output to an `.html` file. Handle file extensions and error cases.

### Ex 01 — Innovating Start-up (Intern Class)
Create an `Intern` class with a default name "nobody" and a `make_coffee()` method that returns a `Coffee` instance. Include a `work()` method that raises a basic `Exception`.

### Ex 02 — 5 Classes 1 Cup (Inheritance)
Implement a `HotBeverage` base class (price, name, description) and derived classes: `Coffee`, `Tea`, `Chocolate`, and `Cappuccino`. Use the DRY principle.

### Ex 03 — Glorious Coffee Machine
Build a `CoffeeMachine` class that can `serve()` a drink (returning the requested drink or an `EmptyCup` randomly) and breaks down after 10 servings, requiring a `repair()` method call. Handle a custom `BrokenMachineException`.

### Ex 04 — A Basic Class ft. RMS (HTML Elem)
Implement an `Elem` class to represent an HTML element. It should handle tags, attributes, and nested content (both text and other `Elem` instances). Include a `__str__()` method to render the HTML.

### Ex 05 — Create Your Own Elements!
Create specific classes for common HTML tags (`html`, `head`, `body`, `table`, `tr`, `p`, etc.) that inherit from `Elem`. Prohibit direct instantiation of the `Elem` class.

### Ex 06 — Validation
Create a `Page` class that takes an `Elem` tree and implements `is_valid()`.
- **Validation Rules:** Check root structure (`html` -> `head` -> `body`), tag nesting rules (e.g., `p` can only contain text), and tag-specific constraints (e.g., `ul`/`ol` can only contain `li`).

---

## Module 1 — Lib

> **Theme:** Working with Python libraries, virtual environments, APIs, and a first look at Django.

### Ex 00 — Antigravity (Geohashing)
Write `geohashing.py` that takes coordinates and a date as arguments to calculate a geohash using the `antigravity` module's logic.

### Ex 01 — Pip (Path Library)
Create a shell script `my_script.sh` that installs the `path` library into a local folder (`local_lib`) and runs a `my_program.py` which uses that library to create/read a file.

### Ex 02 — Request an API (Wikipedia)
Write `request_wikipedia.py` to take a search string, query the Wikipedia API, and save the plain text content (no JSON or Wiki markup) to a `.wiki` file.

### Ex 03 — HTML Parser (Roads to Philosophy)
Write `roads_to_philosophy.py` to trace the path from a given Wikipedia article to the "Philosophy" article by following the first non-italicized, non-bracketed link in the introduction. Use `BeautifulSoup` for parsing. Handle infinite loops and dead ends.

### Ex 04 — Virtualenv
Create a script `my_script.sh` that sets up a Python 3 virtual environment (`django_venv`) and installs `django` and `psycopg2`.

### Ex 05 — Hello World
Create a basic Django project that displays "Hello World!" at the `/helloworld` URL.

---

## Module 1 — Base Django

> **Theme:** Core Django concepts: project/app structure, URLs, views, templates (DRY), forms, and settings.

### Ex 00 — First Static Page
Create a Django project `d05` and an app `ex00`. Set up a page at `/ex00` that displays a "Markdown Cheatsheet" using a template named `index.html`.

### Ex 01 — A Few More Pages (Template Inheritance)
In app `ex01`, create three pages (`/django`, `/display`, `/templates`) using a `base.html` template for inheritance. Implement a navigation bar in `nav.html` and alternate CSS files (`style1.css`, `style2.css`) using template blocks.

### Ex 02 — First Form (Persistence without Models)
In app `ex02`, create a page with a simple text form. On submission, append the input and a timestamp to a log file defined in `settings.py`. Display the history of entries on the same page. Data must be persistent across server restarts.

### Ex 03 — Fifty Shades of Colors
In app `ex03`, generate a 4x50 table of color shades (Black, Red, Blue, Green) where the background colors are computed dynamically in the view and passed to the template. Use loops in Twig and avoid hard-coding color values.

---

## Module 2 — SQL (ORM & Raw SQL)

> **Theme:** Database interactions using both raw SQL (`psycopg2`) and the Django ORM.

### Ex 00 — SQL Building a Table
Create a view `/ex00/init` that uses raw SQL to create a table `ex00_movies` in a PostgreSQL database (`djangotraining`).

### Ex 01 — ORM Building a Table
Create a Django model `Movies` in app `ex01` with the same fields as the previous exercise (title, episode_nb as primary key, director, etc.).

### Ex 02 — SQL Data Insertion
In app `ex02`, create views to `/init` the table, `/populate` it with specific Star Wars data using raw SQL, and `/display` the data in an HTML table.

### Ex 03 — ORM Data Insertion
In app `ex03`, replicate Ex 02 using ONLY the Django ORM.

### Ex 04 — SQL Data Deleting
In app `ex04`, add a `/remove` view that displays a dropdown of movie titles. Selecting one and submitting deletes the entry from the database using raw SQL.

### Ex 05 — ORM Data Deleting
Replicate Ex 04 in app `ex05` using the Django ORM.

### Ex 06 — SQL Data Updating
In app `ex06`, create a `/update` view to modify the `opening_crawl` of a selected movie.
- **SQL Challenge:** Implement a PostgreSQL trigger to automatically update an `updated` timestamp field.

### Ex 07 — ORM Data Updating
Replicate Ex 06 in app `ex07` using the Django ORM.

### Ex 08 — SQL Foreign Key
Create two tables (`planets` and `people`) with a Foreign Key relationship using raw SQL. Populate them from provided CSV files (`planets.csv`, `people.csv`) using `copy_from`.

### Ex 09 — ORM Foreign Key
Replicate Ex 08 using Django Models and a provided JSON fixture (`ex09_initial_data.json`). Display a list of characters filtered by specific climate conditions.

### Ex 10 — ORM Many-to-Many
Implement a Many-to-Many relationship between `Movies` and `People` (characters). Create a search form to filter characters based on film release dates, planet diameter, and gender.

---

## Module 3 — Sessions

> **Theme:** User authentication, permissions, sessions, and custom user models.

### Ex 00 — Anonymous Sessions
Implement a homepage that assigns a random name (from a list of 10) to anonymous visitors. The name must be stored in the session and refresh every 42 seconds.

### Ex 01 — User Creation (Auth)
Build functional Registration, Login, and Logout pages. Use Django's authentication system and ensure users are redirected back to the homepage after logging in/out.

### Ex 02 — Our Tips!
Build a "Life Pro Tips" system. Logged-in users can post tips via a `ModelForm`. All tips (content, author, date) are listed on the homepage. Anonymous users can only view tips.

### Ex 03 — Votes (ManyToMany)
Add an Upvote/Downvote system to the tips. Use Many-to-Many fields to ensure a user can only vote once per tip (clicking again cancels the vote). Anonymous users cannot vote.

### Ex 04 — Authorizations (Permissions)
Use Django's permission system to restrict the ability to delete tips. Only users with the `delete_tip` permission or the tip's author can delete it.

### Ex 05 — Personalized Authorization
Create a custom permission `can_downvote`. Restrict the downvote button to users with this permission or the tip's author.

### Ex 06 — Automation and Reputation
Replace the default User model with a custom one. Implement a **Reputation** field:
- **Calculation:** +5 per upvote, -2 per downvote.
- **Automation:** Permissions (`can_downvote`, `delete_tip`) are automatically granted or revoked based on reaching reputation thresholds (15 and 30 points).

---

## Module 3 — Advanced

> **Theme:** Generic Views, Class-Based Views (CBV), custom template tags, filters, and internationalization.

### Ex 00 to 02 — Model Building & CBV
Build a multi-user site for publishing articles. Use **only Generic Class-Based Views** (`ListView`, `DetailView`, `CreateView`, `FormView`). Implement features: listing all articles, viewing user-specific publications, adding articles to a "Favourites" list, and registration/login.

### Ex 03 — Template Tags and Filters
Create a global sidebar menu visible on every page. Use custom template tags and filters to:
- Truncate article synopses to 20 characters.
- Display "time since publication" for each article.

### Ex 04 — Bootstrap
Style all menus and forms using the Bootstrap framework to match a provided design.

### Ex 05 — Internationalization (i18n)
Enable multi-language support (English by default + one other). Use URL prefixes (e.g., `/en/articles` vs `/fr/articles`) and provide a language switcher in the menu.

### Ex 06 — Testing
Write comprehensive tests (`tests.py`) to verify:
- Access control for favorites and publication views.
- Redirection of logged-in users from the registration page.
- Prevention of duplicate entries in the favorites list.

---

## Module 3 — Final

> **Theme:** Real-time communication: AJAX and WebSockets with Django.

### Ex 00 — AJAX My Formula!
Build a login/logout system that communicates **only via AJAX**. The page must switch between the login form and the "Logged as <user>" display without any page refresh. Handle form errors dynamically.

### Ex 01 — Basic Chat (WebSockets)
Create a chat system with multiple "chatrooms" stored in the database. 
- **Constraint:** Use WebSockets for real-time messaging. When a user joins or posts, all connected clients in that room must see the update instantly.

### Ex 02 to 04 — Chat Enhancements
Improve the chat system with:
- **Ex 02:** Message history (show the last 3 messages when joining).
- **Ex 03:** A live-updating list of connected users in the room.
- **Ex 04:** A fixed-size message container with automatic scrolling to the bottom.
