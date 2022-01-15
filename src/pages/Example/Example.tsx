import useDebounce from 'hook/useDebounce';
import React, { ChangeEvent, useState } from 'react';

const Example = (): JSX.Element => {
  const [value, setValue] = useState<string>('');
  const debouncedValue = useDebounce<string>(value, 1000);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setValue(event.target.value);
  };

  // Fetch API (optional)
  React.useEffect(() => {
    // Do fetch here...
    // Triggers when "debouncedValue" changes
  }, [debouncedValue]);
  return (
    <div>
      <p>Value real-time: {value}</p>
      <p>Debounced value: {debouncedValue}</p>

      <input type="text" value={value} onChange={handleChange} />
    </div>
  );
};
export default Example;
