import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import Page from './Page';


function getDomDimension(Component, props, measuringFn) {
	const container = document.createElement('div');
	container.classList.add('.measuring-node');
	document.body.appendChild(container);

	return new Promise(resolve => {
		ReactDOM.render(<Component {...props} />, container, () => {

			const measure = measuringFn(container);

			ReactDOM.unmountComponentAtNode(container);
			container.parentNode.removeChild(container);

			resolve(measure);
		});
	});
}


function getAllLinesHeight(container) {
	const allLinesHeight = [];
	container.querySelectorAll('.ucc-line').forEach(line => {
		allLinesHeight.push(getOuterHeight(line));
	});
	return allLinesHeight;
}


function getOuterHeight(el) {
	let height = el.offsetHeight;
	const style = getComputedStyle(el);

	height += parseInt(style.marginTop) + parseInt(style.marginBottom);
	return height;
}


function getPageHeight(container) {
	const pageContent = container.querySelector('.printPreview-pageContent');
	return pageContent.offsetHeight;
}



function AllPages(props) {
	const [ allLinesHeight, setAllLinesHeight ] = useState([]);
	const [ pageHeight, setPageHeight ] = useState(0);

	const { allLines } = props;

	const songParts = [];

	if (pageHeight > 0) {
		let acc = 0;
		let partIndex = 0;

		songParts[partIndex] = [];
		allLinesHeight.forEach((lineHeight, index) => {
			acc += lineHeight;
			if (acc > pageHeight) {
				acc = 0;
				partIndex++;
				songParts[partIndex] = [];
			}
			songParts[partIndex].push(allLines[index]);
		});
	}

	useEffect(() => {
		const getDimensions = async () => {
			const linesHeight = await getDomDimension(Page, { pageLines: allLines }, getAllLinesHeight);
			const pHeight = await getDomDimension(Page, {} , getPageHeight);
			setAllLinesHeight(linesHeight);
			setPageHeight(pHeight);
		};
		getDimensions();
	}, [allLines]);

	const allPagesRendered = songParts.map((partLines, index) => {
		return <Page key={index} pageLines={partLines} />;
	});

	return (
		<React.Fragment>
			{allPagesRendered}
		</React.Fragment>
	);
}

AllPages.propTypes = {
	allLines: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default AllPages;
