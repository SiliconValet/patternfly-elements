import e from"../pfelement/pfelement.js";class t extends e{get html(){return'<style>:host {\n  --pfe-cta--main:                     var(--pfe-theme--color--ui-link, #06c);\n  --pfe-cta--main--hover:              var(--pfe-theme--color--ui-link--hover, #003366);\n  --pfe-cta--main--focus:              var(--pfe-theme--color--ui-link--focus, #003366);\n  --pfe-cta--main--visited:            var(--pfe-theme--color--ui-link--visited, rebeccapurple);\n  --pfe-cta--aux:                      transparent;\n  --pfe-cta--aux--hover:               transparent;\n  display: inline-block;\n  font-weight: bold; }\n  :host ::slotted(a) {\n    line-height: inherit;\n    color: var(--pfe-cta--main) !important;\n    transition: all var(--pfe-theme--animation-timing, cubic-bezier(0.465, 0.183, 0.153, 0.946)); }\n    :host ::slotted(a)::after {\n      display: block;\n      margin-left: calc(var(--pfe-theme--content-spacer, 1rem) * 0.25);\n      vertical-align: middle;\n      border-style: solid;\n      border-width: 0.313em 0.313em 0;\n      border-color: transparent;\n      border-top-color: var(--pfe-cta--main);\n      transform: rotate(-90deg);\n      display: inline-block;\n      content: ""; }\n  :host ::slotted(a:hover) {\n    color: var(--pfe-cta--main--hover) !important; }\n    :host ::slotted(a:hover)::after {\n      border-top-color: var(--pfe-cta--main--hover); }\n  :host ::slotted(a:focus) {\n    color: var(--pfe-cta--main--focus) !important; }\n    :host ::slotted(a:focus)::after {\n      border-top-color: var(--pfe-cta--main--focus); }\n\n:host([priority="primary"]) {\n  --pfe-cta--main:          var(--pfe-theme--color--ui-accent, #fe460d);\n  --pfe-cta--main--hover:   var(--pfe-theme--color--ui-accent--hover, #a42701);\n  --pfe-cta--aux:           var(--pfe-theme--color--ui-accent--text, #fff);\n  --pfe-cta--aux--hover:    var(--pfe-theme--color--ui-accent--text--hover, #fff); }\n  :host([priority="primary"]) ::slotted(a) {\n    display: inline-block;\n    padding: calc(var(--pfe-theme--container-padding, 1rem) * 0.5) calc(var(--pfe-theme--container-padding, 1rem) * 2);\n    border-radius: calc(var(--pfe-theme--ui--border-radius, 2px) * 20);\n    border: var(--pfe-theme--ui--border-width, 1px) var(--pfe-theme--ui--border-style, solid) transparent;\n    text-decoration: none;\n    line-height: 1.2;\n    border-color: var(--pfe-cta--main) !important;\n    background: var(--pfe-cta--main) !important;\n    color: var(--pfe-cta--aux) !important; }\n    :host([priority="primary"]) ::slotted(a)::after {\n      display: none; }\n  :host([priority="primary"]) ::slotted(a:hover),\n  :host([priority="primary"]) ::slotted(a:focus) {\n    border-color: var(--pfe-cta--main--hover) !important;\n    background: var(--pfe-cta--main--hover) !important;\n    color: var(--pfe-cta--aux--hover) !important; }\n\n:host([priority="secondary"]) {\n  --pfe-cta--main:          var(--pfe-theme--color--ui-base, #0477a4);\n  --pfe-cta--main--hover:   var(--pfe-theme--color--ui-base--hover, #022f40);\n  --pfe-cta--aux:           var(--pfe-theme--color--ui-base--text, #fff);\n  --pfe-cta--aux--hover:    var(--pfe-theme--color--ui-base--text--hover, #fff); }\n  :host([priority="secondary"]) ::slotted(a) {\n    display: inline-block;\n    padding: calc(var(--pfe-theme--container-padding, 1rem) * 0.5) calc(var(--pfe-theme--container-padding, 1rem) * 2);\n    border-radius: calc(var(--pfe-theme--ui--border-radius, 2px) * 20);\n    border: var(--pfe-theme--ui--border-width, 1px) var(--pfe-theme--ui--border-style, solid) var(--pfe-cta--main);\n    text-decoration: none;\n    line-height: 1.2;\n    border-color: var(--pfe-cta--main) !important;\n    background: var(--pfe-cta--aux) !important;\n    color: var(--pfe-cta--main) !important; }\n    :host([priority="secondary"]) ::slotted(a)::after {\n      display: none; }\n  :host([priority="secondary"]) ::slotted(a:hover),\n  :host([priority="secondary"]) ::slotted(a:focus) {\n    border-color: var(--pfe-cta--main--hover) !important;\n    background: var(--pfe-cta--main--hover) !important;\n    color: var(--pfe-cta--aux--hover) !important; }\n\n:host([on="dark"]) {\n  --pfe-cta--main:        var(--pfe-theme--color--text--on-dark, #fff);\n  --pfe-cta--main--hover: var(--pfe-theme--color--ui-link--on-dark--hover, #cce6ff);\n  --pfe-cta--aux:         transparent;\n  --pfe-cta--aux--hover:  transparent; }\n\n:host([on="dark"][priority="primary"]) {\n  --pfe-cta--main:        var(--pfe-theme--color--ui-accent--text, #fff);\n  --pfe-cta--main--hover: var(--pfe-theme--color--ui-accent--text--hover, #fff);\n  --pfe-cta--aux:         var(--pfe-theme--color--ui-accent, #fe460d);\n  --pfe-cta--aux--hover:  var(--pfe-theme--color--ui-accent--hover, #a42701); }\n\n:host([on="dark"][priority="secondary"]) {\n  --pfe-cta--main:        var(--pfe-theme--color--ui-base--text, #fff);\n  --pfe-cta--main--hover: var(--pfe-theme--color--ui-base--text--hover, #fff);\n  --pfe-cta--aux:         transparent;\n  --pfe-cta--aux--hover:  var(--pfe-theme--color--ui-base--hover, #022f40); }\n\n:host([color="base"]) {\n  --pfe-cta--main:        var(--pfe-theme--color--ui-base, #0477a4) !important;\n  --pfe-cta--main--hover: var(--pfe-theme--color--ui-base--hover, #022f40) !important;\n  --pfe-cta--aux:         var(--pfe-theme--color--ui-base--text, #fff) !important;\n  --pfe-cta--aux--hover:  var(--pfe-theme--color--ui-base--text--hover, #fff) !important; }\n\n:host([color="complement"]) {\n  --pfe-cta--main:        var(--pfe-theme--color--ui-complement, #464646) !important;\n  --pfe-cta--main--hover: var(--pfe-theme--color--ui-complement--hover, #131313) !important;\n  --pfe-cta--aux:         var(--pfe-theme--color--ui-complement--text, #fff) !important;\n  --pfe-cta--aux--hover:  var(--pfe-theme--color--ui-complement--text--hover, #fff) !important; }\n\n:host([color="accent"]) {\n  --pfe-cta--main:        var(--pfe-theme--color--ui-accent, #fe460d) !important;\n  --pfe-cta--main--hover: var(--pfe-theme--color--ui-accent--hover, #a42701) !important;\n  --pfe-cta--aux:         var(--pfe-theme--color--ui-accent--text, #fff) !important;\n  --pfe-cta--aux--hover:  var(--pfe-theme--color--ui-accent--text--hover, #fff) !important; }</style>\n<slot></slot>'}static get tag(){return"pfe-cta"}get styleUrl(){return"pfe-cta.scss"}get templateUrl(){return"pfe-cta.html"}constructor(){super(t)}connectedCallback(){super.connectedCallback();const e=this.children[0];e?e&&"a"!==e.tagName.toLowerCase()?console.warn("The first child in the light DOM must be an anchor tag (<a>)"):this.link=this.querySelector("a"):console.warn("The first child in the light DOM must be an anchor tag (<a>)")}disconnectedCallback(){}}e.create(t);export default t;
//# sourceMappingURL=pfe-cta.js.map
