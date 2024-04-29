const extrairNomeDoSite = (url) => {
    const match = url.match(/(?:https?:\/\/)?(?:www\.)?([^.]+)\.([^.]+)/i);
    let nomeDoSite = match?.[1];
    if (nomeDoSite) {
        if (nomeDoSite.length < 2) {
            nomeDoSite = match?.[2];
        }
        return nomeDoSite.charAt(0).toUpperCase() + nomeDoSite.slice(1);
    }
    return null;
}

export default extrairNomeDoSite;