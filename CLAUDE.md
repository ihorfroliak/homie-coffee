# Claude Code instructions for Homie Coffee

Follow `AGENTS.md`; it is the shared policy for Claude Code, Codex and humans.

At task start read `docs/homie-coffee/01-assumptions-questions-decisions.md`,
`docs/homie-coffee/17-agent-interop.md` and `docs/homie-coffee/HANDOFF.md`, then inspect the
repository and `git log`.

Claude Code owns specification and review in this project, not implementation. Do not write the
production application. Do not select a technology without a documented comparison. Do not state
a market fact without a source, a publication date and an access date in
`docs/homie-coffee/sources.md`.

At task end append a verified-facts-only entry to `docs/homie-coffee/HANDOFF.md`: commit SHA,
files changed, commands run and their actual output, what was not done and why, next owner,
next action.
