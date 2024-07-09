//import { useResultStateContext } from 'src/stateProviders/useResultStateContext';
import useQueryUrlParams from './useQueryUrlParams';
import TableResultlistType from 'src/types/TableResultlistType';
import { useAppStateContext } from 'src/stateProviders/useAppStateContext';

const useResultRunId = (): string => {
  const seletedRunId = localStorage.getItem('runId');
  const { defaultRunId } = useAppStateContext();
  const { runId } = useQueryUrlParams<TableResultlistType>();
  let seletedRunIds:string | null = seletedRunId;
    if(seletedRunIds){
      return seletedRunIds
    }else{
      return runId || defaultRunId || '20235423'
    }

  //return seletedSourceOwnerId || sourceOwnerId || defaultSourceOwnerId || '';
};

export default useResultRunId;
