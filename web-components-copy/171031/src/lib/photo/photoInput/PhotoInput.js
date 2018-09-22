import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Icon, Text } from '../../index';
import Colors from '!!sass-variable-loader!../../shared/Colors.scss'; // eslint-disable-line
import './PhotoInput.scss';

class PhotoInput extends Component {
  constructor(props) {
    super(props);

    this.openFileDialog = this.openFileDialog.bind(this);
    this.showCropperTool = this.showCropperTool.bind(this);
    this.uploadPhoto = this.uploadPhoto.bind(this);
    this.showErrorMessage = this.showErrorMessage.bind(this);

    this.state = {
      isDanger: false,
      errorMessage: '',
    };
  }

  /**
   * Returns the photo object
   */
  getInputValue() {
    return this.img.src;
  }

  /**
   * Show error message
   */
  showErrorMessage(message) {
    this.setState({
      isDanger: true,
      errorMessage: message,
    });
  }

  /**
   * Opens file dialog
   */
  openFileDialog() {
    this.input.click();
  }

  /**
   * Show cropper tool
   */
  showCropperTool() {
    if (this.input.files && this.input.files[0]) {
      const photo = this.input.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(photo);

      reader.onloadend = () => {
        this.props.updatePhoto({
          preview: this.props.photoPreview,
          crop: reader.result,
          isPhoto: this.props.isPhoto,
          showCropper: true,
        });
      };
    }
  }

  /**
   * Check if open file dialog or image cropper tool
   */
  uploadPhoto() {
    if (this.props.isPhoto) {
      this.props.updatePhoto({
        preview: this.props.photoPreview,
        crop: this.props.photoCrop,
        isPhoto: this.props.isPhoto,
        showCropper: true,
      });
    } else {
      this.input.click();
    }
  }

  render() {
    let showErrorMessageClass;
    let icon;

    if (this.state.isDanger) {
      showErrorMessageClass = 'show-error-message';
    } else {
      showErrorMessageClass = '';
    }

    if (this.props.isPhoto) {
      icon = '';
    } else {
      icon = <Icon name="camera" height={42} color={Colors.vezeetaBlue} />;
    }

    return (
      <div className="upload-photo-container">
        <div
          className="upload-photo"
          onClick={this.uploadPhoto}
          onKeyDown={() => {}}
        >
          <img
            src={this.props.photoPreview}
            ref={(img) => {
              this.img = img;
            }}
            alt="doctor"
          />
          {icon}
          <input
            className="hide"
            type="file"
            ref={(input) => {
              this.input = input;
            }}
            accept=".png, .jpg, .jpeg"
            onChange={this.showCropperTool}
          />
        </div>

        <Text className={`error-message ${showErrorMessageClass}`}>
          {this.state.errorMessage}
        </Text>
      </div>
    );
  }
}

PhotoInput.propTypes = {
  photoPreview: PropTypes.string,
  photoCrop: PropTypes.string,
  isPhoto: PropTypes.bool,
  updatePhoto: PropTypes.func,
};

export default PhotoInput;
