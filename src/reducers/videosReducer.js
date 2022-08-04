function videosReducer(state, { type, payload }) {
    switch (type) {
        case "FETCH_CATEGORIES":
            return {...state, categories: payload };
        case "FETCH_VIDEOS":
            return {...state, videos: payload, filteredVideos: payload };
        case "FILTER_ALL":
            return {...state, filteredVideos: state.videos, currentCategory: "ALL" }
        case "FILTER":
            return {...state, filteredVideos: state.videos.filter(item => item.categoryName === payload), currentCategory: payload }
        case "VIDEO_LIKED":
            return {...state, videosInLiked: payload }
        case "VIDEO_UNLIKED":
            return {...state, videosInLiked: payload }
        case "ADD_VIDEO_TO_WATCHLATER":
            return {...state, videosInWatchlater: payload }
        case "REMOVE_VIDEO_FROM_WATCHLATER":
            return {...state, videosInWatchlater: payload }
        default:
            return state;
    }
}

export { videosReducer };