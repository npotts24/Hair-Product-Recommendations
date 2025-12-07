document.addEventListener('DOMContentLoaded', () => {
    const reviewForm = document.getElementById('reviewForm');
    const starsContainer = document.getElementById('stars');
    const selectedRatingInput = document.getElementById('selectedRating');
    const reviewsList = document.getElementById('reviewsList');

    let currentRating = 0;

    // Star rating functionality
    starsContainer.addEventListener('click', (e) => {
        if (e.target.tagName === 'SPAN') {
            currentRating = parseInt(e.target.dataset.value);
            selectedRatingInput.value = currentRating;
            updateStarDisplay(currentRating);
        }
    });

    starsContainer.addEventListener('mouseover', (e) => {
        if (e.target.tagName === 'SPAN') {
            const hoverRating = parseInt(e.target.dataset.value);
            updateStarDisplay(hoverRating);
        }
    });

    starsContainer.addEventListener('mouseout', () => {
        updateStarDisplay(currentRating); // Revert to selected rating
    });

    function updateStarDisplay(rating) {
        Array.from(starsContainer.children).forEach((star, index) => {
            if (index < rating) {
                star.classList.add('active');
            } else {
                star.classList.remove('active');
            }
        });
    }

    // Handle form submission
    reviewForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const reviewerName = document.getElementById('reviewerName').value;
        const reviewText = document.getElementById('reviewText').value;
        const rating = selectedRatingInput.value;

        if (currentRating === 0) {
            alert('Please select a rating.');
            return;
        }

        const formData = new FormData();
        formData.append('name', reviewerName);
        formData.append('rating', rating);
        formData.append('review', reviewText);

        try {
            const response = await fetch('submit_review.php', {
                method: 'POST',
                body: formData
            });
            const result = await response.json();

            if (result.success) {
                alert('Review submitted successfully!');
                reviewForm.reset();
                currentRating = 0;
                selectedRatingInput.value = 0;
                updateStarDisplay(0);
                loadReviews(); // Reload reviews to display the new one
            } else {
                alert('Error submitting review: ' + result.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while submitting the review.');
        }
    });

    // Load existing reviews
    async function loadReviews() {
        try {
            const response = await fetch('get_reviews.php');
            const reviews = await response.json();

            reviewsList.innerHTML = ''; // Clear existing reviews

            if (reviews.length > 0) {
                reviews.forEach(review => {
                    const reviewItem = document.createElement('div');
                    reviewItem.classList.add('review-item');
                    reviewItem.innerHTML = `
                        <p><strong>${review.name}</strong> - <span class="rating-stars">${'&#9733;'.repeat(review.rating)}</span></p>
                        <p>${review.review}</p>
                    `;
                    reviewsList.appendChild(reviewItem);
                });
            } else {
                reviewsList.innerHTML = '<p>No reviews yet. Be the first to leave one!</p>';
            }
        } catch (error) {
            console.error('Error loading reviews:', error);
            reviewsList.innerHTML = '<p>Error loading reviews.</p>';
        }
    }

    loadReviews();
});