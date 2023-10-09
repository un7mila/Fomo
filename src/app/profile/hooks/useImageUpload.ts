import ImagePicker, {Image} from 'react-native-image-crop-picker';
import ImageResizer from 'react-native-image-resizer';
import {postApi, usePostApi} from 'hooks/axios';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import {Alert, Linking, Platform} from 'react-native';
import React from 'react';

const useImageUpload = () => {
  usePermissions();
  const uploadMutation = usePostApi<string, any>('/users/upload/image');
  return {
    async takePhoto() {
      const res = await onTakePhoto();
      const formData = new FormData();
      formData.append('photo', res);
      const result = await postApi<string>(
        '/users/profile/upload/image',
        formData,
      );
      return result;
    },
    async pickPhoto() {
      const res = await onChangeFile();
      const result = await uploadMutation.mutateAsync(res);
      return result;
    },
  };
};

const onTakePhoto = () => {
  return ImagePicker.openCamera({
    includeBase64: true,
    includeExif: true,
    saveToPhotos: true,
  }).then(resize);
};

const onChangeFile = () => {
  return ImagePicker.openPicker({
    includeExif: true,
    includeBase64: true,
    mediaType: 'photo',
  }).then(resize);
};

const resize = async (response: Image) => {
  console.log(response.width, response.height, response.exif);
  //setPreview({uri: `data:${response.mime};base64,${response.data}`});
  const orientation = (response.exif as any)?.Orientation;
  console.log('orientation', orientation);
  return ImageResizer.createResizedImage(
    response.path,
    600,
    600,
    response.mime.includes('jpeg') ? 'JPEG' : 'PNG',
    100,
    0,
  ).then(r => ({
    uri: r.uri,
    name: r.name,
    type: response.mime,
  }));
};

function usePermissions() {
  // 권한 관련
  React.useEffect(() => {
    if (Platform.OS === 'android') {
      check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
        .then(result => {
          console.log('check location', result);
          if (result === RESULTS.BLOCKED || result === RESULTS.DENIED) {
            Alert.alert(
              '이 앱은 위치 권한 허용이 필요합니다.',
              '앱 설정 화면을 열어서 항상 허용으로 바꿔주세요.',
              [
                {
                  text: '네',
                  onPress: () => Linking.openSettings(),
                },
                {
                  text: '아니오',
                  onPress: () => console.log('No Pressed'),
                  style: 'cancel',
                },
              ],
            );
          }
        })
        .catch(console.error);
    } else if (Platform.OS === 'ios') {
      check(PERMISSIONS.IOS.LOCATION_ALWAYS)
        .then(result => {
          if (result === RESULTS.BLOCKED || result === RESULTS.DENIED) {
            Alert.alert(
              '이 앱은 백그라운드 위치 권한 허용이 필요합니다.',
              '앱 설정 화면을 열어서 항상 허용으로 바꿔주세요.',
              [
                {
                  text: '네',
                  onPress: () => Linking.openSettings(),
                },
                {
                  text: '아니오',
                  onPress: () => console.log('No Pressed'),
                  style: 'cancel',
                },
              ],
            );
          }
        })
        .catch(console.error);
    }
    if (Platform.OS === 'android') {
      check(PERMISSIONS.ANDROID.CAMERA)
        .then(result => {
          if (result === RESULTS.DENIED || result === RESULTS.GRANTED) {
            return request(PERMISSIONS.ANDROID.CAMERA);
          } else {
            console.log(result);
            throw new Error('카메라 지원 안 함');
          }
        })
        .catch(console.error);
    } else {
      check(PERMISSIONS.IOS.CAMERA)
        .then(result => {
          if (
            result === RESULTS.DENIED ||
            result === RESULTS.LIMITED ||
            result === RESULTS.GRANTED
          ) {
            return request(PERMISSIONS.IOS.CAMERA);
          } else {
            console.log(result);
            throw new Error('카메라 지원 안 함');
          }
        })
        .catch(console.error);
    }
  }, []);
}

export default useImageUpload;
