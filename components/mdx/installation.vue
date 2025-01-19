
    import { h } from 'vue';
    import { MDXProvider } from '@mdx-js/vue';
    const MDXContent = "use strict";
const {Fragment: _Fragment, jsx: _jsx, jsxs: _jsxs} = arguments[0];
function _createMdxContent(props) {
  const _components = {
    h1: "h1",
    h2: "h2",
    hr: "hr",
    li: "li",
    p: "p",
    strong: "strong",
    ul: "ul",
    ...props.components
  };
  return _jsxs(_Fragment, {
    children: [_jsx(_components.hr, {}), "\n", _jsx(_components.h2, {
      children: "title: My MDX Component"
    }), "\n", _jsx(_components.h1, {
      children: "Hello from MDX!"
    }), "\n", _jsxs(_components.p, {
      children: ["This is a ", _jsx(_components.strong, {
        children: "bold"
      }), " statement."]
    }), "\n", _jsxs(_components.ul, {
      children: ["\n", _jsx(_components.li, {
        children: "List item 3"
      }), "\n", _jsx(_components.li, {
        children: "List item 2"
      }), "\n"]
    }), "\n", _jsx("p", {
      children: "This is rendered as a paragraph is amazing something"
    })]
  });
}
function MDXContent(props = {}) {
  const {wrapper: MDXLayout} = props.components || ({});
  return MDXLayout ? _jsx(MDXLayout, {
    ...props,
    children: _jsx(_createMdxContent, {
      ...props
    })
  }) : _createMdxContent(props);
}
return {
  default: MDXContent
};
;
    export default {
      render() {
        return h(MDXProvider, null, h(MDXContent));
      }
    };
  