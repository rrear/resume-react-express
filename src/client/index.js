import React from 'react';
import { render } from 'react-dom';
//import 'bootstrap/dist/css/bootstrap.min.css';
// import routes from './routes'
import ResumeLongForm from './components/ui/Resume';
window.React = React

render(//	routes, 
    <ResumeLongForm />,
    document.getElementById('react-container')
)
