import { useState, useEffect } from 'react';
import { useClearRange } from '../Utils';

const DropdownRange = ({ from, to, updateFrom, updateTo, rootClass }) => {
  const [opened, setOpened] = useState(false);
  const toggleList = () => setOpened(!opened);
  const clearRange = useClearRange();

  const [timerFrom, setTimerFrom] = useState(undefined);
  const [innerFrom, setInnerFrom] = useState("");
  useEffect(() => setInnerFrom(from), [from]);

  const delayUpdateFrom = (e) => {
    clearTimeout(timerFrom);
    setInnerFrom(e.target.value);
    setTimerFrom(setTimeout(() => {
      updateFrom(e.target.value);
      setOpened(false);
    }, 2000));
  };

  const [timerTo, setTimerTo] = useState(undefined);
  const [innerTo, setInnerTo] = useState("");
  useEffect(() => setInnerTo(to), [to]);

  const delayUpdateTo = (e) => {
    clearTimeout(timerTo);
    setInnerTo(e.target.value);
    setTimerTo(setTimeout(() => {
      updateTo(e.target.value);
      setOpened(false);
    }, 2000));
  };



  return !opened ? (
    <div className={"dropdown-range " + rootClass}>
      <button className="dropdown-range__toggle-btn" onClick={toggleList}>Created</button>

      {(from || to) && <button className="dropdown-range__clear-btn" onClick={clearRange} />}
    </div>
  ) : (
    <div className={"dropdown-range " + rootClass}>
      <button className="dropdown-range__toggle-btn dropdown-range__toggle-btn_opened" onClick={toggleList}>
        Created
      </button>

      {(from || to) && <button className="dropdown-range__clear-btn" onClick={clearRange} />}

      <div className="dropdown-range__list dropdown__content">
        <input
          value={innerFrom}
          onChange={delayUpdateFrom}
          className="dropdown-range__input"
          placeholder="from"
        />
        <input
          value={innerTo}
          onChange={delayUpdateTo}
          className="dropdown-range__input"
          placeholder="to"
        />
      </div>
    </div>
  )
};

export default DropdownRange;