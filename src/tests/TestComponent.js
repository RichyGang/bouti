import React from 'react';
import './index.css'

const TestComponent = (props) => {
    return (
        <div className="classTest">
            {props.children}
        </div>
    );
};

export default TestComponent;
