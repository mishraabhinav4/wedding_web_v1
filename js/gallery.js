// Fetch the gallery data from the text file
fetch('gallery.txt')
    .then(response => response.text())
    .then(data => {
        const categories = parseGalleryText(data);  // Parse the text file into an object
        loadAllCategories(categories);              // Load all categories using the parsed data
    })
    .catch(error => console.error('Error loading gallery text file:', error));

// Function to parse the text file into a categories object
function parseGalleryText(data) {
    const categories = {};
    const lines = data.split('\n');  // Split text file into lines

    lines.forEach(line => {
        const [category, count] = line.split(':');  // Split each line into category and image count
        if (category && count) {
            categories[category.trim()] = parseInt(count.trim(), 10);  // Add category and count to object
        }
    });

    return categories;
}

// Function to load images for a category
function loadImagesForCategory(category, imageCount) {
    const galleryContainer = document.getElementById('gallery-items');

    // Loop through the number of images in the category
    for (let i = 1; i <= imageCount; i++) {
        const imagePath = `images/gallery/${category}/${i}.jpg`;
        const galleryItem = document.createElement('div');
        galleryItem.className = `col-md-4 gallery-item ${category}`;
        galleryItem.innerHTML = `
            <a href="${imagePath}" class="img-zoom">
                <div class="gallery-box">
                    <div class="gallery-img">
                        <img src="${imagePath}" class="img-fluid mx-auto d-block" alt="${capitalize(category)}">
                    </div>
                    <div class="gallery-detail">
                        <h4 class="mb-0">${capitalize(category)}</h4>
                    </div>
                </div>
            </a>
        `;
        galleryContainer.appendChild(galleryItem);
    }
}

// Load images for all categories
function loadAllCategories(categories) {
    for (const category in categories) {
        loadImagesForCategory(category, categories[category]);
    }
}

// Capitalize the first letter of a string
function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
