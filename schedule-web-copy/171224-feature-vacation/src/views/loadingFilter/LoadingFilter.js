import React from 'react';
import { LazyLoading } from '@vezeeta/web-components';

import './LoadingFilter.scss';

function LoadingFilter() {
  return (
    <LazyLoading>
      <div className="no-animation filter">
        <div className="no-animation filter-section">
          <div className="text" />
        </div>

        <div className="no-animation filter-section">
          <div className="no-animation filter-item">
            <div className="photo" />
            <div className="text" />
          </div>
          <div className="no-animation filter-item">
            <div className="photo" />
            <div className="text" />
          </div>
          <div className="no-animation filter-item">
            <div className="photo" />
            <div className="text" />
          </div>
        </div>

        <div className="no-animation filter-section">
          <div className="no-animation filter-item">
            <div className="photo" />
            <div className="text" />
          </div>
          <div className="no-animation filter-item">
            <div className="photo" />
            <div className="text" />
          </div>
          <div className="no-animation filter-item">
            <div className="photo" />
            <div className="text" />
          </div>
        </div>
      </div>
    </LazyLoading>
  );
}

export default LoadingFilter;
