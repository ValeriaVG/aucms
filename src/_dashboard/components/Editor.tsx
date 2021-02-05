import * as monaco from "monaco-editor";
import { Component, createRef, HTMLProps } from "react";

export default class Editor extends Component<
  {
    value?: string;
    onChange?: (value: string) => any;
    language?: string;
    theme?: string;
  } & HTMLProps<HTMLDivElement>
> {
  ref = createRef<HTMLDivElement>();
  editor: monaco.editor.IStandaloneCodeEditor;
  componentDidMount() {
    this.editor = monaco.editor.create(this.ref.current, {
      value: this.props.value,
      language: this.props.language ?? "markdown",
      lineNumbers: "off",
      theme: this.props.theme,
      minimap: { enabled: false },
    });
    this.editor.onDidChangeModelContent(() => {
      if (!this.props.onChange) return;
      this.props.onChange(this.editor.getValue());
    });
  }

  render() {
    const { value, onChange, style, ...props } = this.props;
    return (
      <div
        ref={this.ref}
        style={Object.assign({}, defaultStyle, style)}
        {...props}
      />
    );
  }
}

const defaultStyle = {
  width: "100%",
  minHeight: 350,
  height: "100%",
  flex: 1,
};