import PropTypes from 'prop-types';
import React, { Fragment } from 'react';


const AUcardHeading = ({ text, size, fullwidth }) => {
	const HeadingContainer = `h${ size }`;

	return(
		<HeadingContainer className={ `au-display-${size}${ fullwidth ? ' au-card__fullwidth' : '' }` }>
			{ text }
		</HeadingContainer>
	);
};


const AUcardImage = ({ image, description, link, fullwidth }) => {
	let ImageContainer = 'div';
	let imageProps = {};

	if( link !== undefined ) {
		ImageContainer = 'a';
		imageProps = { href: link };
	}

	return(
		<ImageContainer { ...imageProps } className={ `au-card__image${ fullwidth ? ' au-card__fullwidth' : '' }` }>
			<img alt={ description } src={ image } />
		</ImageContainer>
	);
};


const AUcardContent = ({ text, fullwidth }) => (
	<p className={ `au-card__content${ fullwidth ? ' au-card__fullwidth' : '' }` }>{ text }</p>
);


const AUcardRaw = ({ html, fullwidth }) => (
	<div className={ `au-card__raw${ fullwidth ? ' au-card__fullwidth' : '' }` }>
		{ html }
	</div>
);


const AUcardLine = ({ fullwidth }) => (
	<hr className={ `au-card__line${ fullwidth ? ' au-card__fullwidth' : '' }` } />
);


const AUcardCTA = ({ text, link, fullwidth }) => {
	let CTAContainer = 'div';
	let CTAProps = {};

	if( link !== undefined ) {
		CTAContainer = 'a';
		CTAProps = { href: link };
	}

	return(
		<CTAContainer { ...CTAProps } className={ `au-card__cta${ fullwidth ? ' au-card__fullwidth' : '' }` }>
			{ text }
		</CTAContainer>
	);
};


/**
 * The card component
 */
const AUcard = ({ cardRows, link, shadow, centered }) => {

	let CardContainer = 'div';
	let cardProps = {};

	if( link !== undefined ) {
		CardContainer = 'a';
		cardProps = { href: link };
	}

	const CardComponents = {
		line: AUcardLine,
		cta: AUcardCTA,
		image: AUcardImage,
		heading: AUcardHeading,
		content: AUcardContent,
		raw: AUcardRaw,
	}

	const items = [];
	cardRows.map( cardRow => {

		// If the parent is a link remove link
		if( CardContainer === 'a' ){
			delete cardRow.link;
		}

		// Create an object to make the component
		items.push({
			component: CardComponents[ cardRow.type ],
			props: cardRow
		});
	});

	return (
		<CardContainer { ...cardProps } className={
			`au-card ${ shadow ? ' au-card--shadow' : '' }` +
			`${ centered ? ' au-card--centered': '' }`
		}>
			{ items.map( ( item, i ) =>
				<item.component { ...item.props } key={ i } />
			)}
		</CardContainer>
	);
}

AUcard.propTypes = {

};


/**
 * The CardList component
 */
const AUcardList = ({ items, columnSize, matchheight, centered, shadow }) => {

	return (
		<ul className={ `au-card-list${ matchheight ? ' au-card-list--matchheight' : '' }` }>
			{ items.map( ( item, i ) =>
				<li key={ i } className={ columnSize } >
					<AUcard
						cardRows={ item.cardRows }
						link={ item.link }
						shadow={ item.shadow || shadow }
						centered={ item.centered || centered } />
				</li>
			)}
		</ul>
	);
};


export {
	AUcard,
	AUcardList
};
