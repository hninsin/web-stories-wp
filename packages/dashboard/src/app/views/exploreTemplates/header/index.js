/*
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * External dependencies
 */
import { __ } from '@web-stories-wp/i18n';

/**
 * External dependencies
 */
import { useMemo, useDebouncedCallback } from '@web-stories-wp/react';
import PropTypes from 'prop-types';
import { useFeature } from 'flagged';

/**
 * Internal dependencies
 */
import {
  DASHBOARD_VIEWS,
  TEMPLATES_GALLERY_SORT_MENU_ITEMS,
  TEXT_INPUT_DEBOUNCE,
} from '../../../../constants';
import { TemplatesPropType } from '../../../../types';
import {
  FilterPropTypes,
  SortPropTypes,
  ViewPropTypes,
  SearchPropTypes,
} from '../../../../utils/useTemplateView';
import { useDashboardResultsLabel } from '../../../../utils';
import { PageHeading, BodyViewOptions } from '../../shared';
import { getSearchOptions } from '../../utils';

function Header({
  filter,
  isLoading,
  totalTemplates,
  sort,
  view,
  search,
  templates,
}) {
  const enableInProgressTemplateActions = useFeature(
    'enableInProgressTemplateActions'
  );

  const searchOptions = useMemo(() => getSearchOptions(templates), [templates]);

  const debouncedSearchChange = useDebouncedCallback((value) => {
    search.setKeyword(value);
  }, TEXT_INPUT_DEBOUNCE);

  const resultsLabel = useDashboardResultsLabel({
    totalResults: totalTemplates,
    currentFilter: filter.value,
    view: DASHBOARD_VIEWS.TEMPLATES_GALLERY,
  });

  return (
    <>
      <PageHeading
        heading={__('Explore Templates', 'web-stories')}
        showSearch
        searchOptions={searchOptions}
        searchValue={search.keyword}
        handleSearchChange={debouncedSearchChange}
      />
      <BodyViewOptions
        resultsLabel={resultsLabel}
        layoutStyle={view.style}
        handleLayoutSelect={view.toggleStyle}
        currentSort={sort.value}
        isLoading={isLoading}
        pageSortOptions={TEMPLATES_GALLERY_SORT_MENU_ITEMS}
        showSortDropdown={enableInProgressTemplateActions}
        handleSortChange={enableInProgressTemplateActions ? sort.set : () => {}}
        sortDropdownAriaLabel={__(
          'Choose sort option for display',
          'web-stories'
        )}
      />
    </>
  );
}

Header.propTypes = {
  filter: FilterPropTypes.isRequired,
  isLoading: PropTypes.bool,
  sort: SortPropTypes.isRequired,
  totalTemplates: PropTypes.number,
  view: ViewPropTypes.isRequired,
  search: SearchPropTypes.isRequired,
  templates: TemplatesPropType,
};

export default Header;
