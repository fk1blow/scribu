export const languages = [
  {
    name: "Markdown",
    filename: "README.md",
    text: `# what do i need

1. want to get rid of the underlines from headlines
2. use different font for fenced code blocks
3. headings sizes(h1-h6)
4. use writing fonts(non-monospaced)
5. save to indexedDB
6. sync to a server(great success)
7. centered layout

## some other stuff

syncing to/with a server is __not mandatory__, for now, but ==highly useful==

centered layout is a _must_
---

# heading1
## heading2
### heading3
#### heading4
##### heading5
###### heading6

there should be inline code \`export function getTheme(codemirror: Bundle, kind: "light" | "dark"): Theme {\` and after it

\`\`\`js
const cema = function() {
this.somethine =
}
\`\`\`
`,
  },

  {
    name: "Python",
    filename: "server.py",
    text: `from flask import Flask
app = Flask('app')

@app.route('/')
def hello_world():
  return 'Hello, World!'

app.run(host='0.0.0.0', port=8080)`,
  },

  {
    name: "JavaScript",
    filename: "index.js",
    text: `const crypto = require('crypto');
const alice = crypto.getDiffieHellman('modp5');
const bob = crypto.getDiffieHellman('modp5');

alice.generateKeys();
bob.generateKeys();

const alice_secret = alice.computeSecret(
    bob.getPublicKey(), null, 'hex'
);
const bob_secret = bob.computeSecret(
    alice.getPublicKey(), null, 'hex'
);

// alice_secret and bob_secret should be the same
console.log(alice_secret == bob_secret);`,
  },
  {
    name: "CSS",
    filename: "style.css",
    text: `body {
color: red;
}
main {
  display: flex;
  }
.nav {
  justify-content: flex-start;
}
    `,
  },
]
