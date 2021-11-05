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
import PropTypes from 'prop-types';
import {
  THEME_CONSTANTS,
  Text,
  BUTTON_TYPES,
  BUTTON_SIZES,
  BUTTON_VARIANTS,
  Icons,
  Button,
  PLACEMENT,
} from '@web-stories-wp/design-system';
import { __ } from '@web-stories-wp/i18n';
import styled from 'styled-components';
import { useRef, useState } from '@web-stories-wp/react';

/**
 * Internal dependencies
 */
import { useStory } from '../../../../../app';
import { PRESET_TYPES } from '../../../../../constants';
import useAddPreset from '../../../../../utils/useAddPreset';
import useApplyStyle from '../../preset/stylePreset/useApplyStyle';
import { focusStyle } from '../../../shared';
import Popup from '../../../../popup';
import useInspector from '../../../../inspector/useInspector';
import StyleGroup from './styleGroup';
import StyleManager from './styleManager';

const PresetsHeader = styled.div`
  display: flex;
  padding: 8px 0;
  justify-content: space-between;
`;

const StylesWrapper = styled.div``;

const SubHeading = styled(Text)`
  color: ${({ theme }) => theme.colors.fg.secondary};
  margin: 6px 0;
`;

const StyledButton = styled(Button)`
  margin-left: auto;
  ${focusStyle};
`;

function PresetPanel({ pushUpdate }) {
  const { globalStoryStyles } = useStory(
    ({
      state: {
        story: { globalStoryStyles },
      },
    }) => {
      return {
        globalStoryStyles,
      };
    }
  );

  const {
    refs: { inspector },
  } = useInspector();
  const buttonRef = useRef(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const { textStyles } = globalStoryStyles;
  const hasPresets = textStyles.length > 0;

  const handleApplyStyle = useApplyStyle({ pushUpdate });
  const { addGlobalPreset } = useAddPreset({ presetType: PRESET_TYPES.STYLE });

  const handlePresetClick = (preset) => {
    handleApplyStyle(preset);
  };

  return (
    <>
      <PresetsHeader>
        <SubHeading size={THEME_CONSTANTS.TYPOGRAPHY.PRESET_SIZES.SMALL}>
          {__('Recent Saved Styles', 'web-stories')}
        </SubHeading>
        <StyledButton
          type={BUTTON_TYPES.TERTIARY}
          size={BUTTON_SIZES.SMALL}
          variant={BUTTON_VARIANTS.SQUARE}
          onClick={addGlobalPreset}
          aria-label={__('Add style', 'web-stories')}
        >
          <Icons.Plus />
        </StyledButton>
      </PresetsHeader>
      <StylesWrapper>
        <StyleGroup
          styles={textStyles.slice(-2)}
          handleClick={handlePresetClick}
        />
      </StylesWrapper>
      <StyledButton
        ref={buttonRef}
        type={BUTTON_TYPES.PLAIN}
        size={BUTTON_SIZES.SMALL}
        variant={BUTTON_VARIANTS.RECTANGLE}
        onClick={() => setIsPopupOpen(true)}
      >
        {__('More styles >', 'web-stories')}
      </StyledButton>
      <Popup
        anchor={buttonRef}
        dock={inspector}
        isOpen={isPopupOpen}
        placement={PLACEMENT.LEFT_START}
        renderContents={() => (
          <StyleManager styles={textStyles} applyStyle={handlePresetClick} />
        )}
      />
    </>
  );
}

PresetPanel.propTypes = {
  pushUpdate: PropTypes.func.isRequired,
};

export default PresetPanel;
