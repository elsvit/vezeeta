import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AvatarEditor from 'react-avatar-editor';

import { GhostButton, Button, Icon, Title } from '../Components';
import Colors from '!!sass-variable-loader!../base/Colors.scss';
import './PhotoCropper.scss';

class PhotoCropper extends Component {
  constructor(props) {
    super(props);

    this.openFileDialog = this.openFileDialog.bind(this);
    this.loadPreview = this.loadPreview.bind(this);
    this.drawImageGuideLine = this.drawImageGuideLine.bind(this);
    this.setZoomImageValue = this.setZoomImageValue.bind(this);
    this.setImage = this.setImage.bind(this);
    this.cancelImage = this.cancelImage.bind(this);

    this.state = {
      zoomImage: 1.5
    };
  }

  /**
   * Opens file dialog
   */
  openFileDialog() {
    this.input.click();
  }

  /**
   * Loads the image from local device and load a preview
   */
  loadPreview() {
    if (this.input.files && this.input.files[0]) {
      let photo = this.input.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(photo);

      reader.onloadend = function() {
        this.props.updatePhoto({
          preview: this.props.photoPreview,
          crop: reader.result,
          isPhoto: false,
          showCropper: true
        });
      }.bind(this);
    }
  }

  /**
   * Draws the guide line in the crop area
   */
  drawImageGuideLine() {
    let c = document.getElementById('image-guide-lines');
    let ctx = c.getContext('2d');

    ctx.beginPath();
    ctx.moveTo(85, 0);
    ctx.lineTo(85, 150);
    ctx.lineWidth = 0.3;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(215, 0);
    ctx.lineTo(215, 150);
    ctx.lineWidth = 0.3;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, 114.5);
    ctx.lineTo(300, 114.5);
    ctx.lineWidth = 0.15;
    ctx.stroke();
  }

  /**
   * sets the scale value and its' style
   */
  setZoomImageValue() {
    this.setState({ zoomImage: Number(this.zoomImageRange.value) });

    let prefixBrowser = null;

    if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
      prefixBrowser = '::-webkit-slider-runnable-track';
    } else if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
      prefixBrowser = '::-moz-range-track';
    } else {
      prefixBrowser = '::-ms-track';
    }

    let style = (() => {
      let style = document.createElement('style');
      style.appendChild(document.createTextNode(''));
      document.head.appendChild(style);
      return style;
    })();

    this.zoomImageRange.oninput = () => {
      let value =
        (this.zoomImageRange.value - this.zoomImageRange.min) /
        (this.zoomImageRange.max - this.zoomImageRange.min);

      style.sheet.insertRule(
        `input[type=range]${prefixBrowser} { background: -ms-linear-gradient(left, ${Colors.vezeetaBlue} ${value}, ${Colors.mediumGrey} ${value})!important;
        background: -moz-linear-gradient(left, ${Colors.vezeetaBlue} ${value}, ${Colors.mediumGrey} ${value})!important;
        background: -o-linear-gradient(left, ${Colors.vezeetaBlue} ${value}, ${Colors.mediumGrey} ${value})!important;
        background: -webkit-gradient(linear,left top,right top,color-stop(${value}, ${Colors.vezeetaBlue}),color-stop(${value}, ${Colors.mediumGrey}))!important;
        background: -webkit-linear-gradient(left, ${Colors.vezeetaBlue} ${value}, ${Colors.mediumGrey} ${value})!important;
        background: linear-gradient(to right, ${Colors.vezeetaBlue} ${value}, ${Colors.mediumGrey} ${value})!important; }`,
        0
      );
    };

    this.zoomImageRange.onchange = () => {
      let value =
        (this.zoomImageRange.value - this.zoomImageRange.min) /
        (this.zoomImageRange.max - this.zoomImageRange.min);

      style.sheet.insertRule(
        `input[type=range]${prefixBrowser} { background: -ms-linear-gradient(left, ${Colors.vezeetaBlue} ${value}, ${Colors.mediumGrey} ${value})!important;
        background: -moz-linear-gradient(left, ${Colors.vezeetaBlue} ${value}, ${Colors.mediumGrey} ${value})!important;
        background: -o-linear-gradient(left, ${Colors.vezeetaBlue} ${value}, ${Colors.mediumGrey} ${value})!important;
        background: -webkit-gradient(linear,left top,right top,color-stop(${value}, ${Colors.vezeetaBlue}),color-stop(${value}, ${Colors.mediumGrey}))!important;
        background: -webkit-linear-gradient(left, ${Colors.vezeetaBlue} ${value}, ${Colors.mediumGrey} ${value})!important;
        background: linear-gradient(to right, ${Colors.vezeetaBlue} ${value}, ${Colors.mediumGrey} ${value})!important; }`,
        0
      );
    };
  }

  /**
   * sets the cropped image value and preview it
   */
  setImage() {
    this.imgCropTool.classList.add('hide');
    this.props.updatePhoto({
      preview: this.imageCropped.getImage().toDataURL(),
      crop: this.props.photoCrop,
      isPhoto: true,
      showCropper: false
    });
  }

  /**
   * Cancels the image that uploaded and doesn't crop it or preview it
   */
  cancelImage() {
    this.imgCropTool.classList.add('hide');
    this.props.updatePhoto({
      preview: this.props.photoPreview,
      crop: this.props.photoCrop,
      isPhoto: this.props.isPhoto,
      showCropper: false
    });
  }

  render() {
    if (this.props.showCropper) {
      this.imgCropTool.classList.remove('hide');
    }

    return (
      <div
        className="crop-container hide"
        ref={imgCropTool => (this.imgCropTool = imgCropTool)}
      >
        <div className="crop-image-tool-container">
          <input
            type="file"
            ref={input => (this.input = input)}
            accept=".png, .jpg, .jpeg"
            onChange={this.loadPreview}
          />
          <div className="header flex-row">
            <div className="center">
              <Title className="title">Upload Photo</Title>
            </div>
            <button className="close-btn" onClick={this.cancelImage}>
              <Icon name="close" width={14} color="#0070cd" />
            </button>
          </div>
          <div className="crop-area-container">
            <canvas id="image-guide-lines" />
            <AvatarEditor
              ref={imageCropped => (this.imageCropped = imageCropped)}
              image={this.props.photoCrop}
              width={200}
              height={200}
              border={50}
              borderRadius={100}
              color={[0, 0, 0, 0.3]} // RGBA
              scale={this.state.zoomImage}
              rotate={0}
              onImageReady={this.drawImageGuideLine}
            />
          </div>
          <div className="zoom-range-container">
            <label className="zoomLabel">Zoom</label>
            <input
              className="track_range"
              type="range"
              step="0.01"
              min="1"
              max="2"
              name="scale"
              ref={zoomImageRange => (this.zoomImageRange = zoomImageRange)}
              onChange={this.setZoomImageValue}
              value={this.state.zoomImage}
            />
          </div>
          <div className="btns-container">
            <div className="button-container">
              <GhostButton onClick={this.openFileDialog}>
                Change Photo
              </GhostButton>
            </div>
            <div className="button-container">
              <Button type="red" onClick={this.setImage}>
                Save And Crop
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PhotoCropper.propTypes = {
  photoPreview: PropTypes.string,
  photoCrop: PropTypes.string,
  isPhoto: PropTypes.bool,
  showCropper: PropTypes.bool,
  updatePhoto: PropTypes.func
};

export default PhotoCropper;
