---
name: codegraph
description: Use CodeGraph tool or CLI command (`codegraph explore`) before exploring, grepping, finding, or reading files when analyzing a codebase.
---

# CodeGraph Exploration Skill

## When to Use
Use this skill whenever you need to explore files, locate symbols, understand code relationships, or answer questions about code architecture in a repository indexed by CodeGraph (where a `.codegraph/` directory exists).

## Instructions

1. **Check for CodeGraph Index**:
   - Verify if `.codegraph/` exists at the root of the workspace.
   - If `.codegraph/` does NOT exist, skip CodeGraph and fall back to standard search tools.

2. **Explore using CodeGraph BEFORE standard file tools**:
   - Before running `grep_search`, `list_dir`, or `view_file` to locate symbols or explore code structures, execute CodeGraph search:
     - **MCP Tool** (if available): Call `codegraph_explore` with symbol names or architectural questions.
     - **Shell Command**: Run `codegraph explore "<symbol names or question>"` via `run_command`.

3. **Analyze & Follow Up**:
   - Review verbatim source lines and call relationships output by CodeGraph.
   - Load deferred symbols by name if needed.
   - Use standard file tools only when targeted file inspection is required after CodeGraph analysis.
