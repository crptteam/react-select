export const calcDefaultStateFromProps = ({
  values,
  selectedId,
}) => {
  const isValidId = values.find(item => item.id === selectedId) !== undefined;

  return {
    isOpen: false,
    isFocused: isValidId,
    selectedId: isValidId ? selectedId : null,
    value: isValidId ? values.find(item => item.id === selectedId).title : '',
    editedAfterSelection: false,
    defaultSelectedId: isValidId ? selectedId : null,
  };
}
