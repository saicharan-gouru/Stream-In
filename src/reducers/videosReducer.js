function videosReducer(state, { type, payload }) {
    switch (type) {
        case "FETCH_CATEGORIES":
            return {...state, categories: payload };
        case "FETCH_VIDEOS":
            return {...state, videos: payload };
        default:
            return state;
    }
}

export { videosReducer };