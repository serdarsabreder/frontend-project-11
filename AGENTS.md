# How We Check Projects

Projects undergo automatic verification. Tests evaluate both coding standards (via a linter) and the application’s logic. You can view the check status in your GitHub repository. Test output is available in the **Actions** tab (see the `hexlet-check` workflow) in your repository.

Along with the test results, a linter configuration file and data fixtures (used to test the program) are added. A link to download the archive is located in the **Artifacts** section on the build page.

You can read more about automatic checks [here](#).

---

## Review Process

Code is reviewed according to the points listed below. If there are serious issues at a higher level, the review stops until they are fixed.

- **User‑friendly app behavior**: error messages, button disabling, displaying ongoing processes.
- **Application state management**.
- **Correctly isolated data parsing**.
- **Handler implementation**.
- **Presentation layer organization**.

---

## Automated Checks

Automated tests verify the app’s behavior in key scenarios:

- Adding a new RSS feed and displaying a success message.
- Checking for duplicate RSS feeds.
- Validating an incorrect URL.
- Handling a link that is not an RSS feed.
- Handling network errors during feed loading.
- Displaying the list of feeds and posts after successful loading.
- Previewing a post in a modal window and toggling the “read” status.

---

## Formatting

- The `README.md` file includes **SonarQube** and **GitHub Actions** badges.
- The repository contains no unnecessary files or directories (temporary files, etc.). All irrelevant items are added to `.gitignore`.


---

## Code Requirements

- Only standard Bootstrap mechanisms are used (no overrides).
- MVC pattern is implemented in the code.
- Texts are inserted via `i18next`.
- There is no global state or access to the `window` object.
- The application build works via the `npm run build` command.

