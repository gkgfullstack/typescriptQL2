type ConfigureJobStatusTableInfo = {
  id: string;
  script: string | null;
  status: string;
  priority: string;
  started: string | null;
  completed: string | null;
  duration: string;
  files: string | null;
};

export default ConfigureJobStatusTableInfo;
