document.getElementById("all-btn").addEventListener("click", () => {
    fetchVideosByCategory("1000");
});

document.getElementById("music-btn").addEventListener("click", () => {
    fetchVideosByCategory("1001");
});

document.getElementById("comedy-btn").addEventListener("click", () => {
    fetchVideosByCategory("1003");
});

document.getElementById("drawing-btn").addEventListener("click", () => {
    fetchVideosByCategory("1005");
});

function fetchVideosByCategory(categoryId) {
    fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`)
        .then(response => response.json())
        .then(data => displayData(data))
        .catch(error => {
            console.error("Error fetching data:", error);
        });
}

const displayData = (data) => {
    console.log(data);

    const videocontainer = document.getElementById("video-container");

    videocontainer.innerHTML = '';

    if (data.status === false || data.data.length === 0) {
        const noContentDiv = document.createElement("div");
        noContentDiv.classList.add("no-content");
        noContentDiv.innerHTML = `
                <img class="icon" src="image/Icon.png" alt="No content icon">
                <p class="message">Ops! sorry, there is no content here.</p>   
        `;
        videocontainer.appendChild(noContentDiv);
    }
    else {
        data.data.forEach(vid => {
            const card = document.createElement("div");
            card.classList.add("box");

            let postedDateHTML = '';
            if (vid.others.posted_date) {
                const postedDate = new Date(vid.others.posted_date * 1000);
                const hours = postedDate.getUTCHours();
                const minutes = postedDate.getUTCMinutes();
                const seconds = postedDate.getUTCSeconds();
                const formattedPostedDate = `${hours} hrs ${minutes} min ${seconds} sec ago`;
                postedDateHTML = `<div class="posted-date">${formattedPostedDate}</div>`;
            }

            card.innerHTML = `
                <img class="img-box" src="${vid.thumbnail}" alt="">
                ${postedDateHTML} <!-- Display posted date if it exists -->
                <div class="profile-title">
                    <img class="pro_img" src="${vid.authors[0].profile_picture}" alt="${vid.authors[0].profile_name}">
                    <h3 class="tit">${vid.title}</h3>
                </div>

                <div class="author-info">
                    <span class="profile-name">${vid.authors[0].profile_name}</span>
                    ${vid.authors[0].verified ? '<img class="v-icon" src="image/verified.png" alt="Verified">' : ''}
                </div>
                <p class="views">Views: ${vid.others.views}</p>
            `;
            videocontainer.appendChild(card);
        });
    }
};




document.querySelector(".sortbutton").addEventListener("click", () => {
    const videoContainer = document.getElementById("video-container");
    const videos = Array.from(videoContainer.querySelectorAll(".box"));

    if (videos.length > 0) {
        videos.sort((a, b) => {
            const viewsA = parseInt(a.querySelector(".views").textContent.split(": ")[1]);
            const viewsB = parseInt(b.querySelector(".views").textContent.split(": ")[1]);
            return viewsB - viewsA;
        });
        videoContainer.innerHTML = "";
        videos.forEach(video => {
        videoContainer.appendChild(video);
        });
    } 
    else {
        alert("No videos available to sort.");
    }
});


document.getElementById("blog-btn").addEventListener("click", () => {
    window.open("blog.html", "_blank");
});



