const getCloudFrontDomain = async (key) => {
    if (key) {
        const keyParts = key.split('/');
        const path = keyParts[keyParts.length - 1];
        return 'https://d3b4kmpqmm0e8t.cloudfront.net/' + path;
    }

};

export default getCloudFrontDomain;
