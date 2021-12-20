import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

import { CM, CCS } from './shortcuts';

import svgChart from '../../static/img/lyrics.svg';
import svgLightning from '../../static/img/lightning.svg';
import svgSwap from '../../static/img/swap.svg';

const FeatureList = [
	{
		title: 'Completely free',
		Svg: svgChart,
		description: (
			<>
				Create or import chord charts, format them on your computer
				screen, print them, save them as PDF, or export them in your
				favorite songbook application. For free.
			</>
		),
	},
	{
		title: 'Powerful',
		Svg: svgLightning,
		description: (
			<>
				<CCS /> is the official editor of <CM />, the only chord charts
				format that allows encoding lyrics, chords AND rhythm
				information. Create chord grids in a snap!
			</>
		),
	},
	{
		title: 'ChordPro compatible',
		Svg: svgSwap,
		description: (
			<>
				<CCS /> can import and export songs in the ChordPro format for
				maximum compatibility with other software.
			</>
		),
	},
];

function Feature({ Svg, title, description }) {
	return (
		<div className={clsx('col col--4')}>
			<div className="text--center">
				<Svg className={styles.featureSvg} alt={title} />
			</div>
			<div className="text--center padding-horiz--md">
				<h3>{title}</h3>
				<p>{description}</p>
			</div>
		</div>
	);
}

export default function HomepageFeatures() {
	return (
		<section className={styles.features}>
			<div className="container">
				<div className="row">
					{FeatureList.map((props, idx) => (
						<Feature key={idx} {...props} />
					))}
				</div>
			</div>
		</section>
	);
}
