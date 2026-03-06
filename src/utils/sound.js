export const clickSound = new Audio('/click.mp3');

export const playSound = () => {
    clickSound.currentTime = 0; // Reset to start for rapid clicks
    clickSound.play().catch(err => console.error("Playback prevented:", err));
};
