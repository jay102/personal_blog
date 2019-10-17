const toolbar = [
  {
    name: "bold",
    action: function customFunction(editor) {
      editor.toggleBold();
    },
    className: "fa fa-bold",
    title: "Bold"
  },
  {
    name: "italic",
    action: function customFunction(editor) {
      editor.toggleItalic();
    },
    className: "fa fa-italic",
    title: "Italic"
  },
  {
    name: "heading",
    action: function customFunction(editor) {
      editor.toggleHeadingSmaller();
    },
    className: "fa fa-header fa-heading",
    title: "Heading"
  },
  "|",
  {
    name: "quote",
    action: function customFunction(editor) {
      editor.toggleBlockquote();
    },
    className: "fa fa-quote-left",
    title: "Quote"
  },
  {
    name: "unordered-list",
    action: function customFunction(editor) {
      editor.toggleUnorderedList();
    },
    className: "fa fa-list-ul",
    title: "Generic List"
  },
  {
    name: "ordered-list",
    action: function customFunction(editor) {
      editor.toggleOrderedList();
    },
    className: "fa fa-list-ol",
    title: "Numbered List"
  },
  "|",
  {
    name: "link",
    action: function customFunction(editor) {
      editor.drawLink();
    },
    className: "fa fa-link",
    title: "Create Link"
  },
  {
    name: "image",
    action: function customFunction(editor) {
      editor.drawImage();
    },
    className: "fa fa-picture-o",
    title: "Insert Image Link"
  },
  "|",
  {
    name: "preview",
    action: function customFunction(editor) {
      editor.togglePreview();
    },
    className: "fa fa-eye no-disable",
    title: "Toggle Preview"
  },
  {
    name: "code",
    action: function customFunction(editor) {
      editor.toggleCodeBlock();
    },
    className: "fa fa-code",
    title: "Code"
  },
  "|",
  {
    name: "strikethrough",
    action: function customFunction(editor) {
      editor.toggleStrikethrough();
    },
    className: "fa fa-strikethrough",
    title: "Strikethrough"
  },
  "|",
  {
    name: "table",
    action: function customFunction(editor) {
      editor.drawTable();
    },
    className: "fa fa-table",
    title: "Insert Table"
  },
  {
    name: "horizontal-rule",
    action: function customFunction(editor) {
      editor.drawHorizontalRule();
    },
    className: "fa fa-minus",
    title: "Insert Horizontal Line"
  },
];
export default toolbar;