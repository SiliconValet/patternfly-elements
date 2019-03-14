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
    "11025": "20 comments (11025)",
    "637583": "Two pages, mixed (637583)",
    "11258": "LOTS of comments (11258)"
  };

  document.addEventListener("pfeconfig-query", function (e) {
    console.log("Caught event in setup, attempting to respond.");

    e.path[0].config = {
      "pfelements": {
        "host": 'http://localhost',
        "user": {
          "username": 'jason.smith',
          "firstname": 'Jason',
          "lastname": 'Smith',
          "uid": '12345'
        }
      },
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
  });


  let nodeSelect = select("Node", nodeOptions, "11025");
  // @TODO: This is not yet implemented.
  //let pageSelect = text("Page", "1");
  // @TODO: This is not yet implemented.
  //let perPageSelect = text("Num per page", "6");

  return `

  <section>
    <h2>Comments PFElement</h2>
    <pfe-comments
      page-id="${nodeSelect}"
      id="rhpage-comments"
      load-more="0"
    ></pfe-comments>
  </section>
  <section>
    <h2>Markup</h2>
    <pre><code>&lt;pfe-comments
      page-id=&quot;${nodeSelect}&quot;
      id=&quot;rhpage-comments&quot;
      load-more=&quot;0&quot;
    &gt;&lt;/pfe-comments&gt;</code></pre>
  </section>

  `;
});
