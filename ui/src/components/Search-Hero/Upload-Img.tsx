import { ChangeEvent, Fragment } from "react"
import { Input } from "react-daisyui";
// store, constants
import { setImgFile } from "../../store/slices/app-slice";
import { useDispatch, useSelector } from "../../store";
import { postSearchDataset } from "../../store/thunks";
import { BOREDAPES } from "../../commons/constants";

export const UploadImg = () => {
    const { theme } = useSelector(({ app }) => app);
    const dispatch = useDispatch();

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e?.target?.files) {
            dispatch(setImgFile(e.target.files[0]))
            dispatch(postSearchDataset({
                q: "",
                index: BOREDAPES,
                img: e.target.files[0],
            }))
        }
    }

    return <Fragment>
        <div className="contents">
            <div className="flex items-center justify-center w-full">
                <label htmlFor="img-file" className="flex flex-col items-center justify-center w-[fit-content] cursor-pointer">
                    <div className="flex flex-col items-center justify-center">
                        <p className={`${theme === "dark" ? "text-white hover:text-secondary border-slate-200 hover:border-secondary" : "text-primary hover:text-primary border-primary"} hover:scale-[0.97] text-xs md:text-sm px-2 py-[6px] md:p-0 border-[1px] md:border-none rounded-md md:rounded-none md:hover:underline whitespace-nowrap`}>
                            or upload an image
                        </p>
                    </div>
                    <Input onChange={(e) => handleOnChange(e)} type={"file"} id="img-file" className={`hidden`} />
                </label>
            </div>
        </div>
    </Fragment>
}
