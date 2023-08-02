import React, { useContext, useEffect, useState } from 'react';
import MyHeader from '../components/common/MyHeader';
import MyButton from './../components/common/MyButton';
import { DiaryStateContext } from '../App';
import DiaryList from '../components/DiaryList';

export default function Home() {
  const [curDate, setCurDate] = useState(new Date());
  const diaryList = useContext(DiaryStateContext);
  const [data, setData] = useState([]);
  const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;

  useEffect(() => {
    if (diaryList.length < 1) return;

    const firstDay = new Date(
      curDate.getFullYear(),
      curDate.getMonth(),
      1
    ).getTime();

    const lastDay = new Date(
      curDate.getFullYear(),
      curDate.getMonth() + 1,
      0,
      23,
      59,
      59
    ).getTime();

    setData(
      diaryList.filter((item) => firstDay <= item.date && item.date <= lastDay)
    );
  }, [diaryList, curDate]);

  const increaseMonth = () =>
    setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() + 1));

  const decreaseMonth = () =>
    setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() - 1));

  return (
    <div>
      <MyHeader
        headText={headText}
        leftChild={<MyButton text={'<'} onClick={decreaseMonth} />}
        rightChild={<MyButton text={'>'} onClick={increaseMonth} />}
      />
      <DiaryList diaryList={data} />
    </div>
  );
}
