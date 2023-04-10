const fetch = require('node-fetch');

// Replace <FILE_KEY> with your Figma project file key
const fileKey = "<FILE_KEY>";

// Replace <ACCESS_TOKEN> with your Figma personal access token
const accessToken = "<ACCESS_TOKEN>";

// Replace <PROJECT_URL> with your Figma project URL
const projectUrl = "<PROJECT_URL>";

// Fetch the Figma file metadata
fetch(`https://api.figma.com/v1/files/${fileKey}`, {
    headers: {
        "X-Figma-Token": accessToken
    }
})
.then(res => res.json())
.then(data => {
    // Get the page IDs for the project
    const pageIds = data.document.children.map(child => child.id);

    // Fetch each page's resources
    Promise.all(pageIds.map(pageId => {
        return fetch(`https://api.figma.com/v1/files/${fileKey}/nodes?ids=${pageId}&depth=1`, {
            headers: {
                "X-Figma-Token": accessToken
            }
        })
        .then(res => res.json())
        .then(data => {
            // Get the resources for this page
            const resources = data.nodes[pageId].document.children;

            // Log the resources
            console.log(`Resources for page ${pageId}:`);
            console.log(resources);
        });
    }));
});
