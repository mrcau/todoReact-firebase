import React from 'react';
import style from './Itemrow.module.css';

const Itemrow = ({userId,id,data,Datas,setDatas,setTodoCount,todoCount,authService}) => {
  const dataC={...data};
  const datasC={...Datas};

  const plus = () => {
    dataC.count++;
    datasC[data.id]=dataC;
    setDatas(datasC);
    authService.saveCard(userId, datasC);
  }
  
  const minus = () => {
    data.count>0 && dataC.count--;
    datasC[data.id]=dataC;
    setDatas(datasC);
    authService.saveCard(userId, datasC);
  }

  const del = () => {
    delete datasC[data.id];
    todoCount>0 && setTodoCount(todoCount-1);
    setDatas(datasC);
    authService.removeCard(userId,data.id)
    console.log(data.id)
  }

  return(
  <div className={style.Itemrow}>
    <div className={style.item}>
      <span className={style.name}>{data.title}</span>
      <span> {data.count}</span>
      <div className={style.btnbox}>
        <button className={style.btnPlus} onClick={plus}>+</button>
        <button className={style.btnMius} onClick={minus}>-</button>
        <button className={style.bntDel} onClick={del}>DEL</button>
      </div>
    </div>
    <hr className={style.hr} />
  </div>
);
  }
export default Itemrow;