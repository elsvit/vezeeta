import React, { Component } from 'react';

import { Tooltip } from '../../index';
import './ProfilePhoto.scss';

let instance = null;

class ProfilePhoto extends Component {
  /**
   * Set picture value
   * @param {picture base64 or url} picture
   */
  static setProfilePicture(picture) {
    if (picture !== undefined) {
      instance.setState({
        image: picture,
      });
    }
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

  constructor() {
    super();

    this.state = {
      image:
        'https://s3-eu-west-1.amazonaws.com/cdn-vezeetastaging/vezeeta-account/assets/user-placeholder.png',
    };

    if (!instance) {
      instance = this;
    }
  }

  render() {
    return (
      <div className="profile-photo">
        <div
          className="photo-container"
          ref={(profilePhoto) => {
            this.profilePhoto = profilePhoto;
          }}
        >
          <img src={this.state.image} className="image" alt="doctor" />
        </div>
        <Tooltip
          tooltipAlignment="bottom"
          ref={(tooltip) => {
            this.tooltip = tooltip;
          }}
        />
      </div>
    );
  }
}

export default ProfilePhoto;
