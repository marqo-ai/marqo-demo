import { Button } from "react-daisyui";
import { mockCoreApiBoredApesResults, mockCoreApiSimpleWikiResults } from "../../data";

export const ImageResults: React.FC = () => {
    // const { results } = useSelector()
    const { results } = mockCoreApiBoredApesResults;

    return <div className="results">
        <div className="imgResultsWrapper flex flex-wrap">

            {results?.hits.map(({ image, _id, _highlights, _score }, key) => {
                // TODO: on hover, enlarge to fit 4 boxes
                return <div key={key} className="basis-1/5 p-2 drop-shadow-lg">
                    <img src={image} alt={_highlights} />
                </div>
            })}
        </div>
    </div>
}

export const ListResults: React.FC = () => {
    // const { results } = useSelector()
    const { results } = mockCoreApiSimpleWikiResults;

    return <div className="results">
        <div className="listResultsWrapper flex">

            {results?.hits.map(({ content, docDate, domain, title, url, _id, _highlights, _score }, key) => {
                // TODO: on hover, enlarge to fit 4 boxes
                return <div key={key} className="">
                    <div>{title}</div>
                    <div>{content}</div>
                </div>
            })}
        </div>
    </div>
}