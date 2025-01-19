
    import { h } from 'vue';
    import { MDXProvider } from '@mdx-js/vue';
    const MDXContent = "use strict";
const {Fragment: _Fragment, jsx: _jsx, jsxs: _jsxs} = arguments[0];
function _createMdxContent(props) {
  const _components = {
    h2: "h2",
    ...props.components
  };
  return _jsxs(_Fragment, {
    children: [_jsx(_components.h2, {
      children: "i like mdx"
    }), "\n", _jsx("p", {
      children: " this is a p tag"
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
  