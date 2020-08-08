import { UploadFunc } from 'src/share/var';
import * as uuid from 'uuid/v4';
import getDecorated from './decorate';
import { isPromise } from './tool';

type urlFn = (imageText: string, itemsInfo: itemInfo[]) => string;
export type itemInfo = {
  kind: string
  type: string
  content: any
}
function getUploadPlaceholder(file: File, onImageUpload: UploadFunc, itemsInfo: itemInfo[]) {
  const placeholder = getDecorated('', 'image', {
    target: 'Uploading_' + uuid(),
    imageUrl: '',
  }).text;
  const uploaded = new Promise((resolve: (url: string) => void) => {
    let isCallback = true;
    const handleUploaded = (url: string | urlFn) => {
      if (isCallback) {
        console.warn('Deprecated: onImageUpload should return a Promise, callback will be removed in future');
      }
      const imageText = getDecorated('', 'image', {
        target: file.name,
        imageUrl: typeof url === 'function' ? '{url}' : url,
      }).text;
      resolve(typeof url === 'function' ? url(imageText, itemsInfo) : imageText);
    };
    // 兼容回调和Promise
    const upload = onImageUpload(file, handleUploaded);
    if (isPromise(upload)) {
      isCallback = false;
      upload.then(handleUploaded);
    }
  });
  return { placeholder, uploaded };
}

export default getUploadPlaceholder;
