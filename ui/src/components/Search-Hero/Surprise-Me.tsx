import { useSearchParams } from 'react-router-dom';
import { Button, Tooltip, useTheme } from 'react-daisyui';
import { FacebookIcon, FacebookShareButton, LinkedinIcon, LinkedinShareButton } from 'react-share';
// store
import { useDispatch, useSelector } from '../../store';
import { postSearchDataset } from '../../store/thunks';
import { DatasetTypes, setQ, setPosQ, setNegQ } from '../../store/slices/app-slice';
// data
import surpriseMe from '../../data/surpriseMe.json';
import { UploadImg } from './Upload-Img';
import { SIMPLEWIKI, ECOMMERCE, DIVERSEIMAGES } from '../../commons/constants';
import Favourites from '../Favourites';

export const getRandomQ = (dataset: DatasetTypes) => {
  let randomSet: string[] = [];
  switch (dataset) {
    case SIMPLEWIKI:
      randomSet = surpriseMe['randomSimpleWikiQs'];
      break;
    case ECOMMERCE:
      randomSet = surpriseMe['randomECommerceQs'];
      break;
    case DIVERSEIMAGES:
      randomSet = surpriseMe['randomDiverseImageQs'];
      break;
  }
  return randomSet[Math.floor(Math.random() * randomSet.length)];
};

export const SurpriseMe = () => {
  const [, setSearchParams] = useSearchParams();
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const { dataset, q, posQ, negQ, favourites, searchSettings, advancedSettings } = useSelector(
    ({ app }) => app,
  );

  const handleOnSurprise = () => {
    let randomQ = getRandomQ(dataset);

    while (randomQ === q) {
      randomQ = getRandomQ(dataset);
    }

    dispatch(setQ(randomQ));
    setSearchParams({
      q: randomQ,
      posQ: posQ != null ? posQ : '',
      negQ: negQ != null ? negQ : '',
      index: dataset,
    });
    dispatch(
      postSearchDataset({
        q: randomQ,
        posQ: posQ,
        negQ: negQ,
        index: dataset,
        favourites: favourites,
        searchSettings: searchSettings,
        advancedSettings: advancedSettings,
      }),
    );
  };

  const handleOnReset = () => {
    dispatch(setPosQ(null));
    dispatch(setNegQ(null));
    handleOnSurprise();
  };

  return (
    <div className={`relative w-full`}>
      <div
        className={`absolute pl-0 top-0 mt-[-110px] w-full flex flex-wrap flex-row-reverse gap-[10px] justify-end items-center md:flex-row md:flex-nowrap md:justify-between md:items-center text-sm`}
      >
        <div className={`flex gap-[10px] w-[fit-content]`}>
          <p
            className={`${
              theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
            } flex self-center whitespace-nowrap hidden md:block`}
          >
            Try abstract or detailed descriptions.
          </p>
          <Button
            onClick={handleOnSurprise}
            className={`${
              theme === 'dark'
                ? 'bg-slate-700 text-slate-100 hover:bg-slate-600'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            } w-[fit-content] md:w-auto font-medium border-none border-2 border-slate-700 px-2 btn-sm text-xs capitalize`}
          >
            Surprise me
          </Button>
          <Button
            onClick={handleOnReset}
            className={`${
              theme === 'dark'
                ? 'bg-slate-700 text-slate-100 hover:bg-slate-600'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            } w-[fit-content] md:w-auto font-medium border-none border-2 border-slate-700 px-2 btn-sm text-xs capitalize`}
          >
            Reset
          </Button>
          <div
            className={`${
              theme === 'dark' ? 'text-slate-100' : 'text-slate-700'
            } flex items-center gap-[10px] border-none bg-transparent font-medium p-0 btn-sm justify-end h-[fit-content]`}
          >
            <Favourites />
            {/* <Tooltip
              message={'Share this awesomeness!'}
              color="primary"
              className={`flex self-center`}
            >
              <LinkedinShareButton url={window.location.href}>
                <LinkedinIcon className={`w-8 md:w-6 h-8 md:h-6 rounded-sm`} />
              </LinkedinShareButton>
            </Tooltip>
            <Tooltip
              message={'Share this awesomeness!'}
              color="primary"
              className={`flex self-center`}
            >
              <FacebookShareButton url={window.location.href}>
                <FacebookIcon className={`w-8 md:w-6 h-8 md:h-6 rounded-sm`} />
              </FacebookShareButton>
            </Tooltip> */}
          </div>
        </div>
      </div>

      <div
        className={`absolute pl-4 top-0 w-full flex flex-col flex-wrap md:flex-nowrap space-y-2 md:space-y-0 text-2xl mt-[0px]`}
      >
        {dataset !== SIMPLEWIKI && <UploadImg />}
      </div>
    </div>
  );
};
