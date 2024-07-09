//import { useAppStateContext } from 'src/stateProviders/useAppStateContext';
import useQueryUrlParams from './useQueryUrlParams';
import { useParams } from 'react-router';

const useRunId = (): string => {
  const { runId } = useQueryUrlParams();
  const { id }:any = useParams();
  let seletedrunIdd:string | null = runId;
    if(seletedrunIdd){
      return seletedrunIdd
    }else{
      return runId || id ||  '-1'
    };
};

export default useRunId;
