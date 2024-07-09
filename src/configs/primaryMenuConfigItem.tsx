export type primaryMenuConfigItem = {
    label: string;
    icon: JSX.Element;
    path?: string;
    className?: string;
    children?: Array<primaryMenuConfigItem>;
    id?:any;
  };