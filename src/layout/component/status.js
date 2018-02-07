import AUlinkList                               from '../../_uikit/layout/link-list';
import AUheading                                from '../../_uikit/layout/headings';
import Contributors                             from './contributors';
import GetData, { GetComponentValue, GetState } from '../getData';

import React, { Fragment }                      from 'react';
import PropTypes                                from 'prop-types';

/**
 * The Component Status
 */
const ComponentStatus = ({ module, _ID, _relativeURL, _parseYaml }) => {

	const component = GetData({
		filter: ( key, COMPONENTS ) => COMPONENTS[ key ].ID === module,
		yaml: _parseYaml,
	})[ 0 ];


	/**
	 * NameIdMenu - Create a menu from a value that matches an array
	 *
	 * @param {string} value - The value to match
	 */
	const NameIdMenu = ( value, url = '' ) => {
		const menuItems = [];

		component[ value ].map( item => {

			menuItems.push({
				link: _relativeURL( `/components/${ url }${ item }`, _ID ),
				text: GetComponentValue( item, 'name', _parseYaml ) || item.charAt( 0 ).toUpperCase() + item.slice( 1 ).toLowerCase()
			})
		})

		return <AUlinkList className="component-status__definition__list" inline items={ menuItems } inline/>;
	}


	let dependencies;
	let tags;

	if( component.tags ) {
		tags = NameIdMenu( 'tags', 'search/?text=' );
	}

	if( component.dependencies ) {
		dependencies = NameIdMenu( 'dependencies' );
	}


	return (
		<div className={ `component-status component-status--${ component.state }` }>

			<AUheading size="sm" level="2" className="component-status__title">
				{ GetState( component.state ) }
				{
					component.state === 'published'
						? <span className="badge">v{ component.version }</span>
						: null
				}
			</AUheading>

			<dl className="component-status__definition">
				<dt>History</dt>
				<dd>
					{
						component.state === 'published'
							? <a href={`https://github.com/govau/uikit/blob/master/packages/${ module }/CHANGELOG.md`}>View changes</a>
							: <span>Not released</span>
					}
				</dd>

				{
					component.state === 'published'
					?
						<Fragment>
							<dt>Install</dt>
							<dd><a href={`https://www.npmjs.com/package/@gov.au/${ module }`}>{`npm i @gov.au/${ module }`}</a></dd>
						</Fragment>
					: null
				}

				{
					tags
						?
							<Fragment>
								<dt>Tags</dt>
								<dd>
									{ tags }
								</dd>
							</Fragment>
						: null
				}
				{
					dependencies && component.state === 'published'
						?
							<Fragment>
								<dt>Required</dt>
								<dd>
									{ dependencies }
								</dd>
							</Fragment>
						: null
				}
				{
					component.contributors && component.state === 'published'
						?
							<Fragment>
								<dt>Contributors</dt>
								<dd>
									<Contributors contributors={ component.contributors } />
								</dd>
							</Fragment>
						: null
				}
				{
					component.state !== 'published'
						?
							<Fragment>
								<dt>Get involved</dt>
								<dd>
									<a href={ `https://community.service.gov.au/t/${ module } `}>Discussion</a>,&nbsp;
									<a href={ `https://github.com/govau/uikit/issues?q=is%3Aissue+is%3Aopen+${ module } `}>Issues</a>
								</dd>
							</Fragment>
						: null
				}

			</dl>

		</div>
	);
};

ComponentStatus.propTypes = {
	/**
	 * module: buttons
	 */
	module: PropTypes.string.isRequired,
};

export default ComponentStatus;