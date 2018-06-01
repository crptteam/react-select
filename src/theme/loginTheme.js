export default {
  minWidth: '200px',
  height: '64px',
  borderRadius: '2px',
  fontSize: '16px',
  fontWeight: 200,
  main: {
    background: '#FFFFFF',
    border: '1px solid #ABADB5',
    color: '#212C42',
    placeholderColor: '#ACADB5',
    cursor: 'pointer',
    hoverColor: '#212C42',
    hoverBackground: '#e6e6e6'
  },
  disabled: {
    background: '#FFFFFF',
    border: '1px solid #ABADB5',
    color: '#212C42',
    placeholderColor: '#ACADB5',
    cursor: 'not-allowed',
    hoverColor: '#fff',
    hoverBackground: '#1a99f4'
  },
  error: {
    background: '#FFEBEB',
    border: '1px solid #FF3C21',
    color: '#212C42',
    placeholderColor: '#ACADB5',
    cursor: 'pointer',
    hoverColor: '#fff',
    hoverBackground: '#1a99f4'
  },
  InputWrap: {
    main: {
      background: '#FFFFFF',
      border: '1px solid #ABADB5',
      cursor: 'normal',
    },
    disabled: {
      background: '#FFFFFF',
      border: '1px solid #ABADB5',
      cursor: 'not-allowed'
    },
    error: {
      background: '#FFEBEB',
      border: '1px solid #FF3C21',
      cursor: 'normal'
    },
    height: '64px',
    borderRadius: '2px',
    paddingLeft: '16px',
    paddingRight: '16px',
  },
  InputElem: {
    main: {
      color: '#212C42',
      placeholderColor: '#ACADB5',
      cursor: 'text'
    },
    disabled: {
      color:  '#212C42',
      placeholderColor: '#ACADB5',
      cursor: 'not-allowed'
    },
    error: {
      color:  '#212C42',
      placeholderColor: '#ACADB5',
      cursor: 'text'
    },
    height: '24px',
    fontSize: '16px',
    fontWeight: 200,
    background: 'rgba(0,0,0,0)'
  },
};
