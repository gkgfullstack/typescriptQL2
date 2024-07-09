import React, { useState } from 'react';
import clsx from 'clsx';
import './Image.less';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type ImageProps = {
  className?: string;
  url: string;
  alt: string;
};

const Image: React.FC<ImageProps> = ({ className, alt, url }: ImageProps) => {
  const [imageVisible, setImageVisibility] = useState<boolean>(!!url);
  const handleError = () => {
    setImageVisibility(false);
  };
  return (
    <span className={clsx('image_container', className)}>
      {imageVisible ? (
        <img src={url} alt={alt} onError={handleError} />
      ) : (
        <span className={'no_picture'} title={alt} tabIndex={-1}>
          <FontAwesomeIcon icon={['fal', 'image']} className={'no_picture_icon'} />
        </span>
      )}
    </span>
  );
};

export default Image;
