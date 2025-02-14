let allSongs = []; // Global array to store all songs

// Fetch songs.json once when the page loads
fetch("songs.json")
    .then(response => response.json())
    .then(songs => {
        allSongs = songs; // Store all songs globally
        shuffleAndDisplaySongs(); // Shuffle and display initially
    })
    .catch(error => console.error("Error loading songs:", error)); // Handle fetch errors

// Function to shuffle and display 5 random songs
function shuffleAndDisplaySongs() {
    let randomSongs = [];

    // Ensure unique random songs are selected
    while (randomSongs.length < 5) {
        let randomIndex = Math.floor(Math.random() * allSongs.length);
        
        if (!randomSongs.includes(allSongs[randomIndex])) {
            randomSongs.push(allSongs[randomIndex]);
        }
    }

    displaySongs(randomSongs); // Display the selected songs
}

// Function to display songs in the UI
function displaySongs(songs) {
    const container = document.getElementById("songs-container");
    container.innerHTML = ""; // Clear previous songs before adding new ones

    songs.forEach(song => {
        const iframe = document.createElement("iframe");
        iframe.src = song.embedUrl; // Set Spotify embed URL
        iframe.width = "90%"; // Responsive width
        iframe.height = "80";
        iframe.allow = "encrypted-media"; 
        // The 'encrypted-media' permission is required; otherwise, only a preview will play due to Spotify's DRM restrictions.

        container.appendChild(iframe); // Add iframe to the container
    });
}

// Add event listener to shuffle button (no need to fetch again)
document.getElementById("shuffle-btn").addEventListener("click", shuffleAndDisplaySongs);
