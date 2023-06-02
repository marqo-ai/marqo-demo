import { useEffect, useState } from "react";
import { Modal } from "react-daisyui";
import { useSearchParams } from "react-router-dom";
import { LazyLoadImage, trackWindowScroll } from "react-lazy-load-image-component";
// store, thunks, slices, hook
import { useDispatch, useSelector } from "../../store";
import { postSearchDataset } from "../../store/thunks";
import { setDataset, setQ } from "../../store/slices/app-slice";
import { useScreen } from "../../hooks/useScreen";
// components
import { ResultsLoader } from "../Loaders";
import { PlaceholderComponent } from "../Loaders/Spinner";
import { SearchTheWayYouThink } from "../Fillers/Search-The-Way-You-Think";
import 'react-lazy-load-image-component/src/effects/blur.css';
import { ECOMMERCE } from "../../commons/constants";

const ECommerceResults: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useDispatch();
    const { q, results, isSearchingCoreAPI } = useSelector(({ app }) => app);
    const { screen } = useScreen();
    const [openImgModal, setOpenImgModal] = useState(false);
    const [modalImg, setModalImg] = useState("");
    const [isLoaded, setIsLoaded] = useState(false);
    
    const getTileStyles = (key: number, hitsArrayLength: number) => {
        if (["2xl", "xl", "lg", "md"].includes(screen)) {
            return `${((key % 7 == 0 && key % 2 == 0) || (key % 7 == 3 && key % 2 == 0)) && key <= hitsArrayLength - 3 ? "large-tile" : "tile"}`
        } else {
            return `col-span-1`
        }
    }

    const handleOnClickImg = (image: string) => {
        setModalImg(image);
        setOpenImgModal(!openImgModal)
    }

    const handleOnLoad = (key: number) => {
        if (key === 29) {
            setIsLoaded(true)
        }
    }

    return <div className="results">
        {isSearchingCoreAPI && <ResultsLoader />}

        <Modal open={openImgModal} onClickBackdrop={() => setOpenImgModal(false)}>
            <LazyLoadImage
                effect="blur"
                src={modalImg}
                width={"100%"}
                height={"100%"}
                className={`min-h-full min-w-full`}
                placeholder={<PlaceholderComponent />}
                alt={`ecommerce-modal`} />
        </Modal>

        {!isSearchingCoreAPI && results?.results && results?.results?.hits && (
            <div className={`animate-smoothSlideUp imgResultsWrapper grid gap-[4px] ${["2xl", "xl", "lg", "md"].includes(screen) ? "grid-cols-5" : "grid-cols-2"}`}>
                {results?.results?.hits.map(({ image }: any, key: number, hitsArray: any[]) => {
                    return (
                        <div key={`ecommerce-${key}`} onClick={() => handleOnClickImg(image)} className={`cursor-pointer relative flex min-w-full min-h-full hover:scale-[.95] transition ease-in-out ${getTileStyles(key, hitsArray.length)}`}>
                            <LazyLoadImage
                                effect="blur"
                                src={image}
                                width={"100%"}
                                height={"100%"}
                                afterLoad={() => handleOnLoad(key)}
                                placeholder={<PlaceholderComponent />}
                                className={`rounded-lg min-h-[8em] min-w-[8em] lg:min-h-[10em] lg:min-w-[10em]`}
                                alt={`ecommerce-${key}`}
                            />
                        </div>
                    );
                })}

                {isLoaded && <SearchTheWayYouThink />}
            </div>
        )}
    </div>
}

export default trackWindowScroll(ECommerceResults);