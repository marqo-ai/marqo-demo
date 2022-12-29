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
            console.log(inputRef)
            dispatch(setImgFile(inputRef.current.value))
        }
    }

    return <Fragment>
        <div className="contents">
        </div>
    </Fragment>
}
