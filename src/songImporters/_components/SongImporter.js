import './SongImporter.scss';

import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../ui/_components/Button';

function SongImporter(props) {
	const { closeModal } = props;

	return (
		<div className={'sim-SongImporterModal_Container'}>
			<div className={'sim-TabSwitcher_Container'}>
				<div className={'sim-TabSwitcher_Item'}>From text</div>
			</div>
			<div className={'sim-TwoColumns_Container'}>
				<div className={'sim-Column_Container'}>
					<input type={'file'} />
					<br />
					Or copy/paste:
					<br />
					<textarea className={'sim-Input_Textarea'}></textarea>
				</div>
				<div className={'sim-Column_Container'}>
					<div className={'sim-InputFormat'}>
						Input format:
						<input
							className={'sim-InputFormat_Item'}
							type={'radio'}
							name={'inputFormat'}
							id={'input-cp'}
							value={'chordpro'}
						/>
						<label htmlFor={'input-cp'}>ChordPro</label>
						<input
							className={'sim-InputFormat_Item'}
							type={'radio'}
							name={'inputFormat'}
							id={'input-ug'}
							value={'ultimateGuitar'}
						/>
						<label htmlFor={'input-ug'}>Ultimate Guitar</label>
						<input
							className={'sim-InputFormat_Item'}
							type={'radio'}
							name={'inputFormat'}
							id={'input-other'}
							value={'other'}
						/>
						<label htmlFor={'input-other'}>Other</label>
						<div className={'sim-Preview_Container'}>Preview</div>
					</div>
				</div>
			</div>
			<div className={'sim-ActionBar_Container'}>
				<Button
					onClick={closeModal}
					buttonName={'cancel'}
					type={'secondary'}
				>
					CANCEL
				</Button>
				<Button
					onClick={closeModal}
					buttonName={'import'}
					type={'primary'}
					isDisabled={true}
				>
					IMPORT
				</Button>
			</div>
		</div>
	);
}

SongImporter.propTypes = {
	closeModal: PropTypes.func.isRequired,
};

SongImporter.defaultProps = {};

export default SongImporter;
