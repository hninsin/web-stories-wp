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
import StoryEditor from '@web-stories-wp/story-editor';

export default {
  title: 'Playground/Stories Editor',
};

// @todo: Find better way to mock these.
const config = {
  allowedMimeTypes: {
    image: ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'],
    audio: [],
    video: ['video/mp4'],
  },
  allowedFileTypes: ['png', 'jpeg', 'jpg', 'gif', 'mp4'],
  allowedImageFileTypes: ['gif', 'jpe', 'jpeg', 'jpg', 'png'],
  allowedImageMimeTypes: ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'],
  allowedAudioFileTypes: ['mp3', 'aac', 'wav', 'ogg'],
  allowedAudioMimeTypes: ['audio/mpeg', 'audio/aac', 'audio/wav', 'audio/ogg'],
  storyId: 1234,
  api: {
    stories: '',
    media: '',
    fonts: '',
    storyLocking: '',
  },
  metadata: {
    publisher: {
      name: '',
      logo: '',
    },
  },
  capabilities: {
    hasUploadMediaAction: false,
  },
  postLock: {
    interval: 0, // Disables post locking.
    showLockedDialog: false,
  },
};

export const _default = () => <StoryEditor config={config} />;
