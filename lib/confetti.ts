import confetti from "canvas-confetti";

export function fireConfetti() {
    const count = 200;
    const defaults = {
        origin: { y: 0.7 },
        zIndex: 9999,
    };

    function fire(particleRatio: number, opts: confetti.Options) {
        confetti({
            ...defaults,
            ...opts,
            particleCount: Math.floor(count * particleRatio),
        });
    }

    fire(0.25, {
        spread: 26,
        startVelocity: 55,
        colors: ["#a855f7", "#22d3ee", "#f97316"],
    });

    fire(0.2, {
        spread: 60,
        colors: ["#a855f7", "#22d3ee", "#f97316"],
    });

    fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8,
        colors: ["#a855f7", "#22d3ee", "#f97316"],
    });

    fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2,
        colors: ["#a855f7", "#22d3ee", "#f97316"],
    });

    fire(0.1, {
        spread: 120,
        startVelocity: 45,
        colors: ["#a855f7", "#22d3ee", "#f97316"],
    });
}

export function fireSmallConfetti() {
    confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ["#a855f7", "#22d3ee", "#f97316", "#22c55e"],
        zIndex: 9999,
    });
}

export function fireStreakConfetti() {
    const end = Date.now() + 1000;

    const colors = ["#f97316", "#ef4444", "#eab308"];

    (function frame() {
        confetti({
            particleCount: 3,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: colors,
            zIndex: 9999,
        });
        confetti({
            particleCount: 3,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: colors,
            zIndex: 9999,
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    })();
}
