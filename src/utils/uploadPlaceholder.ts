import { UploadFunc, itemInfo } from 'src/share/var';
import * as uuid from 'uuid/v4';
import getDecorated from './decorate';

function getUploadPlaceholder(file: File, onImageUpload: UploadFunc, itemsInfo: itemInfo[]) {
  const placeholder = getDecorated('', 'image', {
    target: 'Uploading_' + uuid(),
    imageUrl: '',
  }).text;
  const imageText = getDecorated('', 'image', {
    target: file.name,
    imageUrl: '{url}',
  }).text;
  const uploaded = onImageUpload(file, imageText, itemsInfo);
  return { placeholder, uploaded };
}

export default getUploadPlaceholder;
