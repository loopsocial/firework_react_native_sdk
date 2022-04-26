import type { VideoFeedSource } from "react-native-firework-sdk";

export type RootStackParamList = {
  Tab: undefined;
  OpenVideo: undefined;
  Feed: {
    source?: VideoFeedSource;
    channel?: string;
    playlist?: string;
    playlistGroup?: string;
  };
  SetShareBaseURL: undefined;
  Checkout: undefined;
  SetAdBadgeConfiguration: undefined;
  EnableCustomCTAClickCallback: undefined;
};
