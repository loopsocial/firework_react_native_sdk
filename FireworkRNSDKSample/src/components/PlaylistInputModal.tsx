import CommonStyles from './CommonStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';
import { Button, Input } from 'react-native-elements';
import { Controller, useForm } from 'react-hook-form';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
} from 'react-native';

export interface IPlaylistInputModalProps {
  visible: boolean;
  onRequestClose?: () => void;
  onSubmit?: (channelId: string, playlistId: string) => void;
}

type PlaylistInputFormData = {
  channelId: string;
  playlistId: string;
};

const PlaylistInputModal = ({
  visible,
  onRequestClose,
  onSubmit,
}: IPlaylistInputModalProps) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PlaylistInputFormData>();

  const onUse = (data: PlaylistInputFormData) => {
    if (onSubmit) {
      onSubmit(data.channelId, data.playlistId);
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        if (onRequestClose) {
          onRequestClose();
        }
      }}
    >
      <TouchableWithoutFeedback
        onPress={() => {
          if (onRequestClose) {
            onRequestClose();
          }
        }}
      >
        <View style={styles.content}>
          <View
            style={{
              ...CommonStyles.formContainer,
              ...styles.formContainerExtra,
            }}
          >
            <View style={CommonStyles.formItem}>
              <Text style={CommonStyles.formItemTitle}>Channel id</Text>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    placeholder="Enter channel id"
                    onBlur={onBlur}
                    onChangeText={(value) => onChange(value)}
                    value={value}
                    rightIcon={
                      <TouchableOpacity
                        onPress={() => {
                          setValue('channelId', '');
                        }}
                      >
                        <Ionicons name="close" size={24} />
                      </TouchableOpacity>
                    }
                    errorMessage={
                      errors.channelId ? 'Please enter channel id' : undefined
                    }
                    autoCompleteType={undefined}
                  />
                )}
                name="channelId"
                rules={{
                  required: true,
                }}
                defaultValue=""
              />
            </View>
            <View style={CommonStyles.formItem}>
              <Text style={CommonStyles.formItemTitle}>Playlist id</Text>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    placeholder="Enter playlist id"
                    onBlur={onBlur}
                    onChangeText={(value) => onChange(value)}
                    value={value}
                    rightIcon={
                      <TouchableOpacity
                        onPress={() => {
                          setValue('playlistId', '');
                        }}
                      >
                        <Ionicons name="close" size={24} />
                      </TouchableOpacity>
                    }
                    errorMessage={
                      errors.playlistId ? 'Please enter playlist id' : undefined
                    }
                    autoCompleteType={undefined}
                  />
                )}
                name="playlistId"
                rules={{
                  required: true,
                }}
                defaultValue=""
              />
            </View>
            <View style={{ ...CommonStyles.formItem, ...styles.buttonList }}>
              <Button
                titleStyle={CommonStyles.mainButtonText}
                containerStyle={{
                  ...CommonStyles.mainButtonContainer,
                  flex: 1,
                  marginRight: 20,
                }}
                type="outline"
                onPress={() => {
                  if (onRequestClose) {
                    onRequestClose();
                  }
                }}
                title="Cancel"
              />
              <Button
                titleStyle={CommonStyles.mainButtonText}
                containerStyle={{
                  ...CommonStyles.mainButtonContainer,
                  flex: 1,
                }}
                onPress={handleSubmit(onUse)}
                title="Use"
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    paddingHorizontal: 20,
  },
  formContainerExtra: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 30,
  },
  buttonList: {
    flexDirection: 'row',
  },
});

export default PlaylistInputModal;
