import React, {useEffect} from 'react';
import {
  Actionsheet,
  Badge,
  Box,
  Button,
  Column,
  Image,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  Text,
  TextArea,
  useDisclose,
} from 'native-base';
import {postApi} from 'hooks/axios';
import {Controller, useForm, FormProvider} from 'react-hook-form';
import {useUserStore} from 'store/user.store';
import useImageUpload from 'app/profile/hooks/useImageUpload';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Platform} from 'react-native';
import FormInput from 'components/FormInput';

const Profile = () => {
  const {profile, signOutWithToken, getProfileFromApi} = useUserStore();
  const {takePhoto} = useImageUpload();
  // const {data: groups} = useGetApi<ProfileGroups[]>('/users/profile/items');
  const [editingProfileData, setEditingProfileData] = React.useState<
    any | null
  >(null);
  const {isOpen, onOpen, onClose} = useDisclose();

  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = async date => {
    await postApi('/users/profile', {key: 'birth', value: date});
    getProfileFromApi();
    hideDatePicker();
  };

  const openEditSheet = (data: any) => () => {
    setEditingProfileData(data);
    onOpen();
  };

  const editSubmit = async data => {
    //const {key} = editingProfileData;
    console.log(data, 'data');
    //await postApi('/users/profile', {key, value: data.value});
    //getProfileFromApi();
  };

  const signOut = async () => {
    await signOutWithToken();
    // TODO navigation hook
    //navigation.navigate('SignIn');
  };

  const updatePhoto = async () => {
    await takePhoto();
    getProfileFromApi();
    // TODO toast
  };

  const methods = useForm();
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView>
        <Box p={3}>
          {profile && (
            <>
              <Box alignItems="center" mb={3}>
                <Button onPress={signOut} mb={3}>
                  로그아웃
                </Button>
                <Pressable onPress={updatePhoto}>
                  <Image
                    rounded="full"
                    source={{uri: profile.image}}
                    alt="myImage"
                    width={100}
                    height={100}></Image>
                  <Text my={3}>프로필 사진 수정</Text>
                </Pressable>
              </Box>
              <FormProvider {...methods}>
                <ProfileItem label="이름" name="name" value={profile.name} />
                <ProfileItem
                  label="자기소개"
                  name="description"
                  value={profile.description}
                />
                <ProfileItem label="생일" name="birth" value={profile.birth} />
                <Button onPress={methods.handleSubmit(editSubmit)} mb={3}>
                  프로필 저장
                </Button>
              </FormProvider>
            </>
          )}
          {/*{groups?.map((g, i) => (*/}
          {/*  <ProfilePluralItem*/}
          {/*    key={i}*/}
          {/*    label={g.name}*/}
          {/*    items={g.profileItems}*/}
          {/*    openSheet={openItemEditSheet(g.id, {*/}
          {/*      type: 'profileItem',*/}
          {/*      value: g.profileItems,*/}
          {/*    })}*/}
          {/*  />*/}
          {/*))}*/}
        </Box>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
        {/*<EditSheet*/}
        {/*  editSubmit={editSubmit}*/}
        {/*  isOpen={isOpen}*/}
        {/*  onClose={onClose}*/}
        {/*  profileData={editingProfileData}*/}
        {/*/>*/}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const ProfileItem = ({label, name, value, onPress}) => (
  <Box mb={2}>
    <Text fontSize="lg" fontWeight={800}>
      {label}
    </Text>
    <FormInput
      name={name}
      defaultValue={value}
      rules={{required: `${label}을 입력하세요`}}
    />
    {/*<Pressable*/}
    {/*  rounded="lg"*/}
    {/*  borderColor="gray.200"*/}
    {/*  borderWidth="1"*/}
    {/*  padding={3}*/}
    {/*  onPress={onPress}>*/}
    {/*  {value ? <Text>{value}</Text> : <Text>아직설정안함</Text>}*/}
    {/*</Pressable>*/}
  </Box>
);

const ProfilePluralItem = ({label, items, openSheet}) => (
  <Box mb={2}>
    <Text fontSize="lg" fontWeight={800}>
      {label}
    </Text>
    <Pressable
      rounded="lg"
      borderColor="gray.200"
      borderWidth="1"
      padding={3}
      alignItems="left"
      onPress={openSheet}>
      {items.length ? (
        items.map(i => (
          <Badge key={i.name} variant="profile">
            {i.name}
          </Badge>
        ))
      ) : (
        <Text color="gray.500">아직 설정 안함</Text>
      )}
    </Pressable>
  </Box>
);

const EditSheet = ({isOpen, onClose, profileData, editSubmit}) => {
  const {
    control,
    formState: {errors},
    register,
    handleSubmit,
    setValue,
  } = useForm();

  const submit = () => {
    handleSubmit(data => {
      editSubmit(data);
    })();
  };

  useEffect(() => {
    if (profileData) {
      setValue('value', profileData.value);
    }
  }, [profileData, setValue]);

  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content>
        {profileData && (
          <>
            <Text>{profileData?.name} 수정하기</Text>
            <Column p={3} space={3} w="100%" justifyContent="center">
              <Controller
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextArea
                    color="hotpink"
                    fontSize="2xl"
                    ref={register('value').ref}
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}></TextArea>
                )}
                name="value"
                defaultValue={profileData?.value}
              />
              {/*<Row space={2}>*/}
              {/*  {profileData?.items?.length &&*/}
              {/*    profileData?.items?.map(i => (*/}
              {/*      <Badge key={i.name} variant="profile">*/}
              {/*        {i.name}*/}
              {/*      </Badge>*/}
              {/*    ))}*/}
              {/*  <Text>{profileData?.value}</Text>*/}
              {/*</Row>*/}
              <Button variant="submit" onPress={submit}>
                저장하기
              </Button>
            </Column>
          </>
        )}
      </Actionsheet.Content>
    </Actionsheet>
  );
};

export default Profile;
