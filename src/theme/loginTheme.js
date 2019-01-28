export default {
  Select: {
    minWidth: '200px',
    height: '60px',
    borderRadius: '1px',
    fontSize: '16px',
    fontWeight: 200,
    main: {
      background: '#FFFFFF',
      border: '1px solid #ABADB5',
      color: '#212C42',
      placeholderColor: '#ACADB5',
      cursor: 'pointer',
      hoverColor: '#212C42',
      hoverBackground: '#F8EC31'
    },
    disabled: {
      background: '#ACADB5',
      border: '1px solid #ABADB5',
      color: '#212C42',
      placeholderColor: '#7C7D85',
      cursor: 'not-allowed',
      hoverColor: '#212C42',
      hoverBackground: '#e6e6e6'
    },
    error: {
      background: '#FFEBEB',
      border: '1px solid #FF3C21',
      color: '#212C42',
      placeholderColor: '#ACADB5',
      cursor: 'pointer',
      hoverColor: '#212C42',
      hoverBackground: '#e6e6e6'
    },
    SelectOption: {
      height: 'auto'
    },
    SelectOptionsPanel: {
      maxHeight: '300px',
      paddingTop: '0px',
      paddingBottom: '0px',
      top: '58px',
      border: '1px solid rgba(196, 196, 196, 0.25)',
      open: {
        boxShadow: '1px 3px 5px rgba(0, 0, 0, 0.25)'
      }
    },
    Placeholder: {
      fontWeight: 200,
      main: {
        color: 'rgba(82,83,90,0.7)'
      },
      error: {
        color: '#FF3D00'
      },
      disabled: {
        color: '#abadb6'
      },
      normal: {
        fontSize: '16px',
        height: '24px',
        top: '19px'
      },
      focused: {
        top: '11px',
        fontSize: '14px',
        height: '14px'
      }
    },
    InputWrap: {
      main: {
        background: '#FFFFFF',
        border: '1px solid rgba(196, 196, 196, 0.25)',
        cursor: 'normal'
      },
      disabled: {
        background: '#FFFFFF',
        border: '1px solid #ABADB5',
        cursor: 'not-allowed'
      },
      error: {
        background: '#FFFFFF',
        border: '1px solid #FF3D00',
        cursor: 'normal'
      },
      height: '60px',
      borderRadius: '3px',
      paddingLeft: '16px',
      paddingRight: '16px',
      open: {
        boxShadow: '1px 3px 5px rgba(0, 0, 0, 0.25)'
      }
    },
    InputElem: {
      main: {
        color: '#212C42',
        placeholderColor: '#52535A',
        cursor: 'text'
      },
      disabled: {
        color: '#212C42',
        placeholderColor: '#ACADB5',
        cursor: 'not-allowed'
      },
      error: {
        color: '#212C42',
        placeholderColor: '#ACADB5',
        cursor: 'text'
      },
      height: '24px',
      fontSize: '16px',
      fontWeight: 200,
      background: 'rgba(0,0,0,0)'
    },
    RenderWrap: {
      main: {
        color: '#212C42',
        placeholderColor: '#ACADB5'
      },
      disabled: {
        color: '#212C42',
        placeholderColor: '#ACADB5',
        cursor: 'not-allowed'
      },
      error: {
        color: '#212C42',
        placeholderColor: '#ACADB5'
      },
      background: 'rgba(0,0,0,0)'
    }
  }
};
