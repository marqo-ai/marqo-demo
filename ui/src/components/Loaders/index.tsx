import { TryMarqo } from '../Fillers';
import { LinearProgress } from './LinearProgress';

export const ResultsLoader = ({ showTryMarqo = true }) => {
  return (
    <div className={`flex flex-col w-full h-full justify-start items-center space-y-8 mt-6 mb-10`}>
      <LinearProgress fullWidth={false} size="thin" />
      {showTryMarqo && <TryMarqo />}
    </div>
  );
};
