import * as vscode from 'vscode';
import copypaste = require('copy-paste');

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('copy-current-column-number', () => {
		let editor = vscode.window.activeTextEditor;
		if (!editor) {
			// notify the user nothing can be done without active editor
			vscode.window.showErrorMessage('No active editor found, cannot do anything.');
			return;
		}

		let cursorColumnPos = editor.selection.active.character;
		copypaste.copy(cursorColumnPos, res => {
			if (res != null) {
				// something went wrong...
				vscode.window.showErrorMessage('Could not copy: ' + res);
			}
		});
	});

	context.subscriptions.push(disposable);
}

export function deactivate() { }
