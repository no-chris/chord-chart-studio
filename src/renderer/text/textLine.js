import textLineTpl from './textLine.hbs';

export default {
	render(textLine) {
		textLine = (textLine === '') ? '&nbsp;' : textLine;
		return textLineTpl({ textLine });
	}
};