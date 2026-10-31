
const feedbackForm = document.getElementById('feedbackForm');
if (feedbackForm) {
  feedbackForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const event_name = document.getElementById('event_name').value;
    const attendee_name = document.getElementById('attendee_name').value.trim();
    const rating = document.getElementById('rating').value;
    const comments = document.getElementById('comments').value.trim();
    const statusMsg = document.getElementById('statusMsg');

    if (!event_name || !attendee_name || !rating) {
      statusMsg.textContent = 'Please fill in all required fields before submitting.';
      statusMsg.className = 'status-msg error';
      return;
    }

    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event_name, attendee_name, rating, comments }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        statusMsg.textContent = 'Thanks! Your feedback has been submitted.';
        statusMsg.className = 'status-msg success';
        feedbackForm.reset();
      } else {
        statusMsg.textContent = data.error || 'Something went wrong. Please try again.';
        statusMsg.className = 'status-msg error';
      }
    } catch (err) {
      statusMsg.textContent = 'Could not reach the server. Is it running?';
      statusMsg.className = 'status-msg error';
    }
  });
}

const feedbackList = document.getElementById('feedbackList');
if (feedbackList) {
  fetch('/api/feedback')
    .then((res) => res.json())
    .then((rows) => {
      if (!rows.length) {
        feedbackList.innerHTML = '<p class="empty-state">No feedback submitted yet. Be the first!</p>';
        return;
      }

      feedbackList.innerHTML = rows
        .map((row) => {
          const stars = '★'.repeat(row.rating) + '☆'.repeat(5 - row.rating);
          const date = new Date(row.created_at).toLocaleString();
          const comments = row.comments
            ? row.comments.replace(/</g, '&lt;').replace(/>/g, '&gt;')
            : '<em>No comments left.</em>';
          const name = row.attendee_name.replace(/</g, '&lt;').replace(/>/g, '&gt;');
          const event = row.event_name.replace(/</g, '&lt;').replace(/>/g, '&gt;');

          return `
            <div class="card">
              <h3>${event}</h3>
              <div class="meta">${name} &middot; ${date}</div>
              <div class="rating-stars">${stars}</div>
              <p>${comments}</p>
            </div>
          `;
        })
        .join('');
    })
    .catch(() => {
      feedbackList.innerHTML = '<p class="empty-state">Could not load feedback. Is the server running?</p>';
    });
}
