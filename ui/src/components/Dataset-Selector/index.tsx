import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from 'react-daisyui';
// store
import { useDispatch, useSelector } from '../../store';
import { DatasetTypes, setDataset, setQ } from '../../store/slices/app-slice';
import { postSearchDataset } from '../../store/thunks';
// components
import { CaretDown } from '../Shapes';
import { getRandomQ } from '../Search-Hero/Surprise-Me';
import { SIMPLEWIKI, ECOMMERCE, DIVERSEIMAGES } from '../../commons/constants';

const datasetOptions = [
  { index: 0, value: ECOMMERCE, title: 'AI E-Commerce' },
  { index: 1, value: DIVERSEIMAGES, title: 'Diverse Images' },
  { index: 2, value: SIMPLEWIKI, title: 'Simple Wiki' },
];

export const DatasetSelector = () => {
  const [, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { dataset, q, theme, favourites } = useSelector(({ app }) => app);
  // useState
  const [openDropdown, setOpenDropdown] = useState(false);

  const handleOnSelect = (value: DatasetTypes) => {
    let _defaultQ = getRandomQ(value);

    while (_defaultQ === q) {
      _defaultQ = getRandomQ(value);
    }
    const params = {
      q: _defaultQ,
      index: value,
      favourites: favourites,
    };
    setSearchParams(params);
    dispatch(setQ(_defaultQ));
    dispatch(postSearchDataset(params));
    dispatch(setDataset(value));
    setOpenDropdown(false);
  };

  return (
    <div className="flex flex-col border-r-white">
      <Button
        onClick={() => setOpenDropdown(!openDropdown)}
        className={`flex flex-row h-full justify-start w-[170px] text-sm p-[1em] sm:rounded-none rounded-r-lg rounded-l-none bg-transparent border-none ${
          theme === 'dark'
            ? 'border-y-[#00ffaa] border-r-white focus:bg-primary hover:bg-slate-800 text-white'
            : 'focus:bg-transparent hover:bg-slate-100'
        }`}
      >
        <span className={`${theme === 'dark' ? 'text-white' : 'text-primary'} mr-4`}>
          {dataset === DIVERSEIMAGES && 'Diverse Images'}
          {dataset === ECOMMERCE && 'AI E-Commerce'}
          {dataset === SIMPLEWIKI && 'Simple Wiki'}
        </span>
        <CaretDown fill={`${theme === 'dark' ? 'white' : 'primary'}`} />
      </Button>

      {/* options */}

      <div
        id="dataset-dropdown"
        className={`${openDropdown ? 'flex' : 'hidden'} ${
          theme === 'dark' && 'bg-slate-700'
        } z-10 rounded rounded-t-none shadow z-10`}
      >
        <ul className="w-full divide-y divide-gray-100">
          {datasetOptions.map(({ index, value, title }) => (
            <li key={index} className={``}>
              <Button
                onClick={() => handleOnSelect(value as DatasetTypes)}
                className={`${
                  theme === 'dark'
                    ? 'text-white hover:text-secondary bg-slate-700 hover:bg-slate-800'
                    : 'text-primary bg-white hover:bg-slate-100'
                } flex justify-start w-full border-none rounded-none`}
              >
                {title}
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
