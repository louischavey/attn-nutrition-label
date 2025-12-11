/**
 * Pre-written summaries explaining how different Instagram features capture attention
 */
const ATTENTION_SUMMARIES = {
  'Reels': `Capture user attention through (1) delivery method of variable reward system that releases dopamine when you can't predict what's happening and (2) hyper-personalized content that's the culmination of media consumption being more and more isolated (e.g. art salons from Paris vs. white cube galleries, concerts vs. Spotify in noise-cancelling headphones, singular TV for a whole neighborhood vs. TikTok).`,

  'Messages': `Social attention functions as a prerequisite for more meaningful interaction (i.e. eye contact for initiating a conversation). While group chats can serve as a human-curated gathering space away from the algorithmically served strangers/acquaintances on your feed, Instagram profits twice off of the isolation you feel from algorithmic hyper-personalization: once from when you interact with the video, and once when your friend interacts with it when you send it to them`,

  'Notifications': `Combine the social attention (notifying you of likes, comments, and follower requests) with variable reward delivery, as you don't know what the notification content will be.`,

};

const EXTENSION_SUMMARY = "The Attentional Nutrition Label illuminates mechanisms of grabbing our attention and the underlying neurological/behavioral wiring they exploit. Further expanding upon the function of a food nutrition label, this label also explains how your mind reacts to the 'ingredients' (or features) of Instagram";

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports.ATTENTION_SUMMARIES = ATTENTION_SUMMARIES;
  module.exports.EXTENSION_SUMMARY = EXTENSION_SUMMARY;
}
