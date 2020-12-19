import React, { useEffect, useRef, useState } from 'react';
import Itemrow from './Itemrow';
import style from './Items.module.css';
import datas from '../data'
import { useLocation } from 'react-router-dom';

const Items = ({authService}) => {
  const fid = useLocation().state.id;
  const [Datas, setDatas] = useState(datas);
  const [todoCount, setTodoCount] = useState(0);
  const inputRef = useRef();
  const name = '홍길동'
  const today = new Date().toLocaleDateString();
  useEffect(() => {authService.saveCard(fid,Datas);} );
  
  const add = () => {
    const nowValue = inputRef.current.value
    if (!nowValue) {
      return;
    }
    const keyId = Date.now();
    const newdata = {
      ...Object.values(Datas)[0],
      id: keyId,
      title: nowValue,
      count: 0
    };

    setTodoCount(todoCount+1);
    inputRef.current.value = '';
    inputRef.current.focus();
    
    setDatas({ ...Datas, [keyId]: newdata });
  }

  const keyPress = (e) => {
    e.key==='Enter'&& add();
  }

  return (
    <div className={style.Items}>
      <div className="top">
        <h3>{name}님 오늘({today}) 할일은 {todoCount} 개 입니다.</h3>
      </div>
      <div className={style.main}>
        {
          Object.keys(Datas).map(e =>
            <Itemrow data={Datas[e]} id={e} setTodoCount={setTodoCount} todoCount={todoCount} setDatas={setDatas} Datas={Datas} />)
        }
      </div>
      <div className={style.bottom}>
        <input ref={inputRef} className={style.input} type="text" onKeyPress={keyPress}/>
        <button claaName={style.btnadd} onClick={add}>ADzD</button>
      </div>
    </div>
  );
}
export default Items;