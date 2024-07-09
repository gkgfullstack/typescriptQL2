import CreateJobPropertiesTypeStopAt  from './CreateJobPropertiesTypeStopAt';
import CreateJobPropertiesTypeDetails  from './CreateJobPropertiesTypeDetails';
import CreateJobPropertiesTypeApp  from './CreateJobPropertiesTypeApp';
import CreateJobPropertiesTypeLiveStreaming  from './CreateJobPropertiesTypeLiveStreaming';
import CreateJobPropertiesTypeName  from './CreateJobPropertiesTypeName';
import CreateJobPropertiesTypeExecution  from './CreateJobPropertiesTypeExecution';
import CreateJobPropertiesTypeHours  from './CreateJobPropertiesTypeHours';
import CreateJobPropertiesTypeMinutes  from './CreateJobPropertiesTypeMinutes';
import CreateJobPropertiesTypeUnknown  from './CreateJobPropertiesTypeUnknown';
import CreateJobPropertiesTypeAbsolute from './CreateJobPropertiesTypeAbsolute';

type CreateJobPropertiesType = {
  app:CreateJobPropertiesTypeApp[];
  liveStreaming:CreateJobPropertiesTypeLiveStreaming[];
  hours:CreateJobPropertiesTypeHours[];
  absolute:CreateJobPropertiesTypeAbsolute[];
  minutes:CreateJobPropertiesTypeMinutes[];
  unknown:CreateJobPropertiesTypeUnknown[];
  details:CreateJobPropertiesTypeDetails[];
  stopAt:CreateJobPropertiesTypeStopAt[];
  userId: string;
  appParamCount: any;
  name: CreateJobPropertiesTypeName[];
  execution:CreateJobPropertiesTypeExecution[];
};

export default CreateJobPropertiesType;
