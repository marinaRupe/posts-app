import React, { useCallback } from 'react';

import withLogger, { LoggerProps } from '../hoc/withLogger';

interface OwnProps extends LoggerProps {
	onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

type Props = OwnProps;

const SearchInput: React.FC<Props> = React.memo<Props>(({
  onChange,
  placeholder = 'Search',
  className = '',
}) => {
  const handleValueChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    onChange(value);
  }, [onChange]);

  return (
    <input
      className={`form-control search-input ${className}`}
      type='text'
      placeholder={placeholder}
      onChange={handleValueChange}
    />
  );
});

SearchInput.displayName = 'SearchInput';

export default withLogger(SearchInput);
