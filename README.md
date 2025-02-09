# pulsar-ide-markdown

An IDE provider package for Markdown.

Taps into an installation of [`md-lsp`](https://github.com/matkrin/md-lsp) or [Marksman](https://github.com/artempyanykh/marksman) — which **you must install on your own**. Follow the links for installation instructions.

## Configuration

1. Install either Marksman or `md-lsp`.
2. Open the settings for this package.
3. Choose one of the two options for “Language Server” — the one corresponding to whichever server you installed.
4. Specify the path to the server in the appropriate setting — either “Path to Marksman” or “Path to md-lsp.” The default value may work if the binary is in your `PATH`; if you encounter an error on startup, you may instead want to specify the absolute path.
5. Integration into built-in packages (`autocomplete-plus` and `symbols-view`) will happen automatically. For other integrations, install some of the optional packages below.

## What does this package do?

Once your language server is installed and running, you may install any of the following packages to get special features. (Not all of these have been extensively tested; file a bug if any don’t work as expected.)

Start with these packages; they’re all builtin, actively maintained, and/or built exclusively for Pulsar:

* [autocomplete-plus](https://web.pulsar-edit.dev/packages/autocomplete-plus) (builtin)
  * Offers autocompletion of…
    * heading anchors when writing links (within the same document and other documents in the project)
    * footnote references
* [symbols-view](https://web.pulsar-edit.dev/packages/symbols-view) (builtin)
  * View and filter a list of headings in the current file
  * Jump to the document and heading referenced by an internal link (within the same document or between documents in the project)
  * Jump between link/footnote references and their definitions
* [linter](https://web.pulsar-edit.dev/packages/linter) and [linter-ui-default](https://web.pulsar-edit.dev/packages/linter-ui-default)
  * View diagnostic messages
* [intentions](https://web.pulsar-edit.dev/packages/intentions)
  * Code actions for creating/updating a table of contents in the current file
* [pulsar-find-references](https://web.pulsar-edit.dev/packages/pulsar-find-references)
  * Highlight all links that reference a heading
  * Highlight all link/footnote references that reference a definition
* [pulsar-outline-view](https://web.pulsar-edit.dev/packages/pulsar-outline-view)
  * View a hierarchical list of the file’s headings
* [pulsar-refactor](https://web.pulsar-edit.dev/packages/pulsar-refactor)
  * Rename headings, links, definitions, and footnotes while updating all associated references

For other features that don’t have equivalents above, the legacy `atom-ide` packages should also work:

* [atom-ide-outline](https://web.pulsar-edit.dev/packages/atom-ide-outline)
  * View a hierarchical list of the file’s headings
* [atom-ide-code-format](https://web.pulsar-edit.dev/packages/atom-ide-code-format)
  * Format the entire file or the selected text
* [atom-ide-definitions](https://web.pulsar-edit.dev/packages/atom-ide-definitions)
  * Jump to the definition of the symbol under the cursor
