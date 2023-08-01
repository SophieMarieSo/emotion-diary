import React, { useState } from 'react';
import MyButton from './common/MyButton';
import { useNavigate } from 'react-router-dom';
import DiaryItem from './DiaryItem';

const ControlMenu = ({ value, onChange, optionList }) => {
  return (
    <select
      className='ControlMenu'
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {optionList.map((item, idx) => (
        <option key={idx} value={item.value}>
          {item.name}
        </option>
      ))}
    </select>
  );
};

const sortOptionList = [
  { value: 'latest', name: '최신순' },
  { value: 'oldest', name: '오래된순' },
];

const filterOptionList = [
  { value: 'all', name: '전부 다' },
  { value: 'good', name: '좋은 감정만' },
  { value: 'bad', name: '안좋은 감정만' },
];

export default function DiaryList({ diaryList }) {
  const [sortType, setSortType] = useState('latest');
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  const getProcessedDiaryList = () => {
    const filterCallBack = (item) => {
      if (filter === 'good') {
        return parseInt(item.emotion) <= 3;
      } else {
        return parseInt(item.emotion) > 3;
      }
    };

    const compare = (a, b) => {
      if (sortType === 'latest') {
        return parseInt(b.date) - parseInt(a.date);
      } else {
        return parseInt(a.date) - parseInt(b.date);
      }
    };

    const copyList = JSON.parse(JSON.stringify(diaryList));
    const filteredList =
      filter === 'all'
        ? copyList
        : copyList.filter((item) => filterCallBack(item));
    const sortedList = filteredList.sort(compare);
    return sortedList;
  };

  return (
    <div className='DiaryList'>
      <div className='menu_wrapper'>
        <div className='left_col'>
          <ControlMenu
            value={sortType}
            onChange={setSortType}
            optionList={sortOptionList}
          />
          <ControlMenu
            value={filter}
            onChange={setFilter}
            optionList={filterOptionList}
          />
        </div>
        <div className='right_col'>
          <MyButton
            text={'새 일기쓰기'}
            type={'positive'}
            onClick={() => navigate('/new')}
          />
        </div>
      </div>
      {getProcessedDiaryList().map((item) => (
        <div key={item.id}>
          <DiaryItem key={item.id} {...item} />
        </div>
      ))}
    </div>
  );
}

DiaryList.defaultProps = {
  diaryList: [],
};
