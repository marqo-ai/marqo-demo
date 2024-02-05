import { useEffect, useState } from 'react';
import { Button, Modal } from 'react-daisyui';
import { LazyLoadImage, trackWindowScroll } from 'react-lazy-load-image-component';
import { CompassFilled, HeartFilled, HeartTwoTone } from '@ant-design/icons';
// store, thunks, slices, hook
import { useSelector } from '../../store';
import { useScreen } from '../../hooks/useScreen';
// components
import { ResultsLoader } from '../Loaders';
import { PlaceholderComponent } from '../Loaders/Spinner';
import { SearchTheWayYouThink } from '../Fillers/Search-The-Way-You-Think';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { ImageSearchHit, SearchHit } from '../../api/types';
import { useDispatch } from 'react-redux';
import {
  addFavourite,
  setSelectedItem,
  setShowRecommendations,
} from '../../store/slices/app-slice';
import { Tooltip } from 'antd';

type DiverseImagesImageProps = {
  searchHit: SearchHit;
  elementKey: number;
  handleAddFavourite: (item: string) => void;
  handleRecommendation: (itemID: SearchHit) => void;
  handleOnLoad: (key: number) => void;
};

const DiverseImagesImage: React.FC<DiverseImagesImageProps> = ({
  searchHit,
  elementKey,
  handleAddFavourite,
  handleRecommendation,
  handleOnLoad,
}) => {
  const [loaded, setLoaded] = useState(false);

  const { favourites } = useSelector(({ app }) => app);
  return (
    <>
      {loaded && (
        <Tooltip title="Add to search as favourite">
          <Button
            className="btn btn-sm btn-ciercle absolute top-2 right-2 text-red-500 hover:text-red-600 z-10"
            onClick={(e) => {
              e.stopPropagation();
              handleAddFavourite(searchHit.imageURL);
            }}
            disabled={favourites.length >= 5}
          >
            <HeartFilled />
          </Button>
        </Tooltip>
      )}
      {loaded && (
        <Tooltip title="Recommendations">
          <Button
            className="btn btn-sm btn-circle absolute top-2 left-2 text-blue-500 hover:text-blue-600 z-10"
            onClick={(e) => {
              e.stopPropagation();
              handleRecommendation(searchHit);
            }}
          >
            <CompassFilled />
          </Button>
        </Tooltip>
      )}

      <LazyLoadImage
        effect="blur"
        src={searchHit.imageURL}
        width={'100%'}
        height={'100%'}
        afterLoad={() => {
          handleOnLoad(elementKey);
          setLoaded(true);
        }}
        placeholder={<PlaceholderComponent />}
        className={`rounded-lg min-h-[8em] min-w-[8em] lg:min-h-[10em] lg:min-w-[10em]`}
        alt={`diverseimage-${elementKey}`}
      />
    </>
  );
};

const DiverseImagesResults: React.FC = () => {
  const { results, isSearchLoading, favourites } = useSelector(({ app }) => app);
  const { screen } = useScreen();
  const [openImgModal, setOpenImgModal] = useState(false);
  const [modalImg, setModalImg] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  const dispatch = useDispatch();

  const getTileStyles = (key: number, hitsArrayLength: number) => {
    if (['2xl', 'xl', 'lg', 'md'].includes(screen)) {
      return `${
        ((key % 7 === 0 && key % 2 === 0) || (key % 7 === 3 && key % 2 === 0)) &&
        key <= hitsArrayLength - 3
          ? 'large-tile'
          : 'tile'
      }`;
    } else {
      return `col-span-1`;
    }
  };

  const handleOnClickImg = (image: string) => {
    setModalImg(image);
    setOpenImgModal(!openImgModal);
  };

  const handleOnLoad = (key: number) => {
    if (key === 29) {
      setIsLoaded(true);
    }
  };

  const handleAddFavourite = (item: string) => {
    if (favourites.length >= 5) {
      return;
    }
    dispatch(addFavourite(item));
  };

  const handleRecommendation = (item: SearchHit) => {
    dispatch(setSelectedItem(item));
    dispatch(setShowRecommendations(true));
  };

  return (
    <div className="results">
      {isSearchLoading && <ResultsLoader />}

      <Modal open={openImgModal} onClickBackdrop={() => setOpenImgModal(false)}>
        <LazyLoadImage
          effect="blur"
          src={modalImg}
          width={'100%'}
          height={'100%'}
          className={`min-h-full min-w-full`}
          placeholder={<PlaceholderComponent />}
          alt={`ecommerce-modal`}
        />
      </Modal>

      {!isSearchLoading && results?.results && results?.results?.hits && (
        <div
          className={`animate-smoothSlideUp imgResultsWrapper grid gap-[4px] ${
            ['2xl', 'xl', 'lg', 'md'].includes(screen) ? 'grid-cols-5' : 'grid-cols-2'
          }`}
        >
          {results?.results?.hits.map(
            (hit: SearchHit, key: number, hitsArray: ImageSearchHit[]) => {
              return (
                <div
                  key={`ecommerce-${key}`}
                  onClick={() => handleOnClickImg(hit.imageURL)}
                  className={`cursor-pointer relative flex min-w-full min-h-full hover:scale-[.98] transition ease-in-out ${getTileStyles(
                    key,
                    hitsArray.length,
                  )}`}
                >
                  <DiverseImagesImage
                    searchHit={hit}
                    elementKey={key}
                    handleAddFavourite={handleAddFavourite}
                    handleRecommendation={handleRecommendation}
                    handleOnLoad={handleOnLoad}
                  />
                </div>
              );
            },
          )}

          {isLoaded && <SearchTheWayYouThink />}
        </div>
      )}
    </div>
  );
};

export default trackWindowScroll(DiverseImagesResults);
