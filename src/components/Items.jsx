import React, { useEffect, useRef, useState } from 'react';
import Itemrow from './Itemrow';
import style from './Items.module.css';
import { useHistory, useLocation } from 'react-router-dom';

const Items = ({ authService }) => {
  const history = useHistory();
  const inputRef = useRef();
  const [name, setname] = useState('')
  const today = new Date().toLocaleDateString();
  const [Datas, setDatas] = useState({});
  const [todoCount, setTodoCount] = useState(0);
  const [url, setUrl] = useState('');
  // const userId = useLocation().state.id;
  const [userId, setUserId] = useState('')
  const date = new Date();
  const isToday = getFormatDate(date);
  const [idToday, setIdToday] = useState(isToday)

  function getFormatDate(date){
    var year = date.getFullYear();              //yyyy
    var month = (1 + date.getMonth());          //M
    month = month >= 10 ? month : '0' + month;  //month 두자리로 저장
    var day = date.getDate();                   //d
    day = day >= 10 ? day : '0' + day;          //day 두자리로 저장
    return  year + '' + month + '' + day;       //'-' 추가하여 yyyy-mm-dd 형태 생성 가능
}

const seach = () => {
  setIdToday(idToday-1);
  console.log(idToday);
}


  useEffect(() => {
    authService.onAuth(e => { !e && history.push('/'); 
    setname(e.displayName);
    setUrl(e.photoURL);
    setUserId(e.displayName +'-'+ e.uid);
  })
  },[]);

  useEffect(() => {
    const stopSync = authService.sync(userId,idToday, (data) => {
      setDatas(data);
      setTodoCount(Object.keys(data).length)
    });
    return () => stopSync();
  }, [userId]);

  const add = () => {
    const nowValue = inputRef.current.value
    if (!nowValue) { return; }

    const keyId = Date.now();
    const newdata = {
      ...Object.values(Datas)[0],
      id: keyId,
      title: nowValue,
      count: 0
    };
    inputRef.current.value = '';
    inputRef.current.focus();

    update(Datas, newdata, keyId)
  }

  const update = (data, newdata, keyId) => {
    setDatas(() => {
      const upData = { ...data, [keyId]: newdata }
      authService.saveCard(userId, idToday, upData);

      return upData;
    });
  }

  const logout = () => {
    authService.logout();
  }
  const keyPress = (e) => {
    e.key === 'Enter' && add();
  }

  return (
    <div className={style.Items}>
      <div className="top">
        <h3>{name}님 오늘({today}) 할일은 {todoCount} 개 입니다.</h3>
        <button className={style.btnlogout} onClick={logout}>LOGOUT</button>
        <img src={url} alt="" srcset=""/>
        
        {/* <button claaName={style.btnSeach} onClick={seach}>찾기</button> */}
      </div>
      <div className={style.main}>
        {
          Object.keys(Datas).map(e =>
            <Itemrow
              data={Datas[e]}
              id={e}
              setTodoCount={setTodoCount}
              todoCount={todoCount}
              setDatas={setDatas}
              Datas={Datas}
              userId={userId}
              authService={authService}
              idToday={idToday}
            />)
        }
      </div>
      <div className={style.bottom}>
        <input ref={inputRef} className={style.input} type="text" onKeyPress={keyPress} />
        <button claaName={style.btnadd} onClick={add}>ADzD</button>
      </div>
    </div>
  );
}
export default Items;