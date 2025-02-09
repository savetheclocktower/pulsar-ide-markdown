const Path = require('path');
const { CompositeDisposable } = require('atom');
const { AutoLanguageClient } = require('@savetheclocktower/atom-languageclient');

const ROOT = Path.normalize(Path.join(__dirname, '..'));

const SCOPES = Object.freeze(['source.gfm', 'text.html.markdown']);

class MarkdownLanguageClient extends AutoLanguageClient {

  getGrammarScopes () { return SCOPES; }
  getLanguageName () { return 'Markdown'; }
  getServerName () { return `Markdown LSP` }

  getPackageName () {
    return Path.basename(ROOT) ?? 'pulsar-ide-markdown';
  }

  onSpawnError (err) {
    // `atom-languageclient` seems to think it'll be able to detect failed
    // spawns in its `catch` clause. But an ordinary `spawn` that exits with a
    // non-zero code doesn't seem to do the trick, and it's not clear to me how
    // I'm meant to inform the server manager of this failure.
    //
    // Instead, I need to clear this promise from the registry or else it'll
    // hang forever and we'll never be able to restart cleanly.
    this._serverManager._startingServerPromises.clear();

    // If we failed to spawn the server, it's almost certainly related to the
    // server path.
    const server = this.config('server');
    const binName = server === 'Marksman' ? 'marksman' : 'md-lsp'
    this.errorNotification = atom.notifications.addError(
      `${this.getPackageName()}: ${this.getServerName()} language server cannot start`,
      {
        description: `Make sure the path to your \`${binName}\` binary is correct.\n\nIf \`${binName}\` is in your \`PATH\` and Pulsar is not recognizing it, you may set the full absolute path to your binary in this package’s settings. Consult the README on the settings page for more information.`,
        detail: err.message,
        buttons: [
          {
            text: 'Open Settings',
            onDidClick: () => {
              atom.workspace.open(`atom://config/packages/${this.getPackageName()}`);
            }
          }
        ],
        dismissable: true
      }
    );
  }

  async restartServer () {
    this._serverManager.stopListening();
    await this._serverManager.stopAllServers();
    if (this._serverRestartTimeout) {
      clearTimeout(this._serverRestartTimeout);
      this._serverRestartTimeout = null;
    }
    // Attempt to start the server again once this function hasn't been called
    // for 1000ms.
    this._serverRestartTimeout = setTimeout(() => {
      this._serverManager.startListening();
    }, 1000);
  }

  activate (...args) {
    super.activate(...args);

    this.subscriptions = new CompositeDisposable();

    this.subscriptions.add(
      atom.config.onDidChange(`${this.getPackageName()}.server`, () => this.restartServer()),
      atom.config.onDidChange(`${this.getPackageName()}.binMarksman`, () => {
        if (this.config('server') !== 'Marksman') return;
        this.restartServer()
      }),
      atom.config.onDidChange(`${this.getPackageName()}.binMdLsp`, () => {
        if (this.config('server') !== 'md-lsp') return;
        this.restartServer()
      })
    );
  }

  destroy () {
    super.destroy(...args);
    this.subscriptions.dispose();
  }

  config (key) {
    return atom.config.get(`${this.getPackageName()}.${key}`);
  }

  getServerBinPath (server) {
    switch (server) {
      case 'Marksman':
        return this.config('binMarksman');
      case 'md-lsp':
        return this.config('binMdLsp');
      default:
        throw new Error(`Invalid server value`);
    }
  }

  startServerProcess (_projectPath) {
    const server = this.config('server');
    let bin = this.getServerBinPath(server);
    return super.spawn(bin, [], {
      cwd: atom.project.getPaths[0] || __dirname
    });
  }

  postInitialization (server) {
    // Ordinarily we'll just assume the server started successfully and that it
    // isn't worth informing the user about. But if the server was previously
    // in an error state…
    if (this.errorNotification) {
      // …dismiss that old notification (if it's still present)…
      this.errorNotification.dismiss();
      // …and tell the user that it's been fixed.
      atom.notifications.addSuccess(
        `${this.getPackageName()}: ${this.getServerName()} started`
      );
      this.errorNotification = null;
    }

    this._server = server;
  }

  // DIAGNOSTICS
  // ===========

  shouldIgnoreMessage (diagnostic, _editor, _range) {
    // This lets us set a scope-specific override to the `enable` setting. It
    // also saves the user from having to restart before changing this setting
    // takes effect.
    let settings = this.config('diagnostics');
    if (!settings.enable) return true;

    let code = diagnostic.code ? String(diagnostic.code) : null;

    let ignoredCodes = [...settings.ignoredCodes];
    if (ignoredCodes.includes(code)) return true;

    return false;
  }

  transformMessage (message, diagnostic, _editor) {
    let settings = this.config('diagnostics');
    let { code } = diagnostic;
    if (code && settings.includeMessageCodeInMessageBody) {
      message.excerpt = `${message.excerpt} (${diagnostic.code})`;
    }
  }

}

module.exports = new MarkdownLanguageClient();
