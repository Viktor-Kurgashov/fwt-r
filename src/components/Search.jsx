import React, { useState, useEffect } from 'react';

const Search = ({ value, update, rootClass, placeholder }) => {
  const [timerId, setTimerId] = useState(undefined);
  const [innerValue, setInnerValue] = useState('');
  useEffect(() => setInnerValue(value), [value]);

  const delayUpdate = (e) => {
    clearTimeout(timerId);
    setInnerValue(e.target.value);
    setTimerId(setTimeout(() => update(e.target.value), 2000));
  };
  const clear = () => update('');

  return (
    <label className={"search " + rootClass}>
      <input
        value={innerValue}
        onChange={delayUpdate}
        placeholder={placeholder}
        className="search__input"
      />
      {value && <button className="search__clear-btn" onClick={clear} />}
    </label>
  )
}

export default Search;