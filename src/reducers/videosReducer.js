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
        default:
            return state;
    }
}

export { videosReducer };