import * as ImagePicker from 'expo-image-picker';

type ImagePickerAsset = ImagePicker.ImagePickerAsset;

export const convertImagePickerAssetToFile = async (
  asset: ImagePickerAsset
): Promise<File> => {
  if (!asset.uri) {
    throw new Error('Asset does not have a valid URI.');
  }

  const response = await fetch(asset.uri);
  const blob = await response.blob();

  const fileName =
    asset.fileName || `image.${asset.uri.split('.').pop() || 'jpg'}`;

  const mimeType = blob.type || 'image/jpeg';

  return new File([blob], fileName, { type: mimeType });
};
