const passwordInput = document.getElementById('password');
const display = document.querySelector('.weakness');

passwordInput.addEventListener('input', () => {
    const val = passwordInput.value;
    if (!val) { display.innerText = ''; return; }

    let charsetSize = 0;
    if (/[a-z]/.test(val)) charsetSize += 26;
    if (/[A-Z]/.test(val)) charsetSize += 26;
    if (/[0-9]/.test(val)) charsetSize += 10;
    if (/[^A-Za-z0-9]/.test(val)) charsetSize += 32;

    // Используем BigInt для огромных чисел
    const combinations = BigInt(charsetSize) ** BigInt(val.length);
    const hashesPerSecond = BigInt(10000000000); // 10 billion/sec
    let seconds = combinations / hashesPerSecond;

    if (seconds === 0n) {
        display.innerText = "Crack time: Instant (less than a second)";
        return;
    }

    // Рассчитываем компоненты времени
    const years = seconds / 31536000n;
    seconds %= 31536000n;
    const days = seconds / 86400n;
    seconds %= 86400n;
    const hours = seconds / 3600n;
    seconds %= 3600n;
    const mins = seconds / 60n;
    const secs = seconds % 60n;

    // Собираем строку (только ненулевые значения)
    let result = [];
    if (years > 0n) result.push(`${years}y`);
    if (days > 0n) result.push(`${days}d`);
    if (hours > 0n) result.push(`${hours}h`);
    if (mins > 0n) result.push(`${mins}m`);
    if (secs > 0n) result.push(`${secs}s`);

    display.innerText = "Crack time: " + (result.join(' ') || "Instant");
});

