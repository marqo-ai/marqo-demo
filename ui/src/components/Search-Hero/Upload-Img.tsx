import { ChangeEvent, Fragment } from 'react';
import { Input } from 'react-daisyui';
// store, constants
import { setImgFile } from '../../store/slices/app-slice';
import { useDispatch, useSelector } from '../../store';
import { postSearchDataset } from '../../store/thunks';
import { ACCEPTED_FILE_TYPES, MAX_FILE_SIZE_IN_MEGABYTES } from '../../commons/constants';

function getSizeInMegabytes(raw: number) {
  return raw / 1024;
}

export const UploadImg = () => {
  const { theme, dataset } = useSelector(({ app }) => app);
  const dispatch = useDispatch();

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e?.target?.files && e?.target?.files.length > 0) {
      if (
        ACCEPTED_FILE_TYPES.includes(e?.target?.files[0].type) &&
        e.target.files[0].size > 0 &&
        getSizeInMegabytes(e.target.files[0].size) <= MAX_FILE_SIZE_IN_MEGABYTES
      ) {
        dispatch(setImgFile(true));
        dispatch(
          postSearchDataset({
            q: '',
            index: dataset,
            img: e.target.files[0],
          }),
        );
      } else if (!ACCEPTED_FILE_TYPES.includes(e?.target?.files[0].type)) {
        return alert('Invalid file type');
      } else if (
        e.target.files[0].size < 1 ||
        getSizeInMegabytes(e.target.files[0].size) > MAX_FILE_SIZE_IN_MEGABYTES
      ) {
        return alert('Does not meet maximum file size');
      } else {
        return alert('Error uploading image');
      }
    }
  };

  return (
    <Fragment>
      <div className="contents">
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="img-file"
            className="flex flex-col items-center justify-center w-[fit-content] cursor-pointer"
          >
            <div className="flex flex-col items-center justify-center">
              <p
                className={`${
                  theme === 'dark'
                    ? 'text-white hover:text-secondary border-slate-200 hover:border-secondary'
                    : 'text-primary hover:text-primary border-primary'
                } hover:scale-[0.97] text-xs md:text-sm px-2 py-[6px] md:p-0 border-[1px] md:border-none rounded-md md:rounded-none md:hover:underline whitespace-nowrap`}
              >
                or upload an image
              </p>
            </div>
            <Input
              onChange={(e) => handleOnChange(e)}
              type={'file'}
              id="img-file"
              className={`hidden`}
              accept="image/png, image/jpeg, image/jpg"
            />
          </label>
        </div>
      </div>
    </Fragment>
  );
};
