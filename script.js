// Add this to your script.js or before </body>
document.addEventListener('DOMContentLoaded', function() {
    const videoToggle = document.getElementById('videoToggle');
    const videoWrapper = document.querySelector('.video-wrapper');
    const playOverlay = document.querySelector('.play-button-overlay');
    
    // Toggle video collapse/expand
    videoToggle.addEventListener('click', function() {
        videoWrapper.classList.toggle('collapsed');
        const icon = this.querySelector('.toggle-icon');
        icon.textContent = videoWrapper.classList.contains('collapsed') ? '▶' : '▼';
    });
    
    // Play button functionality
    playOverlay.addEventListener('click', function() {
        const iframe = videoWrapper.querySelector('iframe');
        const videoUrl = iframe.src;
        iframe.src = videoUrl.includes('autoplay=1') 
            ? videoUrl.replace('autoplay=1', '') 
            : videoUrl + (videoUrl.includes('?') ? '&' : '?') + 'autoplay=1';
        this.style.opacity = '0';
        setTimeout(() => this.style.display = 'none', 300);
    });
});