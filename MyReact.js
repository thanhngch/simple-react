var ReactDOM = {
  _rootComponent: null,
  _element: null,
  render: function (component, element) {
    document.onreadystatechange = () => {
      if (document.readyState === 'complete') {
        ReactDOM._element = element;
        element.appendChild(component);
      }
    };
  },
  _reFocus: function() {
    // reimplement it
    // only focus on input
    var input = document.getElementById('input');
    if (input) {
      input.focus();
      input.selectionStart = input.selectionEnd = input.value.length;
    }
  },
  reRender: function() {
    if (React._root) {
      ReactDOM._element.innerHTML = '';
      ReactDOM._element.appendChild(React.createElement(...React._root));
      ReactDOM._reFocus();
    }
  }
};

var React = {
  _root: null,
  Component: class {
    constructor(props) {
      this.state = {};
      this.props = props;
    }
    setState(fSetState) {
      if (typeof fSetState == 'function') {
        let state = Object.assign({}, this.state);
        this.state = fSetState(state);
      } else {
        this.state = Object.assign(this.state, fSetState);
      }
      React.createElement = React.createElement.bind(this);
      ReactDOM.reRender();
    }
    render() {}
    componentWillUnmount() {}
    componentDidMount() {}
  },
  createElement: function (wraper, attr, ...children) {
    if (!React._root) {
      React._root = [wraper, attr].concat(children);
    }
    if (!attr) {
      attr = {};
    }
    if (typeof wraper == 'function' && this.state && this.render && this instanceof wraper) {
      if (this.componentWillUnmount) {
        this.componentWillUnmount();
      }
      if (this.componentDidMount) {
        this.componentDidMount();
      }
      return this.render();
    }
    if (typeof wraper == 'function') {
      if (children && children.length > 0) {
        attr.children = children;
      }
      var component = new wraper(attr);
      
      let element = null;
      if (component.render) {
        element = component.render();
      } else {
        element = component;
      }
      if (component.componentDidMount) {
        component.componentDidMount();
      }
      return element;
    }
    let selfEndtag = ['area', 'base', 'br', 'col', 'command', 'embed', 
      'hr', 'img', 'input', 'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr'];
    let attrHtml = '';
    var element = document.createElement(wraper);
    if (wraper == 'input') {
      element.focus();
    }
    if (attr) {
      let attrKeys = Object.keys(attr);
      for (let i = 0; i < attrKeys.length; i++) {
        let attrKey = attrKeys[i];
        // re implement event list here:
        // https://www.w3schools.com/jsref/dom_obj_event.asp
        if (attrKey.substr(0, 2) == 'on') {
          let attrKeyLower = attrKey.toLowerCase();
          element.addEventListener(attrKey.substr(2).toLowerCase(), attr[attrKey]);
        } else if (attrKey != 'children') {
          if (attrKey == 'className') {
            attr['class'] = attr['className'];
            attrKey = 'class';
          }
          element.setAttribute(attrKey, attr[attrKey]);
        }
      }
    }
    if (children && children.length > 0) {
      children.map(
        (child) => {
          if (child != null) {
            if (typeof child != 'object') {
              var t = document.createTextNode(child + '');
              element.appendChild(t);
            } else if (Array.isArray(child)) {
              child.map(c => element.appendChild(c));
            }
            else {
              element.appendChild(child);
            }
          }
        }
      );
    }
    return element;
  }
};