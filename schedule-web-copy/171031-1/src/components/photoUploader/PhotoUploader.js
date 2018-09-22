import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { PhotoInput, PhotoCropper } from '../Components';

class PhotoUploader extends Component {
  constructor(props) {
    super(props);

    this.updatePhoto = this.updatePhoto.bind(this);
    let imgPlaceholder =
      'https://s3-eu-west-1.amazonaws.com/cdn-vezeetastaging/vezeeta-account/assets/img-placeholder.png';

    this.state = {
      preview: this.props.value || imgPlaceholder,
      crop: this.props.value || imgPlaceholder,
      isPhoto: this.props.value !== undefined ? true : false,
      showCropper: false
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
    let { preview, crop, isPhoto, showCropper } = newData;
    this.setState({
      preview: preview,
      crop: crop,
      isPhoto: isPhoto,
      showCropper: showCropper
    });

    let extension = crop.substring(
      'data:image/'.length,
      crop.indexOf(';base64')
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
          ref={PhotoInput => (this.photoInput = PhotoInput)}
        />
        <PhotoCropper
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
  value: PropTypes.string,
  showCropper: PropTypes.bool,
  setData: PropTypes.func
};

export default PhotoUploader;
