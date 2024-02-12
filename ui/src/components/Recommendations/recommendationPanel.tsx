import { SearchHit, SearchResponse } from '../../api/types';
import { useDispatch, useSelector } from '../../store';
import { clearRecommendations, setSelectedItem } from '../../store/slices/app-slice';
import { ResultsLoader } from '../Loaders';
import { Button, Image } from 'antd';

const ImageGrid = ({
  selectedId,
  recommendationResults,
}: {
  selectedId: string;
  recommendationResults: SearchResponse | null;
}) => {
  const dispatch = useDispatch();

  if (recommendationResults === null || recommendationResults.results === null) {
    return <></>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-5">
      {recommendationResults.results.hits.map((hit: SearchHit) => (
        <div key={hit._id} className="flex flex-col items-center justify-start overflow-hidden">
          <div className="w-full flex items-center justify-center overflow-hidden rounded-lg">
            <Image
              className="w-full h-auto object-cover"
              src={hit.imageURL}
              alt={hit.title}
              width={300}
              height={300}
              fallback="data:image/png;base64,..."
            />
          </div>
          <div className="text-center mt-2.5 px-1 h-10 overflow-hidden text-md leading-6">
            {hit.title}
          </div>
          <Button
            onClick={() => {
              dispatch(clearRecommendations());
              dispatch(setSelectedItem(hit));
            }}
            disabled={hit._id === selectedId}
          >
            Recommend
          </Button>
        </div>
      ))}
    </div>
  );
};
const RecommendationPanel = () => {
  const { recommendations, selectedItem, isRecommendationLoading } = useSelector(({ app }) => app);

  return (
    <div>
      {recommendations === null || isRecommendationLoading ? (
        <div className="">
          <ResultsLoader showTryMarqo={false} />
        </div>
      ) : (
        <ImageGrid
          selectedId={selectedItem === null ? '' : selectedItem._id}
          recommendationResults={recommendations !== null ? recommendations : null}
        />
      )}
    </div>
  );
};

export default RecommendationPanel;
