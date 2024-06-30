import React from 'react';
import PropTypes from 'prop-types';

Editor.propTypes = {
  content: PropTypes.string.isRequired,
  setContent: PropTypes.func.isRequired,
};

function Editor({ content, setContent }) {
  return <React.Fragment>
    <h1>Editor</h1>
  </React.Fragment>;
}

export default Editor;
