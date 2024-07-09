import React, { ReactElement } from 'react';
import { GetFieldDecoratorOptions } from 'antd/lib/form/Form';
import { Select } from 'antd';
import FormFieldWrapper from 'src/components/CreateNewSearch/FormFieldWrapper';
import { useAutopartsBookmark } from 'src/api/autopartsBookmark';
import { Bookmark } from 'src/types/autoPartsBookmarks';
const { Option } = Select;

type CreateAutopartBookmarkProps = {
  getFieldDecorator<T extends Record<string | number | symbol, string>>(
    id: keyof T,
    options?: GetFieldDecoratorOptions
  ): (node: React.ReactNode) => React.ReactNode;
  site: string;
  vertical: string;
};

const CreateAutopartBookmark: React.FC<CreateAutopartBookmarkProps> = ({
  getFieldDecorator,
  site,
  vertical,

}: CreateAutopartBookmarkProps) => {
  const [bookmarkOptions]: Bookmark[][] = useAutopartsBookmark(site, vertical);

  const onSearchFilter = (input: string, option: ReactElement) => {
    const text: string = option && option.props && option.props.children ? option.props.children.toString() : '';
    return text.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };
  
  return (
    <FormFieldWrapper
      label={<h6>Bookmark</h6>}
      content={getFieldDecorator(
        'bookmark',
        {}
      )(
        <Select showArrow showSearch allowClear filterOption={onSearchFilter} placeholder="Please select Bookmark">
          {bookmarkOptions &&
            bookmarkOptions.map((bookmarkOption: Bookmark) => {
              return (
                <Option key={bookmarkOption.id} value={bookmarkOption.id}>
                  {bookmarkOption.name}
                </Option>
              );
            })}
        </Select>
      )}
    />
  );
};

export default CreateAutopartBookmark;
