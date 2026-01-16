# True Ralph Loop - Iteration Task

You are in a True Ralph Loop iteration. Each iteration runs in a FRESH Claude session.
Your memory is ONLY what's in the filesystem - PRD.md, PROGRESS.md, and git history.

## Step 1: Understand Current State (REQUIRED)

Read these files to understand where we are:
```bash
cat docs/PROGRESS.md
cat docs/PRD.md
git log --oneline -5 2>/dev/null || echo "Not a git repo"
git status -s 2>/dev/null || echo "Not a git repo"
```

## Step 2: Execute ONE Task

1. Find the current "In Progress" task in PROGRESS.md
2. If none, pick the first unchecked task from PRD.md
3. Implement it COMPLETELY:
   - NO placeholders or TODOs
   - NO "implement later" comments
   - Full, working implementation
4. Write tests if the PRD specifies testing requirements

## Step 3: Update Files (REQUIRED)

After completing the task:

1. **Update PRD.md**: Mark the task as done with `[x]`
2. **Update PROGRESS.md**:
   - Move completed task to "Completed" section with commit hash
   - Move next pending task to "In Progress"
   - Update "Quick Context" section at top
   - Add entry to "Session History" table

## Step 4: Commit Changes

If this is a git repository:
```bash
git add -A
git commit -m "feat: [brief description of what was implemented]"
```

## Step 5: Exit

When done with ONE task, simply finish your response.
A fresh session will handle the next task.

## Completion Signal

If ALL tasks in PRD.md are marked with `[x]`:
Output exactly this text: <promise>PRD_COMPLETE</promise>

## If Stuck

- Document the blocker in PROGRESS.md under "Known Issues / Workarounds"
- Try an alternative approach
- After 3 attempts on the same task, add to "Blockers" and move to next task
- Do NOT output false completion promises

## CRITICAL RULES

1. Do ONE task only - not more, not less
2. Update BOTH PRD.md AND PROGRESS.md
3. Full implementations - no shortcuts
4. Commit your changes
5. Be honest about completion status

BEGIN: Read PROGRESS.md first to understand current state.
