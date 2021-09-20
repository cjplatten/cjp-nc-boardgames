// extract any functions you are using to manipulate your data, into this file
exports.formatCategoryData = (categoryData) => {
    const formattedCategoryData = categoryData.map((category) => {
        return [category.slug, category.description];
    })
    return formattedCategoryData;
}

exports.formatUserData = (userData) => {
    const formattedUserData = userData.map((user) => {
        return [user.username, user.avatar_url, user.name];
    })
    return formattedUserData;
}

