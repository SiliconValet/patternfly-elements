import { storiesOf } from "@storybook/polymer";
import {
  withKnobs,
  text,
  select,
} from "@storybook/addon-knobs/polymer";
import "../pfe-comments.js";

const stories = storiesOf("Comments", module);
stories.addDecorator(withKnobs);

stories.add("pfe-comments", () => {
  const nodeOptions = {
    "637583": 637583,
    "11025": 11025
  };

  document.addEventListener("pfeconfig-query", function(e) {
    e.path[0].config = {
      "pfeComments": {
        "rest": {
          "create": "http://10.254.254.254/api/redhat_comments",
          "read":   "http://10.254.254.254/api/redhat_comments",
          "index":  "http://10.254.254.254/api/redhat_comment.json",
          "update": "http://10.254.254.254/api/redhat_comments",
          "delete": "http://10.254.254.254/api/redhat_comments"
        }
      }
    };
    console.log("Caught event in setup, attempting to respond.");
  });


  let nodeSelect = select("Node", nodeOptions, "11025");
  let pageSelect = text("Page", "1");
  let perPageSelect = text("Num per page", "6");

  return `

  <section>
    <h2>Comments PFElement</h2>
    <pfe-comments
      page-id="${nodeSelect}"
      id="rhpage-comments"
      page="${pageSelect}"
      page-size="${perPageSelect}"
      show-pager="0"
      load-more="0"
    ></pfe-comments>
  </section>
  <section>
    <h2>Markup</h2>
    <pre><code>&lt;pfe-comments
      page-id=&quot;${nodeSelect}&quot;
      id=&quot;rhpage-comments&quot;
      page=&quot;${pageSelect}&quot;
      page-size=&quot;${perPageSelect}&quot;
      show-pager=&quot;0&quot;
      load-more=&quot;0&quot;
    &gt;&lt;/pfe-comments&gt;</code></pre>
  </section>

  `;
});
