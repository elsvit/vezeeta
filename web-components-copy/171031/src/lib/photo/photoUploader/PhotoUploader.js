import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { PhotoInput, PhotoCropper } from '../../index';

// TODO: add action to showCropper prop

class PhotoUploader extends Component {
  constructor(props) {
    super(props);

    this.updatePhoto = this.updatePhoto.bind(this);
    const imgPlaceholder =
      'https://s3-eu-west-1.amazonaws.com/cdn-vezeetastaging/vezeeta-account/assets/img-placeholder.png';

    this.state = {
      preview: this.props.value || imgPlaceholder,
      crop: this.props.value || imgPlaceholder,
      isPhoto: this.props.value !== undefined,
      showCropper: false,
    };
  }

  /**
  * Returns the current value of the uploaded photo
  */
  getInputValue() {
    this.photoInput.getInputValue();
  }

  /**
   * Takes an object and updates it in the component's state
   * @param {object} newData
   */
  updatePhoto(newData) {
    const {
      preview, crop, isPhoto, showCropper,
    } = newData;
    this.setState({
      preview,
      crop,
      isPhoto,
      showCropper,
    });

    const extension = crop.substring(
      'data:image/'.length,
      crop.indexOf(';base64'),
    );

    if (this.props.setData) {
      this.props.setData(preview, extension);
    }
  }

  render() {
    return (
      <div>
        <PhotoInput
          photoPreview={this.state.preview}
          photoCrop={this.state.crop}
          isPhoto={this.state.isPhoto}
          showCropper={this.state.showCropper}
          updatePhoto={this.updatePhoto}
          ref={(photoInput) => {
            this.photoInput = photoInput;
          }}
        />
        <PhotoCropper
          rangeClassName={this.props.className}
          photoPreview={this.state.preview}
          photoCrop={this.state.crop}
          isPhoto={this.state.isPhoto}
          showCropper={this.state.showCropper}
          updatePhoto={this.updatePhoto}
        />
      </div>
    );
  }
}

PhotoUploader.propTypes = {
  className: PropTypes.string.isRequired,
  value: PropTypes.string,
  showCropper: PropTypes.bool, // eslint-disable-line
  setData: PropTypes.func,
};

PhotoUploader.defaultProps = {
  showCropper: true,
};

export default PhotoUploader;
