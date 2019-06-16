import React from 'react';

// Import typefaces
import 'typeface-montserrat';
import 'typeface-merriweather';
import FeatureImage from './FeatureImage';
import Description from './Description';
import Sources from './Sources';

class Intro extends React.Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          textAlign: 'center',
          maxWidth: '472px',
          margin: '0 auto'
        }}
      >
        <FeatureImage />

        <Description />

        <Sources />
      </div>
    );
  }
}

export default Intro;
