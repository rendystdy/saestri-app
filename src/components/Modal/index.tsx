import {
  StyleSheet, Text, View, Modal, TouchableOpacity,
} from 'react-native';
import React from 'react';
import { Colors, Images } from '@constant';

interface IModalProps {
  visible: boolean,
  onPressBack: () => void,
  textContent: string,
  onPressClose: () => void,
  onPressAgree: () => void,
  titleBack?: string,
  titleAgree: string;
}

const ModalInformation: React.FC<IModalProps> = ({ visible, onPressBack, textContent, onPressAgree, onPressClose, titleAgree, titleBack }) => {

  return (
    <View style={ styles.container }>
      <Modal
        animationType='fade'
        transparent={ true }
        visible={ visible }
        onRequestClose={ onPressBack }>
        <View style={ styles.centeredView }>
          <View style={ styles.modalView }>
            <View style={ styles.icWarning }>
              <Images.ic_warning
                height={ 25 }
                width={ 25 } />
            </View>
            <Text style={ styles.modalText }>{ textContent }</Text>
            <View style={ styles.row }>
              { titleBack && <TouchableOpacity
                style={ [styles.button, { backgroundColor: Colors.white.default, borderWidth: 2, borderColor: Colors.blue.light }] }
                onPress={ onPressClose }>
                <Text style={ [styles.textStyle, { color: Colors.blue.light }] }>{ titleBack }</Text>
              </TouchableOpacity> }
              <TouchableOpacity
                style={ styles.button }
                onPress={ onPressAgree }>
                <Text style={ styles.textStyle }>{ titleAgree }</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ModalInformation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    zIndex: 100,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0, 0.5)',

  },
  modalView: {
    backgroundColor: Colors.white.default,
    width: 364,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 19,
    paddingHorizontal: 35,
  },
  modalText: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '500',
    color: Colors.gray.darkGray,
    marginBottom: 26,
  },
  button: {
    backgroundColor: Colors.blue.light,
    paddingHorizontal: 8,
    paddingVertical: 10,
    borderRadius: 16,
    width: 112,
    // height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    color: Colors.white.default,
    fontWeight: '700',
    textAlign: 'center',
  },
  icWarning: {
    width: 40,
    height: 40,
    backgroundColor: Colors.pink.default,
    borderRadius: 40 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 26,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
  },
});
