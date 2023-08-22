import RawLogo from '../../assets/simplewiki.png';

export const SimpleWikiLogo = () => {
  return (
    <div className="h-full w-[50px] rounded-full bg-transparent flex items-center">
      <div className="h-[40px] w-[50px] flex justify-center">
        <img src={RawLogo} alt="Simple Wiki" className="h-full w-auto" />
      </div>
    </div>
  );
};
