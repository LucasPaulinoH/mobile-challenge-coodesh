export const searchForPhoneticAudioSource = (phonetics: any[]) => {
  for (const phonetic of phonetics)
    if (phonetic?.audio && phonetic.audio.length > 0) return phonetic.audio;

  return null;
};
