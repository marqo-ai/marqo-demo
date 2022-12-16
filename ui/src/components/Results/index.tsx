import { Button } from "react-daisyui";
import { mockCoreApiBoredApesResults } from "../../data";

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