/*
 * Copyright 2018 Red Hat, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/**
 * PfeComments web component.
 */

/* Import base component. */
import PFElement from '../pfelement/pfelement.js';

/**
 * Import dependency components.
 */
/**
 * Creates a new PfeComments element.
 * @class
 */
class PfeComments extends PFElement {

  /**
   * Getter for the tag name.
   *
   * @static
   * @returns {string} - Name of the element.
   */
  static get tag() {
    return "pfe-comments";
  }

  /**
   * Getter for config
   *
   * @returns {*} - Configuration object.
   */
  get config() {
    return this._config;
  }

  /**
   * Setter for config object.
   *
   * @param value
   */
  set config(value) {
    this._config = value;

    /* If rest data is provided, do the async calls */
    if (this._config.pfeComments.rest) {
      console.log("Calling getCommentData from the config setter.");
      this.getCommentData(this);
    } else {
      console.log("Not enough data present in config to perform rest calls.");
    }
  }

  /**
   * Getter for comment data.
   *
   * @returns {*} - Array of comment data.
   */
  get commentData() {
    return this._commentData;
  }

  /**
   * Setter for comment data.
   *
   * @return {object} - Comment data object.
   */
  set commentData(value) {
    this._commentData = value;
  }

  /**
   * Getter for page.
   *
   * @return {number} - Page of results, starts at 1.
   */
  get page() {
    if (!this._page) {
      if (this.hasAttribute("page")) {
        this._page = this.getAttribute("page");
      } else {
        this._page = 0;
      }
    }

    return this._page;
  }

  /**
   * Setter for page.
   *
   * @param value - Page of results, starts at 1.
   */
  set page(value) {
    this._page = value;
  }

  /**
   * Getter for page size.
   *
   * @returns {*|number} - Number of items per page.
   */
  get pageSize() {
    if (!this._page_size) {
      if (this.hasAttribute("page-size")) {
        this._page_size = this.getAttribute("page-size");
      } else {
        this._page_size = 20;
      }
    }

    return this._page_size;
  }

  /**
   * Setter for page size.
   *
   * @param value - Number of items per page.
   */
  set pageSize(value) {
    this._page_size = value;
  }

  /**
   * Getter for templateUrl.
   *
   * @returns {string} - Path to the template.
   */
  static get templateUrl() {
    return "pfe-comments.html";
  }

  /**
   * Getter for styleUrl.
   *
   * @returns {string} - Path to the sass.
   */
  static get styleUrl() {
    return "pfe-comments.scss";
  }

  /**
   * Getter for the page ID.
   *
   * @returns {number} - The page ID of interest.
   */
  get pageId() {
    if (!this._pageId) {
      if (this.hasAttribute("page-id")) {
        this._pageId = this.getAttribute("page-id");
      } else {
        this._pageId = null;
      }
    }
    return this._pageId;
  }

  /**
   * Setter for the page ID.
   *
   * @param {value} - The page ID of interest.
   */
  set pageId(value) {
    this._pageId = value;
  }

  /**
   * Represents the PfeComments tag.
   *
   * @constructor
   */
  constructor() {
    super(PfeComments, { delayRender: true });
  }

  /**
   * Parse comment data and transform as appropriate.
   */
  parseCommentData(data) {
    /* If we need to merge data */
    if (this.commentData && this.commentData.length >= 0) {
      /* Walk the comments and merge in the values */
      console.log("Doing merge");
      this.mergeComments(data.comments);
    } else {

      this.commentData = data;

      /* Create a flat model, so we can easily update it. */
      this.flatComments = [];
      this.flattenComments(this.commentData.comments);
    }

    /* Can't simply use .length since the array is sparse. Though I gotta admit, this is just silly. */
    this.commentCount = this.flatComments.reduce(x => x + 1, 0);

    this.renderedComments = PfeComments.renderComments(
      this.commentData.comments,
      this.commentData.profiles,
      this
    );

    this.render();
  }

  /**
   * Flatten the nested JSON response into an index.
   *
   * @param {array} comments
   */
  flattenComments(comments) {
    for (let i in comments) {
      if (comments.hasOwnProperty(i)) {
        this.flatComments[comments[i].cid] = comments[i];
        if ("children" in comments[i] && comments[i].children.length > 0) {
          this.flattenComments(comments[i].children);
        }
      }
    }
  }

  /**
   * Merge in new comments, relies on the flatComments index.
   *
   * @param {array} comments
   */
  mergeComments(comments) {
    if (!this.flatComments) {
      return this.parseCommentData(comments);
    }
    for (let i in comments) {
      if (comments.hasOwnProperty(i)) {
        /* If the comment already exists in flat, merge the children. */
        if (comments[i].cid in this.flatComments) {
          /* Comment exists, nothing to do but merge children (if available) */
          if ("children" in comments[i]) {
            this.mergeComments(comments[i].children);
          }
        } else {
          /* Check if the comment has a parent. */
          if (comments[i]["pid"] !== 0) {
            /* Validate that the children array exists */
            if (!("children" in this.flatComments[comments[i].pid])) {
              this.flatComments[comments[i].pid].children = [];
            }

            /* The comment has a parent, we can just add it to flat and call it a day. */
            this.flatComments[comments[i].pid].children.push(comments[i]);
            this.flatComments[comments[i].cid] = comments[i];
          } else {
            /* New top level comment. */
            this.commentData.push(comments[i]);
            this.flatComments[comments[i].cid] = this.commentData[
              this.commentData.length - 1
            ];
          }

          /* If there are children, process them as well. */
          if ("children" in comments[i] && comments[i].children.length > 0) {
            this.flattenComments(comments[i].children);
          }
        }
      }
    }
  }

  /**
   * Build the nested array of comment components and append to DOM provided.
   *
   * This function is idempotent with respect to the input. If you update the data
   * with additional entries, only those additional entries will be created.
   *
   * @param comments
   *   Source nested array of comments.
   * @param profiles
   *   Source profile data.
   * @param parent
   *   DOM element to inject into.
   *
   * @returns {*} - DOM element after injection.
   */
  static renderComments(comments, profiles, parent) {
    for (let i = 0; i < comments.length; i++) {
      let comment = comments[i];

      if (!("rhelement" in comment)) {
        let rhElement = document.createElement("pfe-comments-comment");

        /* If comment has flags, add a class to help with styling */
        comment.classes = "";
        if (comment.flags) {
          for (i = 0; i < comment.flags.length; i++) {
            comment.classes += " " + comment.flags[i] + "-comment-wrapper";
          }
        }

        /* Each comment has an individually addressable ID */
        rhElement.setAttribute("id", "comment-" + comment.cid);

        rhElement.commentData = {
          comment: comment,
          profiles: profiles
        };
        parent.appendChild(rhElement);

        comment.rhelement = rhElement;
      }

      if ("children" in comment) {
        PfeComments.renderComments(
          comment.children,
          profiles,
          comment.rhelement
        );
      }
    }
    return parent;
  }

  /**
   * Fetch the comment data.
   */
  getCommentData(scope) {
    console.log("Fetching page " + scope.page + " of size " + scope.pageSize);
    const xhr = new XMLHttpRequest();

    xhr.onload = function() {
      scope.parseCommentData(JSON.parse(this.responseText));
    };
    xhr.open(
      "GET",
      this.config.pfeComments.rest.index +
        "?nid=" + scope.pageId +
        "&page=" + scope.page +
        "&pagesize=" + scope.pageSize
    );
    xhr.send();
  }

  /**
   * Called when an attribute is changed on the component.
   *
   * @param {string} attr - Name of the attribute.
   * @param oldVal - The old value of the attribute.
   * @param newVal - The new value of the attribute.
   */
  attributeChangedCallback(attr, oldVal, newVal) {
    super.attributeChangedCallback(attr, oldVal, newVal);
console.log("Attribute "+attr+" changed to " +newVal);

    switch (attr) {
      case "page":
        this.page = newVal;
        break;

      case "pagesize":
        this.pageSize = newVal;
        break;
    }
  }

  /**
   * Called when the tag is processed in the DOM.
   *
   * @callback
   */
  connectedCallback() {
    super.connectedCallback();
    // Send a request for configuration event.
    console.log("throwing pfeconfig-query event");
    this.dispatchEvent(
      new Event("pfeconfig-query", {
        bubbles: true,
        composed: true,
        detail: "pfe-comments",
        element: this
      })
    );

    /* If the data is available to us as a var, we just parse and display it. */
    // if (this.hasAttribute('data-from')) {
    //   console.log('Reading data from attribute');
    //   this.parseCommentData(eval(this.getAttribute('data-from')));
    // }
    // else {
    //   console.log('Reading data from REST call.');
    //   this.getCommentData(this, 0, 5);
    // }
  }
}

/**
 * Creates a new PfeCommentsComment element.
 * @class
 */
class PfeCommentsComment extends PFElement {
  static get tag() {
    return "pfe-comments-comment";
  }

  static get templateUrl() {
    return "pfe-comments-comment.html";
  }

  static get styleUrl() {
    return "pfe-comments.scss";
  }

  constructor() {
    super(PfeCommentsComment, { delayRender: true });
  }

  /**
   * Called when the tag is processed in the DOM.
   *
   * @callback
   */
  connectedCallback() {
    this.comment = this.commentData.comment;
    this.profiles = this.commentData.profiles;

    /* Transform badges for display */
    for (let i in this.profiles) {
      if (this.profiles.hasOwnProperty(i)) {
        // @todo: Need to revisit this.
        let profile = this.profiles[i];
        profile.badges_rendered = "";
        for (let j in profile.badges) {
          if (profile.badges.hasOwnProperty(j)) {
            profile.badges_rendered += `<span class="badge badge-${
              profile.badges[j].badge_id
            } community-leader">${profile.badges[j].badge_name}</span>`;
          }
        }
      }
    }

    this.render();
  }
}

/**
 * Creates a new PfeCommentsForm element.
 * @class
 */
class PfeCommentsForm extends PFElement {
  static get tag() {
    return "pfe-comments-form";
  }

  static get templateUrl() {
    return "pfe-comments-form.html";
  }

  static get styleUrl() {
    return "pfe-comments.scss";
  }

  constructor() {
    super(PfeCommentsForm, { delayRender: true });
  }
}

PFElement.create(PfeComments);
PFElement.create(PfeCommentsComment);
PFElement.create(PfeCommentsForm);

/** PfeComments tag */
export default PfeComments;
