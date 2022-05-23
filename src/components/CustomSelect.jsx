import { useState, useEffect } from 'react';

const CustomSelect = ({ data, property, value, update, rootClass, placeholder }) => {
  const [opened, setOpened] = useState(false);
  const [title, setTitle] = useState('');

  useEffect(() => setTitle(
    (data.length && value)
      ? data.find(item => item.id.toString() === value)[property]
      : false
  ), [data, value]);

  const select = (e) => {
    if (e.target.value !== value) {
      update(e.target.value);
      setOpened(false);
    }
  };
  const clear = () => {
    update('');
    setOpened(false);
  };
  const toggleList = () => setOpened(!opened);



  return !opened ? (
    <div className={"custom-select " + rootClass}>
      <button className="custom-select__toggle-btn txt-elps" onClick={toggleList}>
        {title ? title : placeholder}
      </button>

      {value && <button className={"custom-select__clear-btn"} onClick={clear} />}
    </div>
  ) : (
    <div className={"custom-select " + rootClass}>
      <button className="custom-select__toggle-btn txt-elps custom-select__toggle-btn_opened" onClick={toggleList}>
        {title ? title : placeholder}
      </button>

      {value && <button className={"custom-select__clear-btn"} onClick={clear} />}

      <div className="custom-select__list">
        {data.map((item) =>
          <button
            key={item.id}
            value={item.id}
            onClick={select}
            className={
              "custom-select__option txt-elps" +
              ((item.id === value) ? " custom-select__option_selected" : "")
          }>
            {item[property]}
          </button>
        )}
      </div>
    </div>
  )
}

export default CustomSelect