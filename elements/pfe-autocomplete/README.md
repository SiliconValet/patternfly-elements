# PFElements Autocomplete Element

<pfe-autocomplete> is a Web Component that provides options in a dropdown list as user types in an input box by showing result from an api call.

## Install
```
npm install @patternfly/cp-theme
npm install @patternfly/pfe-autocomplete
```

cp-theme is a package that contains css variables setting that is used for theming patternfly elements.

Once installed, import it to your application:
```
import '@patternfly/cp-theme.umd.js';
import '@patternfly/pfe-autocomplete.umd.js';
```

## Usage
```
<pfe-autocomplete debounce="500" init-value="uni">
    <input placeholder="Enter Your Search Term"/>
</pfe-autocomplete>
```

## Setup

**`autocompleteRequest`**
`autocompleteRequest` is a property that is assigned a function. When user types, component calls this function.

It is called inside component but we define it outside component. First param is the typed phrase by user and second param is a callback function to send api response back to the component.

In the function, we add loading attribute then send api call.  When result is ready, we remove loading attribute and  pass the result to web component by calling callback function. Here is an example:

```
// autocomplete call
searchAutocomplete.autocompleteRequest = function(params, callback) {
  var xhr = new XMLHttpRequest();

  searchAutocomplete.setAttribute('loading', '');
  xhr.onload = function() {
    searchAutocomplete.removeAttribute('loading');

    if(xhr.status === 404) {
      callback([]);
    } else {
      const response = JSON.parse(xhr.responseText);
      const regx = new RegExp("\^" + params.query, "i");

      var responseReady = response.reduce(function(acc, item) {
        if (regx.test(item.name)) acc.push(item.name);
        return acc;
      }, []);
      callback(responseReady);
    }
  };

  const url = 'https://restcountries.eu/rest/v2/name/' + params.query;

  xhr.open('GET', url, true);
  xhr.send();
};
```

**`debounce`**
This attribute is optional. By default, It has been set tp 300ms. User may type very fast. We allow to input box value changes trigger autocomplete api call each 300ms.

**`loading`**
loading is a boolean attribute. If you add this attribute on element a loading icon is added in input box. Add this attribute before autocomplete api call and remove this attribute form element when api call response is ready.

**`init-value`**
Set this attribute when you want to set a value in input box when web component is added to page.

**`is-disabled`**
is-disabled is a boolean attribute. Add this attribute to element when you want to make the element disabled. By adding this attribute input box and buttons become disabled.

## Get selected item
User can select an item by clicking on search button, type press enter or select an item by using keyboard and press enter. The selected item can be captured by listening to an event(`pfe-search-event`) or observing attribute(`selected-value`) change.

### pfe-search-event
When user performs search, `pfe-search-event` event is fired. By listening to this event you can get selected phrase by getting `e.detail.searchValue`.

```
searchAutocomplete.addEventListener('pfe-search-event', function(e) {
  console.log('do search= ' + e.detail.searchValue);
});
```

### selected-value attribute
By observing `selected-value` attribute you can detect autocomplete selected value.

## Dependencies

Make sure you have [Polyserve][polyserve] and [Web Component Tester][web-component-tester] installed.

    npm install -g polyserve web-component-tester

## Dev

    npm start

## Test

    npm run test

## Build

    npm run build

## Demo

Run `npm start` and Polyserve will start a server and open your default browser to the demo page of the element.

## Code style

Autocomplete (and all PFElements) use [Prettier][prettier] to auto-format JS and JSON.  The style rules get applied when you commit a change.  If you choose to, you can [integrate your editor][prettier-ed] with Prettier to have the style rules applied on every save.

[prettier]: https://github.com/prettier/prettier/
[prettier-ed]: https://github.com/prettier/prettier/#editor-integration
[polyserve]: https://github.com/Polymer/polyserve
[web-component-tester]: https://github.com/Polymer/web-component-tester
