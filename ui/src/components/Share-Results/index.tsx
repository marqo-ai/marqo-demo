import { Button, useTheme } from 'react-daisyui';

export const ShareResults = () => {
  const { theme } = useTheme();

  return (
    <div
      className={`col-span-2 md:col-span-3 rounded-lg p-6 ${
        theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'
      }`}
    >
      <div className={`flex flex-col justify-center items-start space-y-4 h-full`}>
        <p className={`text-xl ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
          Share <b className={`${theme === 'dark' && 'text-secondary'}`}>marqo</b> search results
        </p>
        <Button
          className={`w-[fit-content] ${
            theme == 'dark'
              ? 'hover:bg-secondary hover:text-primary text-slate-100'
              : 'bg-primary text-slate-100'
          }`}
        >
          Submit generation
        </Button>
      </div>
    </div>
  );
};
