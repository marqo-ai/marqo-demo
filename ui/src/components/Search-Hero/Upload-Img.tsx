import { FormEvent, Fragment, useRef } from "react"
import { Input } from "react-daisyui";
import { setImgFile } from "../../store/slices/app-slice";
import { useDispatch, useSelector } from "../../store";

export const UploadImg = () => {
    const { theme } = useSelector(({ app }) => app);
    const dispatch = useDispatch();
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleOnChange = (e: FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (inputRef?.current) {
            dispatch(setImgFile(inputRef.current.value))
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
                    <Input onInput={(e) => handleOnChange(e)} type={"file"} id="img-file" className={`hidden`} ref={inputRef} />
                </label>
            </div>
        </div>
    </Fragment>
}
