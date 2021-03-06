Panel text editor via [CodeMirror](http://codemirror.net/) for Illustrator, Photoshop and After Effects.

## Run and save snippets within the host app:
![Saving and running snippets](https://thumbs.gfycat.com/IncompleteImpracticalDuiker-size_restricted.gif)

## With error detection and warnings:
![Automatic error warnings](https://thumbs.gfycat.com/AcclaimedColossalGermanpinscher-size_restricted.gif)

`console(code)` will evaluate `code` and return the result to the bottom display.

`JSXEvent(data, name)` will send the `data` back to JavaScript as a named CSEvent.

[See eventManager for demonstration of Events](https://github.com/Contactician/eventManager):

Event `'com.playwrite.console'` evaluates and displays `data` in the panel console.

Event `'com.playwrite.error'` parses error messages from `data` and updates console.

Event `'com.playwrite.write'` inserts `data` at the current cursor location.

Currently only runs .jsx with limited syntax highlighting via CodeMirror's Javascript mode, has [internal hotkeys](http://codemirror.net/doc/manual.html#commands) and multiple [addons](http://codemirror.net/doc/manual.html#addons).
