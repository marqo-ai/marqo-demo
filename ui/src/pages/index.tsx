import { Fragment, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
// store
import { useDispatch, useSelector } from '../store';
// components
import BoredApesResults from '../components/Results/Bored-Apes';
import SimplewikiResults from '../components/Results/Simple-Wiki';
import ECommerceResults from '../components/Results/ECommerce';
import { SearchHero } from '../components/Search-Hero';
import { AVAILABLE_INDEXES, ECOMMERCE, BOREDAPES, SIMPLEWIKI } from '../commons/constants';
import { useSearchParams } from 'react-router-dom';
import { postSearchDataset } from '../store/thunks';
import { setQ, setDataset, DatasetTypes } from '../store/slices/app-slice';

export const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [helmetTitle, setHelmetTitle] = useState<string>('');
  const dispatch = useDispatch();
  const { q, dataset, theme } = useSelector(({ app }) => app);

  useEffect(() => {
    const qParam = searchParams.get('q');
    const indexParam = searchParams.get('index');
    let _q = q,
      _index = dataset;

    if (qParam) {
      _q = qParam;
      dispatch(setQ(qParam));
    }

    if (indexParam && AVAILABLE_INDEXES.includes(indexParam)) {
      _index = indexParam as DatasetTypes;
      dispatch(setDataset(indexParam));
    }

    setSearchParams({
      q: _q,
      index: _index,
    });
    dispatch(
      postSearchDataset({
        q: _q,
        index: _index,
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let title = '';
    switch (dataset) {
      case ECOMMERCE:
        title = 'AI E-Commerce';
        break;
      case BOREDAPES:
        title = 'Bored Apes';
        break;
      case SIMPLEWIKI:
        title = 'Simple Wiki';
        break;
    }
    setHelmetTitle(title);
  }, [dataset]);

  return (
    <Fragment>
      <Helmet>
        <title>Marqo | Search {helmetTitle}</title>
      </Helmet>

      {/* content */}

      <div
        className={`container justify-center min-h-screen w-screen pb-7 px-2 sm:px-12 m-auto ${
          theme === 'dark' && 'bg-primary'
        }`}
      >
        <SearchHero />

        <div className={`mt-0`}>
          {dataset === ECOMMERCE && <ECommerceResults />}
          {dataset === BOREDAPES && <BoredApesResults />}
          {dataset === SIMPLEWIKI && <SimplewikiResults />}
        </div>
      </div>
    </Fragment>
  );
};
