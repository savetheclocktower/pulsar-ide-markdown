# pulsar-ide-markdown

An IDE provider package for Markdown.

Taps into an installation of [`md-lsp`](https://github.com/matkrin/md-lsp) — which **you must install on your own**. Follow the link for installation instructions.

## Configuration

Install `md-lsp`, then point the “Path to `md-lsp`” setting (`pulsar-ide-markdown.serverBin`) to the absolute path to your `md-lsp` executable. (The default value of `md-lsp` may work if it’s already in your `PATH`.)

## What does this package do?

Install this package, then install any of the following packages to get special features. (Not all of these have been extensively tested; file a bug if any don’t work as expected.)

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
