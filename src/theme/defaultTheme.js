export default {
  Select: {
    minWidth: "200px",
    height: "64px",
    borderRadius: "2px",
    fontSize: "16px",
    fontWeight: 200,
    main: {
      background: "#FFFFFF",
      border: "1px solid #ABADB5",
      color: "#212C42",
      placeholderColor: "#ACADB5",
      cursor: "pointer",
      hoverColor: "#fff",
      hoverBackground: "#1a99f4"
    },
    disabled: {
      background: "#FFFFFF",
      border: "1px solid #ABADB5",
      color: "#212C42",
      placeholderColor: "#ACADB5",
      cursor: "not-allowed",
      hoverColor: "#fff",
      hoverBackground: "#1a99f4"
    },
    error: {
      background: "#FFEBEB",
      border: "1px solid #FF3C21",
      color: "#212C42",
      placeholderColor: "#ACADB5",
      cursor: "pointer",
      hoverColor: "#fff",
      hoverBackground: "#1a99f4"
    },
    SelectOption: {
      height: 'auto'
    },
    SelectOptionsPanel: {
      paddingTop: '8px',
      paddingBottom: '8px'
    },
    SelectOptionsPointer: {
      background: '#FFFFFF',
    },
    placeholder: {
      normal: "#ACADB5",
      disabled: "#ACADB5",
      error: "#ACADB5"
    },
    Placeholder: {
      fontWeight: 200,
      main: {
        color: "#abadb6"
      },
      error: {
        color: "#abadb6"
      },
      disabled: {
        color: "#abadb6"
      },
      normal: {
        fontSize: "16px",
        height: "24px",
        top: "19px"
      },
      focused: {
        top: "11px",
        fontSize: "14px",
        height: "14px"
      }
    },
    InputWrap: {
      main: {
        background: "#FFFFFF",
        border: "1px solid #ABADB5",
        cursor: "normal"
      },
      disabled: {
        background: "#FFFFFF",
        border: "1px solid #ABADB5",
        cursor: "not-allowed"
      },
      error: {
        background: "#FFEBEB",
        border: "1px solid #FF3C21",
        cursor: "normal"
      },
      height: "38px",
      borderRadius: "2px",
      paddingLeft: "16px",
      paddingRight: "16px"
    },
    InputElem: {
      main: {
        color: "#212C42",
        placeholderColor: "#ACADB5",
        cursor: "text",
        border: 0
      },
      disabled: {
        color: "#212C42",
        placeholderColor: "#ACADB5",
        cursor: "not-allowed",
        border: 0
      },
      error: {
        color: "#212C42",
        placeholderColor: "#ACADB5",
        cursor: "text",
        border: 0,
      },
      height: "24px",
      fontSize: "16px",
      fontWeight: 200,
      background: "rgba(0,0,0,0)"
    },
    RenderWrap: {
      main: {
        color: "#212C42",
        placeholderColor: "#ACADB5"
      },
      disabled: {
        color: "#212C42",
        placeholderColor: "#ACADB5",
        cursor: "not-allowed"
      },
      error: {
        color: "#212C42",
        placeholderColor: "#ACADB5"
      },
      background: "rgba(0,0,0,0)"
    }
  }
};
