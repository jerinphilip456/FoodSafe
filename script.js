
// Sample Restaurant Information

const restaurants = [

    {
        name: "Green Garden Restaurant",
        locality: "Phagwara",
        cuisine: "Indian",
        rating: 5,
        status: "Excellent Hygiene",
        scores: [95, 90, 92, 98]
    },

    {
        name: "Spicy Dragon",
        locality: "Jalandhar",
        cuisine: "Chinese",
        rating: 4,
        status: "Good Hygiene",
        scores: [85, 88, 80, 90]
    },

    {
        name: "Food Hub",
        locality: "Phagwara",
        cuisine: "Fast Food",
        rating: 3,
        status: "Fair Hygiene",
        scores: [70, 75, 65, 72]
    },

    {
        name: "Pizza Corner",
        locality: "Ludhiana",
        cuisine: "Italian",
        rating: 0,
        status: "Under Notice",
        scores: [45, 55, 40, 50]
    }

];


// Get HTML Elements

const restaurantList =
    document.getElementById("restaurantList");

const searchInput =
    document.getElementById("searchInput");

const localityFilter =
    document.getElementById("localityFilter");

const cuisineFilter =
    document.getElementById("cuisineFilter");


// Display Restaurant Cards

function displayRestaurants(data) {

    restaurantList.innerHTML = "";

    if (data.length === 0) {

        restaurantList.innerHTML =
            "<p>No restaurants found.</p>";

        return;
    }

    data.forEach(function(restaurant) {

        let badgeClass = "notice-badge";
        let ratingText = "Under Notice";

        if (restaurant.rating === 5) {
            badgeClass = "five";
            ratingText = "⭐ 5 Star - Excellent";
        }

        else if (restaurant.rating === 4) {
            badgeClass = "four";
            ratingText = "⭐ 4 Star - Good";
        }

        else if (restaurant.rating === 3) {
            badgeClass = "three";
            ratingText = "⭐ 3 Star - Fair";
        }

        const card = document.createElement("div");

        card.className = "restaurant-card";

        card.innerHTML = `

            <h3>${restaurant.name}</h3>

            <p>📍 ${restaurant.locality}</p>

            <p>🍽️ ${restaurant.cuisine}</p>

            <span class="rating-badge ${badgeClass}">
                ${ratingText}
            </span>

            <br>

            <button class="details-btn">
                View Inspection
            </button>

        `;

        // Open Inspection Scorecard

        card.querySelector("button").addEventListener(
            "click",
            function() {
                showScorecard(restaurant);
            }
        );

        restaurantList.appendChild(card);

    });

}


// Search and Filter Restaurants

function filterRestaurants() {

    const searchValue =
        searchInput.value.toLowerCase();

    const localityValue =
        localityFilter.value;

    const cuisineValue =
        cuisineFilter.value;

    const filtered = restaurants.filter(function(r) {

        return (

            r.name.toLowerCase().includes(searchValue) &&

            (localityValue === "" ||
             r.locality === localityValue) &&

            (cuisineValue === "" ||
             r.cuisine === cuisineValue)

        );

    });

    displayRestaurants(filtered);

}


// Connect Filters to JavaScript

searchInput.addEventListener(
    "input",
    filterRestaurants
);

localityFilter.addEventListener(
    "change",
    filterRestaurants
);

cuisineFilter.addEventListener(
    "change",
    filterRestaurants
);


// Display Inspection Scorecard

function showScorecard(restaurant) {

    const scorecardMessage =
        document.getElementById("scorecardMessage");

    const scoreDetails =
        document.getElementById("scoreDetails");

    scorecardMessage.innerHTML =
        "Restaurant: " + restaurant.name +
        " | Rating: " + restaurant.status;

    const categories = [

        "Kitchen Cleanliness",
        "Safe Water Usage",
        "Raw Ingredient Storage",
        "Pest-Free Certification"

    ];

    scoreDetails.innerHTML = "";

    categories.forEach(function(category, index) {

        const score = restaurant.scores[index];

        scoreDetails.innerHTML += `

            <div class="score-item">

                <p>
                    <strong>${category}</strong>
                    - ${score}%
                </p>

                <div class="progress">

                    <div class="progress-bar"
                    style="width: ${score}%">

                    </div>

                </div>

            </div>

        `;

    });

    // NEW: Smoothly Scroll to Inspection Scorecard

    document.getElementById("scorecard").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


// Photo Upload Preview

const photoInput =
    document.getElementById("photo");

const photoPreview =
    document.getElementById("photoPreview");

photoInput.addEventListener("change", function() {

    const file = photoInput.files[0];

    if (file) {

        if (!file.type.startsWith("image/")) {
            alert("Please select an image file.");
            photoInput.value = "";
            return;
        }

        photoPreview.src = URL.createObjectURL(file);

        photoPreview.style.display = "block";

    }

});


// Complaint Form Submission

const complaintForm =
    document.getElementById("complaintForm");

complaintForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name =
        document.getElementById("userName").value;

    const restaurant =
        document.getElementById("restaurantName").value;

    const complaint =
        document.getElementById("complaintType").value;

    const description =
        document.getElementById("description").value;

    const message =
        document.getElementById("message");

    message.innerHTML =

        "✅ Thank you, " + name +
        "! Your complaint about " + restaurant +
        " (" + complaint + ") has been recorded in this demo.";

    // Clear the form

    complaintForm.reset();

    // Hide photo preview

    photoPreview.style.display = "none";

});


// Show Restaurants When Website Opens

displayRestaurants(restaurants);
