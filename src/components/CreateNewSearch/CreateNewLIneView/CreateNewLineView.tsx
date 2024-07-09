import React, { useEffect, useState } from 'react';
import CreateNewLineCar from 'src/components/CreateNewSearch/CreateNewLineCar';
import CreateNewLineItem from 'src/components/CreateNewSearch/CreateNewLineItem';
import CreateNewLineHotel from 'src/components/CreateNewSearch/CreateNewLineHotel';
import CreateNewLineVacation from 'src/components/CreateNewSearch/CreateNewLineVacation';
import CreateNewLineFerry from 'src/components/CreateNewSearch/CreateNewLineFerry';
import CreateNewLineCruise from 'src/components/CreateNewSearch/CreateNewLineCruise';
import CreateNewLineSolution from 'src/components/CreateNewSearch/CreateNewLineSolution';
import CreateNewLineCyberPrice from 'src/components/CreateNewSearch/CreateNewLineCyberPrice';
import CreateNewLineAutopart from 'src/components/CreateNewSearch/CreateNewLineAutopart';
import CreateNewLineDrug from 'src/components/CreateNewSearch/CreateNewLineDrug';
import Spin from 'src/components/common/Spin';
import { AppIdResponse, getAppId } from 'src/api/applicationFilter';

export type CreateNewLineViewProps = {
  vertical?: string;
  searchName?: string;
  jobId?: any;
  addLineItem: any;
};

const CreateNewLineView: React.FC<CreateNewLineViewProps> = ({
  addLineItem,
  vertical,
  searchName,
  jobId,
}: CreateNewLineViewProps) => {
  const [fields, setFields] = useState<any>([]);

  useEffect(() => {
    setTimeout(() => {
    const fetch = async () => {
      const bAdminMode: boolean = localStorage.getItem('bAdminMode') === 'true';
      const response: AppIdResponse = await getAppId(bAdminMode);
      setFields(response.vertical);
    };
    fetch();
  },0);
  }, []);

  const getSearchWidget = (id: string | undefined, fields: any) => {
    const fieldConfigurable = fields.filter(
      (field: any) => id && (field.ID === id || field.name.toLowerCase() === id.toLowerCase()) && field.config
    )[0];

    if (fieldConfigurable) {
      return (
        <CreateNewLineDrug
          searchName={searchName}
          jobId={jobId}
          vertical={fieldConfigurable.name}
          appId={fieldConfigurable.ID}
        />
      );
    }
    if (id === '102' || id === 'Airfare' || id === 'Flights') {
      return <CreateNewLineItem addLineItem={addLineItem} vertical={vertical} searchName={searchName} jobId={jobId} />;
    }
    if (id === '106' || id === 'Carrental') {
      return <CreateNewLineCar addLineItem={addLineItem} vertical={vertical} searchName={searchName} jobId={jobId} />;
    }
    if (id === '107' || id === 'Hotel') {
      return <CreateNewLineHotel vertical={'107'} searchName={searchName} jobId={jobId} />;
    }
    if (id === '117' || id === 'Vacation') {
      return <CreateNewLineVacation searchName={searchName} jobId={jobId} vertical={'117'} />;
    }
    if (id === '151' || id === 'Ferry') {
      return <CreateNewLineFerry searchName={searchName} jobId={jobId} />;
    }
    if (id === '134' || id === 'Cruises') {
      return <CreateNewLineCruise searchName={searchName} jobId={jobId} />;
    }
    if (id === '104' || id === 'Custom') {
      return <CreateNewLineSolution searchName={searchName} jobId={jobId} />;
    }
    if (id === '120' || id === 'Cyberprice') {
      return <CreateNewLineCyberPrice searchName={searchName} jobId={jobId} vertical={'120'} />;
    }
    if (id === '163' || id === 'AutoPartsRA') {
      return <CreateNewLineAutopart searchName={searchName} jobId={jobId} vertical={'AutoPartsRA'} appId={'163'} />;
    }
    if (id === '162' || id === 'AudioBooks') {
      return <CreateNewLineAutopart searchName={searchName} jobId={jobId} vertical={'AudioBooks'} appId={'162'} />;
    }
    if (id === '159' || id === 'HomeGoods') {
      return <CreateNewLineAutopart searchName={searchName} jobId={jobId} vertical={'HomeGoods'} appId={'159'} />;
    }
    if (id === '161' || id === 'HomeImprovement') {
      return <CreateNewLineAutopart searchName={searchName} jobId={jobId} vertical={'HomeImprovement'} appId={'161'} />;
    }
    if (id === '164' || id === 'RA') {
      return <CreateNewLineAutopart searchName={searchName} jobId={jobId} vertical={'RA'} appId={'164'} />;
    }
  };

  return (
    <>
      {fields.length === 0 && <Spin spinning={true} />}
      {fields.length > 0 && getSearchWidget(vertical, fields)}
    </>
  );
};

export default CreateNewLineView;
