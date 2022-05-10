import { KeyboardButton } from "./KeyboardButton";
import { Keyboard } from "./Keyboard";
import { Display } from "./Display";
import { useCallback, useEffect, useState, useContext } from "react";
import { Summary } from "./Summary";
import axios from 'axios';
import { dbPath } from './constants';
import { getMonth } from './utils/getMonth';
import { AppContext } from './App';
import { SECTIONS } from './utils/constants';

export const AddAmount = ({  id, weekNumber }) => {
  const month = getMonth();

  const [val, setVal] = useState(0);
  const [amount, setAmount] = useState(0);
  const [saveStatus, setSaveStatus] = useState('')
  const [removing, setRemoving] = useState(false);
  const { openSection } = useContext(AppContext);

  useEffect(() => {
    getTotal();
  }, [])

  const getTotal = (onSaving) => {
    setSaveStatus('...loading data')
    axios.get(`${dbPath}/getTransactions`, {
      method: 'GET',
      mode: 'no-cors',
      redirect: 'follow',
      params: {
        month,
        category: id,
      }
    })
      .then(function (response) {
        setAmount(response?.data);
        setVal(0);
        setSaveStatus(onSaving ? 'saved!' : '')
      })
      .catch(function (error) {
        console.log(error);
      })
  };

  const addNumber = useCallback(
    (num) => {
      if(saveStatus !== '' && saveStatus !== 'saved!') return
      setSaveStatus('')
      if (num === "del") {
        setVal(0);
        return;
      }
      if (num === "ok") {
        if (!val > 0) return;
        enterAmount(removing ? -val : val);
        return;
      }
      const myVal = `${val}${num}`;
      setVal(parseInt(myVal));
    },
    [val, removing]
  );


  const enterAmount = (am) => {
    setSaveStatus('...saving data')
    axios.get(`${dbPath}/addTransaction`, {
      method: 'GET',
      mode: 'no-cors',
      redirect: 'follow',
      params: {
        month,
        category: id,
        amount: am
      }
    })
      .then(function (response) {
        openSection(SECTIONS.CATEGORY)
        //getTotal(true)
      })
      .catch(function (error) {
        setSaveStatus('error!')
      })
  };

  return (
    <>
      <Display val={val} callbackRemove={setRemoving} saveStatus={saveStatus}/>
      <Keyboard>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "del", "ok"].map((k) => (
          <KeyboardButton key={k} value={k} clickHandler={addNumber} />
        ))}
      </Keyboard>

      <Summary id={id} weekNumber={weekNumber} val={removing ? -val : val} amount={amount}/>
    </>
  );
};
