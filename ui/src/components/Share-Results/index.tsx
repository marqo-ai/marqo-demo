import { Button, useTheme } from "react-daisyui"
import { useDispatch } from "../../store";
import { setTakeScreenshot } from "../../store/slices/app-slice";
import { LinkedinShareButton, LinkedinIcon } from "react-share";

export const ShareResults = () => {
    const { theme } = useTheme();
    const dispatch = useDispatch();

    const handleOnShare = () => {
        dispatch(setTakeScreenshot(true))
    }

    return <div className={`flex ${theme === "dark" ? "" : ""}`}>
        <LinkedinShareButton title={"test"} summary={"summary"} url={"http://marqodemo.us-east-1.elasticbeanstalk.com/?q=smiling+with+glasses&index=boredapes"} className={``}>
            <LinkedinIcon />
        </LinkedinShareButton>
    </div>
}