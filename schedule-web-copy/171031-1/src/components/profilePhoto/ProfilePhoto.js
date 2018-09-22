import React, { Component } from 'react';

import { Tooltip } from '../Components';
import './ProfilePhoto.scss';

let instance = null;

class ProfilePhoto extends Component {
  constructor() {
    super();

    this.state = {
      image:
        'https://s3-eu-west-1.amazonaws.com/cdn-vezeetastaging/vezeeta-account/assets/user-placeholder.png'
    };

    if (!instance) {
      instance = this;
    }
  }

  /**
   * Set picture value
   * @param {picture base64 or url} picture
   */
  static setProfilePicture(picture) {
    instance.setState({
      image: picture
    });
  }

  /**
   * Show Profile Picture component
   */
  static showProfilePicture() {
    instance.profilePhoto.style.display = 'flex';
  }

  /**
   * hide Profile Picture component
   */
  static hideProfilePicture() {
    instance.profilePhoto.style.display = 'none';
  }

  /**
   * Show tooltip beside Profile Picture component
   */
  static showTooltip(message) {
    instance.tooltip.showTooltip(message);
  }

  render() {
    return (
      <div className="profile-photo">
        <div
          className="photo-container"
          ref={profilePhoto => (this.profilePhoto = profilePhoto)}
        >
          <img src={this.state.image} className="image" />
        </div>
        <Tooltip
          tooltipAlignment="bottom"
          ref={tooltip => (this.tooltip = tooltip)}
        />
      </div>
    );
  }
}

export default ProfilePhoto;
