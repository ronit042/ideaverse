import React, { useState, useEffect } from 'react';
import { Text,View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const WebPreviewScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const webViewRef = React.useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // Set isLoading to false after the delay
    }, 2000); // 2000 milliseconds = 2 seconds

    return () => clearTimeout(timer); // Clear the timer if the component unmounts
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Text>Loading...</Text> // Display a loading message or spinner
      ) : (
        <WebView
          ref={webViewRef}
          source={{ uri: 'https://nextjs-zegocloud-uikits-xi.vercel.app/' }} // Replace with your URL
          style={styles.webview}
          allowsInlineMediaPlayback={true}
          allowsFullscreenVideo={true}
          mediaPlaybackRequiresUserAction={false}
          allowsBackForwardNavigationGestures={true}
          allowsLinkPreview={true}
          allowsPictureInPictureMediaPlayback={true}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});

export default WebPreviewScreen;
