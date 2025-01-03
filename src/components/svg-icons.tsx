import UploadImgIcon from '@src/assets/icons/add-image-outlined.svg';
import CameraIcon from '@src/assets/icons/camera.svg';
import FaceRecognitionList from '@src/assets/icons/face-recognition-list.svg';
import FaceRecognitionIcon from '@src/assets/icons/face-recognition.svg';
import HouseHomeIcon from '@src/assets/icons/house.svg';
import SecurityCameraIcon from '@src/assets/icons/security-camera.svg';
import React from 'react';
import { SvgProps } from 'react-native-svg';

export const iconsMap = {
  'upload-image': UploadImgIcon,
  house: HouseHomeIcon,
  'security-camera': SecurityCameraIcon,
  'face-recognition': FaceRecognitionIcon,
  camera: CameraIcon,
  'face-recognition-list': FaceRecognitionList,
};

type TIconProps = {
  name: keyof typeof iconsMap;
} & SvgProps;

export type TIconNames = keyof typeof iconsMap;

export const SvgIcon = ({ name, ...props }: TIconProps) => {
  const IconComponent = iconsMap[name];

  return <IconComponent {...props} />;
};
