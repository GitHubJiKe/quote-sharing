export function useEditorAPI(
    editor:
        | {
              value: {
                  reset: () => void;
                  toggleToolbar: () => void;
                  getHTML: () => any;
                  getText: () => any;
                  setHTML: (arg0: string) => void;
              };
          }
        | undefined
) {
    return () => {
        const doRest = () => {
            if (editor) {
                editor.value.reset();
            }
        };
        const doToogleToolbar = () => {
            if (editor) {
                editor.value.toggleToolbar();
            }
        };
        const getHTML = () => {
            if (editor) {
                return editor.value.getHTML();
            }
            return "";
        };
        const getText = () => {
            if (editor) {
                return editor.value.getText();
            }
            return "";
        };
        const setHTML = (html: string) => {
            if (editor) {
                editor.value.setHTML(html);
            }
        };

        return {
            reset: doRest,
            toggleToolbar: doToogleToolbar,
            getHTML,
            getText,
            setHTML,
        };
    };
}
