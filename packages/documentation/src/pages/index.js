import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import HomepageFeatures from '../components/HomepageFeatures';
import useBaseUrl from '@docusaurus/useBaseUrl';
import ImageGallery from 'react-image-gallery';

function HomepageHeader() {
	const { siteConfig } = useDocusaurusContext();
	return (
		<header className={clsx('hero hero--primary', styles.heroBanner)}>
			<div className="container">
				<div className={'logo_homepage'}>
					<svg>
						<title>Chord Chart Studio</title>
						<use href={'/img/logo.svg#stacked'}></use>
					</svg>
				</div>
				<p className="hero__subtitle">{siteConfig.tagline}</p>
				<div className={styles.buttonsContainer}>
					<span className={styles.buttons}>
						<Link
							className="button button--secondary button--lg"
							to="/docs/overview"
						>
							Read the docs
						</Link>
					</span>
					<span className={styles.buttons}>
						<Link
							className="button button--secondary button--lg"
							to="https://chord-chart-studio.netlify.app/app"
						>
							Launch the app
						</Link>
					</span>
				</div>

				<br />
			</div>
		</header>
	);
}

export default function Home() {
	const { siteConfig } = useDocusaurusContext();

	const images = [
		{
			original: useBaseUrl('/img/screenshot1.png'),
			thumbnail: useBaseUrl('/img/screenshot1_thumb.png'),
		},
		{
			original: useBaseUrl('/img/screenshot2.png'),
			thumbnail: useBaseUrl('/img/screenshot2_thumb.png'),
		},
		{
			original: useBaseUrl('/img/screenshot3.png'),
			thumbnail: useBaseUrl('/img/screenshot3_thumb.png'),
		},
		{
			original: useBaseUrl('/img/screenshot4.png'),
			thumbnail: useBaseUrl('/img/screenshot4_thumb.png'),
		},
		{
			original: useBaseUrl('/img/screenshot5.png'),
			thumbnail: useBaseUrl('/img/screenshot5_thumb.png'),
		},
	];

	return (
		<Layout
			title={`${siteConfig.title}`}
			description={`${siteConfig.tagline}`}
		>
			<HomepageHeader />
			<main>
				<HomepageFeatures />
				<div className={styles.ccsImageGallery}>
					<ImageGallery items={images} showPlayButton={false} />
				</div>
			</main>
		</Layout>
	);
}
