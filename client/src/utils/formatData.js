export const formatViews = (views) => {
    const abbreviations = [
        { value: 1, symbol: "" },
        { value: 1e3, symbol: "K" },
        { value: 1e6, symbol: "M" },
        { value: 1e9, symbol: "B" },
    ];
    const reg = /\.0+$|(\.[0-9]*[1-9])0+$/;
    let formattedViews;

    for (let i = abbreviations.length - 1; i > 0; i--) {
        if (views >= abbreviations[i].value) {
            formattedViews = (views / abbreviations[i].value).toFixed(1).replace(reg, "$1") + abbreviations[i].symbol;
            break;
        }
    }

    return formattedViews.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const formatReleaseDate = (date) => {
    const now = new Date();
    const releaseDate = new Date(date);
    const seconds = Math.floor((now - releaseDate) / 1000);
    const intervals = [
        { label: "year", seconds: 31536000 },
        { label: "month", seconds: 2592000 },
        { label: "week", seconds: 604800 },
        { label: "day", seconds: 86400 },
        { label: "hour", seconds: 3600 },
        { label: "minute", seconds: 60 },
        { label: "second", seconds: 1 },
    ];

    for (const interval of intervals) {
        const count = Math.floor(seconds / interval.seconds);
        if (count >= 1) {
            return `${count} ${interval.label}${count !== 1 ? "s" : ""} ago`;
        }
    }

    return "just now";
}

