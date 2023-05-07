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
import Patterns from '../constants/Patterns';

export interface IHashtagPlaylistInputModalProps {
  visible: boolean;
  onRequestClose?: () => void;
  onSubmit?: (channelId: string, hashtagFilterExpression: string) => void;
}

type HashtagPlaylistInputFormData = {
  channelId: string;
  hashtagFilterExpression: string;
};

const HashtagPlaylistInputModal = ({
  visible,
  onRequestClose,
  onSubmit,
}: IHashtagPlaylistInputModalProps) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<HashtagPlaylistInputFormData>();

  const onUse = (data: HashtagPlaylistInputFormData) => {
    if (onSubmit) {
      onSubmit(data.channelId, data.hashtagFilterExpression);
    }
    reset();
  };

  let channelIdErrorMessage: string | undefined;
  if (errors.channelId) {
    if (errors.channelId.type === 'pattern') {
      channelIdErrorMessage = 'Please enter correct channel id';
    } else {
      channelIdErrorMessage = 'Please enter channel id';
    }
  }

  let hashtagFilterExpressionErrorMessage: string | undefined;
  if (errors.hashtagFilterExpression) {
    hashtagFilterExpressionErrorMessage =
      'Please enter hashtag filter expression';
  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        if (onRequestClose) {
          onRequestClose();
        }
        reset();
      }}
    >
      <TouchableWithoutFeedback onPress={() => {}}>
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
                    onChangeText={(newValue) => onChange(newValue)}
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
                    errorMessage={channelIdErrorMessage}
                    autoCompleteType={undefined}
                  />
                )}
                name="channelId"
                rules={{
                  required: true,
                  pattern: Patterns.channelId,
                }}
                defaultValue=""
              />
            </View>
            <View style={CommonStyles.formItem}>
              <Text style={CommonStyles.formItemTitle}>
                Hashtag filter expression
              </Text>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    placeholder="Enter hashtag filter expression"
                    onBlur={onBlur}
                    onChangeText={(newValue) => onChange(newValue)}
                    value={value}
                    rightIcon={
                      <TouchableOpacity
                        onPress={() => {
                          setValue('hashtagFilterExpression', '');
                        }}
                      >
                        <Ionicons name="close" size={24} />
                      </TouchableOpacity>
                    }
                    errorMessage={hashtagFilterExpressionErrorMessage}
                    autoCompleteType={undefined}
                  />
                )}
                name="hashtagFilterExpression"
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
                  reset();
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
    paddingHorizontal: 15,
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

export default HashtagPlaylistInputModal;
