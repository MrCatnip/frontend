# Vanilla Registration Form

- ✅ Vanilla HTML, CSS & JavaScript, no frameworks, no build step
- ✅ Client-side validation (per-field, runs on submit + live-clears on `input`)
- ✅ File upload field with basic validation (file type + max size)
- ✅ `fetch()` JSON submission with success / error / network-failure handling
- ✅ Inline message display (per-field errors + a form-level success/error line)
- ✅ ESLint + Prettier (dev tooling only, zero runtime deps)

Demo feature: a user registration form (username / first / last name / age /
avatar) validated field-by-field, submitting JSON via `fetch` and rendering the
`{ success, message }` response inline.

**Time spent:** ~3 hrs (it's tuff without AI)

## Assumptions / Notes / About Me

_(Feel free to skip - this is just context, not part of the deliverable.)_

- **AI was used.** But just for the configuration files / README / reset.css, anything else in /src is safe.

- **About the 3h / 6h constraint** - I read it as one of two things:
  - **A) A time-pressure check** (deliver / fix bugs on a deadline). I keep the
    mental model of my projects fresh, so I don't spend more than necessary,
    including when I'm oncall at 3 AM.
  - **B) A "how much is this dude going to bill us for a simple CRUD?" check.**
    I do love min-maxing, meaning I'm spending hours cleaning code or building
    little frameworks for myself, but I don't bill for that. It always evens out
    in the long run and I get more bang for the buck.

- **Heads-up for the next round:** in case we move forward, I'll be "cheating"
  a bit - expanding this repo beforehand with common functionality so I'm ready
  for most scenarios during the tech interview.
