import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

export const SelectFormikV2 = ({
  field,
  form: { setFieldValue },
  options,
  placeholder,
  ...props
}) => {
  const handleSelectChange = (option) => {
    const value = option ? option.value : 0;
    setFieldValue(field.name, value);
  };

  const findOption = (fieldValue) => {
    const foundOption = options.find((option) => {
      return option.value === fieldValue;
    });

    return foundOption;
  };

  return (
    <Select
      {...field}
      {...props}
      inputId={field.name}
      options={options}
      placeholder={placeholder}
      value={field.value ? findOption(field.value) : 0}
      onChange={handleSelectChange}
    />
  );
};

SelectFormikV2.propTypes = {
  field: PropTypes.shape({
    value: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  form: PropTypes.shape({
    setFieldValue: PropTypes.func.isRequired,
  }).isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number,
      name: PropTypes.string,
    })
  ).isRequired,
  placeholder: PropTypes.string.isRequired,
};
