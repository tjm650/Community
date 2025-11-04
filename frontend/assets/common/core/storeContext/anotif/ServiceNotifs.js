function responseNotifList(set, get, data) {
  try {
    set((state) => ({
      notifList: [...get().notifList, ...data.notifs],
      loading: false,
      notifNext: data.next,
    }));
  } catch (error) {
    set((state) => ({
      error,
      loading: false,
      notifNext: data.next,
    }));
  }
}

function responseNotifPostCommentList(set, get, data) {
  set((state) => ({
    notifPostCommentsList: [...get().notifPostCommentsList, ...data.comments],
    notifPostsCommentsNext: data.next,
  }));
}

function responseNotifLikes(set, get, data) {
  set((state) => ({}));
}

function responseNotifSend(set, get, data) {
  const username = data.notif_followers.username;

  // Move the friendlist to the start of the list
  // Update the preview textand update the time stamp

  const NotifFollowersList = [...get().NotifFollowersList];
  const NotifIndex = NotifFollowersList.findIndex(
    (item) => item.notif_followers.username === username
  );
  if (NotifIndex >= 0) {
    const item = NotifFollowersList[NotifIndex];
    item.preview = data.notifs.text;
    item.updated = data.notifs.created;
    NotifFollowersList.splice(NotifIndex, 1);
    NotifFollowersList.unshift(item);
    set((state) => ({
      NotifFollowersList: NotifFollowersList,
    }));
  }

  // If the message data does not belong to this friend then
  // don't update the message list, as a refresh messagelist will be loaded
  // the next time the user opens the correct chat window

  if (username !== get().notifUsername) {
    return;
  }

  // Load messages here
  //const notifList = [data.notifs, ...get().notifList];
  //set((state) => ({
  //notifList: notifList,
  // }));
}

function responseNotifPollUpdate(set, get, data) {
  try {
    const updatedNotif = data.notif;
    const currentNotifList = [...get().notifList];

    // Find and update the poll notification
    const notifIndex = currentNotifList.findIndex(
      (item) => item.id === updatedNotif.id
    );

    if (notifIndex >= 0) {
      currentNotifList[notifIndex] = updatedNotif;
      set((state) => ({
        notifList: currentNotifList,
      }));
    }
  } catch (error) {
    console.error("Error updating poll notification:", error);
  }
}

function responseNotifPollList(set, get, data) {
  try {
    set((state) => ({
      pollList: data.polls || [],
      pollNext: data.next,
      loading: false,
    }));
  } catch (error) {
    set((state) => ({
      error,
      loading: false,
      pollNext: data.next,
    }));
  }
}

function responseNotifPollDetails(set, get, data) {
  try {
    set((state) => ({
      pollDetails: data.poll_details || null,
      loading: false,
    }));
  } catch (error) {
    set((state) => ({
      error,
      loading: false,
    }));
  }
}

function responseNotifPollStatistics(set, get, data) {
  try {
    set((state) => ({
      pollStatistics: data.statistics || {},
      pollVoteDistribution: data.vote_distribution || [],
      pollWinners: data.winners || [],
      loading: false,
    }));
  } catch (error) {
    set((state) => ({
      error,
      loading: false,
    }));
  }
}

// Poll Model - Comprehensive poll post structure
class PollModel {
  constructor(data = {}) {
    // Core notification fields
    this.id = data.id || null;
    this.sender = data.sender || {};
    this.service = data.service || {};
    this.update_type = data.update_type || 'Poll';
    this.description = data.description || '';
    this.image = data.image || null;
    this.created = data.created || new Date().toISOString();
    this.likes = data.likes || [];
    this.likes_count = data.likes_count || 0;
    this.user_liked = data.user_liked || false;
    this.interactions = data.interactions || [];
    this.interactions_count = data.interactions_count || 0;
    this.user_interacted = data.user_interacted || false;
    this.total_interactions_count = data.total_interactions_count || 0;
    this.comments = data.comments || [];
    this.comments_count = data.comments_count || 0;

    // Poll-specific fields
    this.extra_data = data.extra_data || {};
    this.title = this.extra_data.title || 'Poll';
    this.poll_type = this.extra_data.poll_type || 'single'; // 'single' or 'multiple'
    this.poll_sections = this.extra_data.poll_sections || [];
    this.poll_description = this.extra_data.description || '';

    // Computed fields
    this.total_votes = this.getTotalVotes();
    this.total_options = this.getTotalOptions();
    this.has_user_voted = this.hasUserVoted();
    this.user_vote_indices = this.getUserVoteIndices();
    this.is_expired = this.isPollExpired();
    this.time_remaining = this.getTimeRemaining();
    this.winner_options = this.getWinnerOptions();
    this.vote_distribution = this.getVoteDistribution();
    this.section_colors = this.generateSectionColors();
  }

  // Get total number of votes across all options
  getTotalVotes() {
    return this.poll_sections.reduce((total, section) => {
      return total + section.items.reduce((sectionTotal, item) => {
        return sectionTotal + (item.votes || 0);
      }, 0);
    }, 0);
  }

  // Get total number of options across all sections
  getTotalOptions() {
    return this.poll_sections.reduce((total, section) => {
      return total + section.items.length;
    }, 0);
  }

  // Check if current user has voted
  hasUserVoted() {
    return this.poll_sections.some(section =>
      section.items.some(item =>
        item.user_ids && item.user_ids.includes(this.getCurrentUserId())
      )
    );
  }

  // Get indices of options where user has voted
  getUserVoteIndices() {
    const userId = this.getCurrentUserId();
    const indices = [];

    this.poll_sections.forEach((section, sectionIndex) => {
      section.items.forEach((item, itemIndex) => {
        if (item.user_ids && item.user_ids.includes(userId)) {
          indices.push(this.getGlobalOptionIndex(sectionIndex, itemIndex));
        }
      });
    });

    return indices;
  }

  // Get current user ID (placeholder - should be replaced with actual user context)
  getCurrentUserId() {
    // This should be replaced with actual user context
    return 1; // Placeholder
  }

  // Convert section and item indices to global option index
  getGlobalOptionIndex(sectionIndex, itemIndex) {
    let globalIndex = 0;
    for (let i = 0; i < sectionIndex; i++) {
      globalIndex += this.poll_sections[i].items.length;
    }
    return globalIndex + itemIndex;
  }

  // Check if poll has expired (24 hours default)
  isPollExpired() {
    const pollCreated = new Date(this.created);
    const now = new Date();
    const hoursDiff = (now - pollCreated) / (1000 * 60 * 60);
    return hoursDiff > 24; // 24 hours expiry
  }

  // Get time remaining until poll expires
  getTimeRemaining() {
    if (this.is_expired) return 'Expired';

    const pollCreated = new Date(this.created);
    const now = new Date();
    const hoursDiff = (now - pollCreated) / (1000 * 60 * 60);
    const remainingHours = 24 - hoursDiff;

    if (remainingHours <= 0) return 'Expired';
    if (remainingHours < 1) return `${Math.ceil(remainingHours * 60)} minutes`;
    return `${Math.floor(remainingHours)} hours`;
  }

  // Get options with highest votes (winners)
  getWinnerOptions() {
    if (this.total_votes === 0) return [];

    const maxVotes = Math.max(...this.poll_sections.flatMap(section =>
      section.items.map(item => item.votes || 0)
    ));

    const winners = [];
    this.poll_sections.forEach((section, sectionIndex) => {
      section.items.forEach((item, itemIndex) => {
        if ((item.votes || 0) === maxVotes) {
          winners.push({
            sectionIndex,
            itemIndex,
            sectionName: section.name,
            optionText: item.text,
            votes: item.votes || 0
          });
        }
      });
    });

    return winners;
  }

  // Get vote distribution as percentages
  getVoteDistribution() {
    if (this.total_votes === 0) return [];

    return this.poll_sections.flatMap(section =>
      section.items.map(item => ({
        sectionName: section.name,
        optionText: item.text,
        votes: item.votes || 0,
        percentage: Math.round(((item.votes || 0) / this.total_votes) * 100),
        color: section.color || this.generateRandomColor()
      }))
    );
  }

  // Generate random colors for sections
  generateSectionColors() {
    const colors = [
      '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
      '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
    ];

    return this.poll_sections.reduce((acc, section, index) => {
      acc[section.name] = section.color || colors[index % colors.length];
      return acc;
    }, {});
  }

  // Generate random color
  generateRandomColor() {
    const colors = [
      '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
      '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  // Get poll statistics
  getPollStatistics() {
    return {
      totalVotes: this.total_votes,
      totalOptions: this.total_options,
      averageVotesPerOption: this.total_options > 0 ? (this.total_votes / this.total_options).toFixed(1) : 0,
      participationRate: 0, // Would need total potential voters
      uniqueVoters: this.getUniqueVoterCount(),
      mostActiveSection: this.getMostActiveSection(),
      leastActiveSection: this.getLeastActiveSection()
    };
  }

  // Get count of unique voters
  getUniqueVoterCount() {
    const allUserIds = new Set();
    this.poll_sections.forEach(section => {
      section.items.forEach(item => {
        if (item.user_ids) {
          item.user_ids.forEach(userId => allUserIds.add(userId));
        }
      });
    });
    return allUserIds.size;
  }

  // Get most active section (by total votes)
  getMostActiveSection() {
    let maxVotes = 0;
    let mostActive = null;

    this.poll_sections.forEach(section => {
      const sectionVotes = section.items.reduce((total, item) => total + (item.votes || 0), 0);
      if (sectionVotes > maxVotes) {
        maxVotes = sectionVotes;
        mostActive = section.name;
      }
    });

    return mostActive;
  }

  // Get least active section (by total votes)
  getLeastActiveSection() {
    let minVotes = Infinity;
    let leastActive = null;

    this.poll_sections.forEach(section => {
      const sectionVotes = section.items.reduce((total, item) => total + (item.votes || 0), 0);
      if (sectionVotes < minVotes && sectionVotes > 0) {
        minVotes = sectionVotes;
        leastActive = section.name;
      }
    });

    return leastActive;
  }

  // Get poll results summary
  getPollResults() {
    return {
      pollTitle: this.title,
      pollType: this.poll_type,
      totalVotes: this.total_votes,
      uniqueVoters: this.getUniqueVoterCount(),
      isExpired: this.is_expired,
      timeRemaining: this.time_remaining,
      winners: this.winner_options,
      sections: this.poll_sections.map(section => ({
        name: section.name,
        color: section.color || this.generateRandomColor(),
        totalVotes: section.items.reduce((total, item) => total + (item.votes || 0), 0),
        items: section.items.map(item => ({
          text: item.text,
          votes: item.votes || 0,
          percentage: this.total_votes > 0 ? Math.round(((item.votes || 0) / this.total_votes) * 100) : 0
        }))
      })),
      statistics: this.getPollStatistics()
    };
  }

  // Export poll data for sharing
  exportPollData() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      type: this.poll_type,
      sections: this.poll_sections,
      totalVotes: this.total_votes,
      created: this.created,
      isExpired: this.is_expired,
      results: this.getPollResults()
    };
  }

  // Validate poll data
  validatePoll() {
    const errors = [];

    if (!this.title || this.title.trim().length === 0) {
      errors.push('Poll title is required');
    }

    if (this.poll_sections.length === 0) {
      errors.push('At least one section is required');
    }

    if (this.getTotalOptions() < 2) {
      errors.push('At least 2 options are required');
    }

    this.poll_sections.forEach((section, sectionIndex) => {
      if (!section.name || section.name.trim().length === 0) {
        errors.push(`Section ${sectionIndex + 1} name is required`);
      }

      if (section.items.length === 0) {
        errors.push(`Section "${section.name}" must have at least one option`);
      }

      section.items.forEach((item, itemIndex) => {
        if (!item.text || item.text.trim().length === 0) {
          errors.push(`Option ${itemIndex + 1} in section "${section.name}" is required`);
        }
      });
    });

    return {
      isValid: errors.length === 0,
      errors: errors
    };
  }

  // Update poll with new vote
  updateWithVote(optionIndex, userId) {
    // This would be called when a user votes
    // Implementation would depend on the specific voting logic
    console.log(`User ${userId} voted for option ${optionIndex}`);
  }

  // Get poll progress (0-100)
  getPollProgress() {
    if (this.is_expired) return 100;
    const pollCreated = new Date(this.created);
    const now = new Date();
    const hoursDiff = (now - pollCreated) / (1000 * 60 * 60);
    return Math.min((hoursDiff / 24) * 100, 100);
  }
}

// Poll creation helper functions
function createPollModel(data) {
  return new PollModel(data);
}

function validatePollCreation(pollData) {
  const poll = new PollModel(pollData);
  return poll.validatePoll();
}

function generatePollPreview(pollData) {
  const poll = new PollModel(pollData);
  return poll.getPollResults();
}

export const ServiceNotifs = {
  responseNotifList,
  responseNotifPostCommentList,
  responseNotifLikes,
  responseNotifSend,
  responseNotifPollUpdate,
  responseNotifPollList,
  responseNotifPollDetails,
  responseNotifPollStatistics,
};

// Export Poll Model and utilities
export {
  PollModel,
  createPollModel,
  validatePollCreation,
  generatePollPreview
};
