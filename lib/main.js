const Path = require('path');
const { AutoLanguageClient } = require('@savetheclocktower/atom-languageclient');

const ROOT = Path.normalize(Path.join(__dirname, '..'));

const SCOPES = Object.freeze(['source.gfm', 'text.html.markdown']);

class MarkdownLanguageClient extends AutoLanguageClient {
  getGrammarScopes () { return SCOPES; }
  getLanguageName () { return 'Markdown'; }
  getServerName () { return 'md-lsp'; }

  getPackageName () {
    return Path.basename(ROOT) ?? 'pulsar-ide-markdown';
  }

  activate (...args) {
    super.activate(...args);
  }

  startServerProcess (_projectPath) {
    const bin = atom.config.get(`${this.getPackageName()}.serverBin`);
    return super.spawn(bin, [], {
      cwd: atom.project.getPaths[0] || __dirname
    });
  }
}

module.exports = new MarkdownLanguageClient();
