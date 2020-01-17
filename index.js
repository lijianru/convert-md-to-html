import * as readme from './README.md'
import "./theme.css";

const root = document.getElementById('root');

root.innerHTML = `<h1 id="readme">Readme.md</h1><div>${readme}</div>`
