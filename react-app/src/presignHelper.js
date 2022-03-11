const getPreSignedUrl = async (key) => {
    if (key) {
        const keyParts = key.split('/');
        const path = keyParts[keyParts.length - 1];
        console.log(path);
        const res = await fetch(`/api/presign/${path}`);
        if (res.ok) {
            const url = await res.json();
            console.log(url.response);
            console.log('HIIIIII')
            return url.response;
        }
    }

};

export default getPreSignedUrl;
