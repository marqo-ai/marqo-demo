import { Fragment, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
// store
import { useDispatch, useSelector } from '../store';
// components
import SimplewikiResults from '../components/Results/Simple-Wiki';
import ECommerceResults from '../components/Results/ECommerce';
import { SearchHero } from '../components/Search-Hero';
import { AVAILABLE_INDEXES, DIVERSEIMAGES, ECOMMERCE, SIMPLEWIKI } from '../commons/constants';
import { useSearchParams } from 'react-router-dom';
import { postSearchDataset } from '../store/thunks';
import { setQ, setDataset, DatasetTypes, setPosQ, setNegQ } from '../store/slices/app-slice';
import RecommendationModal from '../components/Recommendations';
import DiverseImages from '../components/Results/DiverseImages';

export const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [helmetTitle, setHelmetTitle] = useState<string>('');
  const dispatch = useDispatch();
  const { q, posQ, negQ, dataset, theme } = useSelector(({ app }) => app);

  useEffect(() => {
    const qParam = searchParams.get('q');
    const indexParam = searchParams.get('index');
    const posQParam = searchParams.get('posQ');
    const negQParam = searchParams.get('negQ');
    let _q = q;
    let _index = dataset;
    let _posQ = posQ;
    let _negQ = negQ;

    if (qParam) {
      _q = qParam;
      dispatch(setQ(qParam));
    }

    if (posQParam) {
      _posQ = posQParam;
      dispatch(setPosQ(posQParam));
    }

    if (negQParam) {
      _negQ = negQParam;
      dispatch(setNegQ(negQParam));
    }

    if (indexParam && AVAILABLE_INDEXES.includes(indexParam)) {
      _index = indexParam as DatasetTypes;
      dispatch(setDataset(indexParam));
    }
    let params: any = {
      q: _q,
      index: _index,
    };
    if (_posQ) {
      params = { ...params, posQ: _posQ };
    }
    if (_negQ) {
      params = { ...params, negQ: _negQ };
    }
    setSearchParams(params);
    dispatch(
      postSearchDataset({
        q: _q,
        index: _index,
        posQ: _posQ,
        negQ: _negQ,
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
        <RecommendationModal />
        <div className={`mt-0`}>
          {dataset === ECOMMERCE && <ECommerceResults />}
          {dataset === DIVERSEIMAGES && <DiverseImages />}
          {dataset === SIMPLEWIKI && <SimplewikiResults />}
        </div>
      </div>
    </Fragment>
  );
};
