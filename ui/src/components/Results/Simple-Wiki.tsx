import { Link } from 'react-daisyui';
import { LazyLoadImage, trackWindowScroll } from 'react-lazy-load-image-component';
// store, thunks, slices, hook
import { useSelector } from '../../store';
// components
import { ResultsLoader } from '../Loaders';
import { PlaceholderComponent } from '../Loaders/Spinner';
import RawLogo from '../../assets/simplewiki.png';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { SearchHit, TextSearchHit } from '../../api/types';
import { isTextSearchHit } from '../../api/guards';

const SimpleWikiResults: React.FC = () => {
  const { results, isSearchLoading, theme } = useSelector(({ app }) => app);
  return (
    <div className="results px-2">
      {isSearchLoading && <ResultsLoader />}

      {!isSearchLoading && (
        <div className="flex flex-wrap lg:justify-center animate-smoothSlideUp">
          {results &&
            results?.results?.hits.map((hit: SearchHit, key: number) => {
              if (!isTextSearchHit(hit)) return <></>;
              const { title, url, imageURL, _highlights } = hit as TextSearchHit;
              const highlightText = Object.values(_highlights[0]).flat().join('') || title;
              return (
                <div
                  key={key}
                  className={`p-2 basis-2/2 md:basis-1/2 lg:basis-1/3 text-primary w-full h-full overflow-hidden ${
                    theme === 'dark' ? 'text-primary' : ''
                  }`}
                >
                  <div
                    className={`${
                      theme === 'dark' ? 'bg-slate-300' : 'bg-slate-100'
                    } h-full p-6 rounded-lg `}
                  >
                    <div className="mb-6 font-bold text-lg truncate block">{title}</div>
                    <div className={`flex flex-row overflow-hidden max-h-[200px] min-h-[200px]`}>
                      <div className={`basis-3/4 flex flex-col justify-between relative pr-2`}>
                        <p className={`pb-2`}>Highlights</p>
                        {/* text-ellipsis overflow-hidden inline-block hover:text-clip hover:whitespace-normal hover:overflow-y-scroll */}
                        <p
                          className={`text-sm h-full line-clamp-[7] overflow-hidden hover:overflow-y-scroll hover:line-clamp-none ${
                            theme === 'dark' ? 'text-slate-700' : 'text-slate-800'
                          }`}
                        >
                          {highlightText}
                        </p>
                        <div className={`flex space-x-6 pt-2 text-sm`}>
                          <Link className={`underline`} target="_blank" href={url}>
                            Read article
                          </Link>
                        </div>
                      </div>

                      <div
                        className={`basis-1/4 flex justify-center self-start ${
                          theme === 'dark' ? 'bg-white' : ''
                        }`}
                      >
                        <LazyLoadImage
                          width={'100%'}
                          height={'100%'}
                          effect="blur"
                          placeholder={<PlaceholderComponent />}
                          src={imageURL || RawLogo}
                          alt={title}
                          className={`h-auto w-full`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default trackWindowScroll(SimpleWikiResults);
